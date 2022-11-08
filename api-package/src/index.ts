import { query } from './models/db'

export const getProjectId = async (apiKey: any): Promise<any> => {
  const result = await query('SELECT id FROM projects WHERE api_key = $1;', [apiKey]);
  return result.rows[0];
}

export const insertResolverMetric = async (response: any, projectId: number) : Promise<any> => {
  const { resolver_name, execution_time, operation_id, success } = response;

  const result = await query('INSERT INTO resolver_log_dev(resolver_name, execution_time, operation_id, success) VALUES($1, $2, $3, $4) RETURNING *;', [resolver_name, execution_time, operation_id, success])

  console.log(result.rows);
  return result.rows[0];
}

export const insertMetrics = async (response: any, projectId: number) : Promise<any> => {
  // cosnt { project_id } = GraphQL context object
  const { query_string, execution_time, success, operation_name } = response;
  
  const result = await query('INSERT INTO history_log(query_string, project_id, execution_time, success, operation_name) VALUES($1, $2, $3, $4, $5) RETURNING *;', [query_string, projectId, execution_time, success, operation_name])

  console.log(result.rows[0]);
  return result.rows[0];
}

export const insertMetricsDev = async (response: any, projectId: number) : Promise<any> => {
  // cosnt { project_id } = GraphQL context object
  const { query_string, execution_time, success, operation_name } = response;
  
  const result = await query('INSERT INTO history_log_dev(query_string, project_id, execution_time, success, operation_name) VALUES($1, $2, $3, $4, $5) RETURNING *;', [query_string, projectId, execution_time, success, operation_name])

  console.log(result.rows[0]);
  return result.rows[0];
}

export const kensaPlugin = {
  // Fires whenever a GraphQL request is received from a client. This plugin runs after whatever happens in ApolloServer's context
  async requestDidStart(requestContext: any) {
    // IntrospectionQuery keeps running in GraphQL server. Use this condition to stop context from logging for IntrospectionQuery
    if (requestContext.request.operationName === 'IntrospectionQuery') return;
    // Query string request sent by the client
    // console.log(`Request started! Query: ${requestContext.request.query}`)
    // console.log(`Request variable! Variable: ${requestContext.request.variables}`)

    // console.log('finding header', requestContext.contextValue.res.req.rawHeaders);
    const headers:string[] = requestContext.contextValue.res.req.rawHeaders;
    const devmode:string = headers[headers.indexOf('Devmode') + 1];
    // console.log('devmode', devmode)

    const requestStart = Date.now()
    let op: string;
    let success: boolean = true;
    return {
      async executionDidStart(executionRequestContext: any) {
        // console.log(executionRequestContext)
        return {
          willResolveField({source, args, contextValue, info}: any) {
            const resolverStart = Date.now();
            return (error: any, result: any) => {
              let success;
              const resolverEnd = Date.now();
              console.log(`Field ${info.parentType.name}.${info.fieldName} took ${resolverEnd - resolverStart}ms`)

              if (error) {
                console.log(`It failed with ${error}`);
                success = false;
              } else {
                console.log(`It returned ${result}`);
                success = true;
              }

              // resolver_name, project_id, execution_time, operation_id, success
              const resolverMetric = {
                query_string: `${info.parentType.name}.${info.fieldName}`,
                execution_time: resolverEnd - resolverStart,
                success: success
              }
              info.operation.directives.push(resolverMetric);
              // console.log(info.operation.directives);
            }
          }
        }
      },
      async didEncounterErrors() {
        success = false;
      },
      async willSendResponse(context: any) {
        const receiveResponse = Date.now()
        const elapsed = receiveResponse - requestStart;
        console.log(`operation=${op} duration=${elapsed}ms`);
        op = context.request.operationName;

        // In case if Apollo context object doesn't pick up operation name,
        // parse it from the query string
        if (!op) {
          const queryStr = context.request.query;
          let operationName = queryStr.substring(queryStr.indexOf(' '), queryStr.indexOf('{')).trim();
          if (operationName.length < 1) {
            operationName = 'Null';
          }
          op = operationName;
        }

        // Getting projectId from context object
        const { id } = context.contextValue.projectId;
        const query_string = context.request.query;
        // construct an object with metrics
        const metricBody = {
          query_string: query_string,
          execution_time: elapsed,
          success: success,
          operation_name: op
        }

        // check for dev mode
        if (devmode === 'true') {
          console.log(metricBody);
          // THis insert metrics to Kensa database dev table
          const result = await insertMetricsDev(metricBody, id);

          const operation_id = result.id;
          const fields = context.operation.directives;
          for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            const resolverMetric = {
              resolver_name: field.query_string,
              execution_time: field.execution_time,
              operation_id: operation_id,
              success: success
            };
            const fieldMetricResult = await insertResolverMetric(resolverMetric, id);
            console.log(fieldMetricResult);
          }

          // fields.forEach((field:any) => {
          //   // resolver_name, execution_time, operation_id, success
          //   const resolverMetric = {
          //     resolver_name: field.query_string,
          //     execution_time: field.execution_time,
          //     operation_id: operation_id,
          //     success: success
          //   };
          //   const fieldMetricResult = await insertResolverMetric(metricBody, id);
          // });
          // console.log('operation_id: ', typeof operation_id);
          // console.log('willSendResponse context', context.operation.directives);
          // console.log('willSendResponse context', Array.isArray(context.operation.directives));
        } else {
          // This insert metrics to Kensa database
          const result = await insertMetrics(metricBody, id);
          console.log('insertMetricResult: ', result);
        }
      }
    }
  }
}

export const getContext = async ({req, res}: any, api:string, db:any) => {
  // IntrospectionQuery keeps running. Use this to stop context from logging for IntrospectionQuery
  if (req.body.operationName === 'IntrospectionQuery') return;

  // Calling npm package to get projectId
  const projectId = await getProjectId(api);

  // returning context object
  return {
      req,
      res,
      db,
      projectId
  }
}
