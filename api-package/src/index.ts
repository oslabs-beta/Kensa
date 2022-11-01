import { query } from './models/db'

export const getProjectId = async (apiKey: any): Promise<any> => {
  const result = await query('SELECT id FROM projects WHERE api_key = $1;', [apiKey]);
  return result.rows[0];
}

export const insertMetrics = async (response: any, projectId: number) : Promise<any> => {
  // cosnt { project_id } = GraphQL context object
  const { query_string, execution_time, success, operation_name } = response;
  
  const result = await query('INSERT INTO history_log(query_string, project_id, execution_time, success, operation_name) VALUES($1, $2, $3, $4, $5) RETURNING *;', [query_string, projectId, execution_time, success, operation_name])

  console.log(result.rows[0]);
  return result.rows[0];
}

export const testPlugin = {
  async requestDidStart (requestContext: any) {
      // Fires whenever a GraphQL request is received from a client. This plugin runs after whatever happens in ApolloServer's context
    // IntrospectionQuery keeps running in GraphQL server. Use this condition to stop context from logging for IntrospectionQuery
    if (requestContext.request.operationName === 'IntrospectionQuery') return;
    // Query string request sent by the client
    // console.log(`Request started! Query: ${requestContext.request.query}`)
    // console.log(`Request variable! Variable: ${requestContext.request.variables}`)

    const requestStart = Date.now()
    let op: string
    return {
      async executionDidStart(executionRequestContext: any) {
        return {
          willResolveField({source, args, contextValue, info}: any) {
            const resolverStart = Date.now();
            return (error: any, result: any) => {
              const resolverEnd = Date.now();
              console.log(`Field ${info.parentType.name}.${info.fieldName} took ${resolverEnd - resolverStart}ms`)

              if (error) {
                console.log(`It failed with ${error}`)
              } else {
                console.log(`It returned ${result}`)
              }
            }
          }
        }
      },
      async didResolveOperation(context: any) {
        // context ==> { logger, cache, schema, request, response, contextValue, metrics, overallCachePolicy, queryHash, source, document }
        op = context.operationName
      },
      async willSendResponse(context: any) {
        // console.log(context.response.body.singleResult) // response data
        const receiveResponse = Date.now()
        const elapsed = receiveResponse - requestStart
        console.log(`operation=${op} duration=${elapsed}ms`)

        // Getting projectId from context object
        const { id } = context.contextValue.projectId;
        const query_string = context.request.query;
        // construct a fake response for now
        // construct an object with metrics
        const metricBody = {
          query_string: query_string,
          execution_time: elapsed,
          success: true,
          operation_name: op
        }
        // This insert metrics to Kensa database
        await insertMetrics(metricBody, id);
      }
    }
  }
};