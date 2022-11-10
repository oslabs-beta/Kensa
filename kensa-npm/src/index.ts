import axios from 'axios';

export const getContext = async ({req, res}: any, api: string, db: any) => {
  if (req.body.operationName === 'IntrospectionQuery') return;

  const projectId = await getProjectId(api);

  return {
    req,
    res,
    db,
    projectId
  };
};

export const getProjectId = async (apiKey: any): Promise<any> => {

  const res = await axios.post('http://localhost:3000/getId', { apiKey });

  return res.data.id;
};

// Collect metrics for GraphQL production operations
export const insertMetrics = async (response: any, projectId: string) : Promise<any> => {
  const { query_string, execution_time, success, operation_name } = response;

  await axios.post('http://localhost:3000/metrics', {
    projectId,
    query_string,
    operation_name,
    execution_time,
    success
  });

};

// Collect metrics for GraphQL development operations
export const insertMetricsDev = async (response: any, projectId: string) : Promise<any> => {
  const { query_string, execution_time, success, operation_name } = response;

  await axios.post('http://localhost:3000/devmetrics', {
    projectId,
    query_string,
    operation_name,
    execution_time,
    success
  });
};

export const kensaPlugin = {
  async requestDidStart(requestContext: any) {
    if (requestContext.request.operationName === 'IntrospectionQuery') return;

    const headers: string[] = requestContext.contextValue.res.req.rawHeaders;
    const devmode: string = headers[headers.indexOf('Devmode') + 1];

    const requestStart = Date.now();
    let op: string;
    let success: boolean = true;
    return {
      async didEncounterErrors() {
        success = false;
      },
      async willSendResponse(context: any) {
        const receiveResponse = Date.now();
        const elapsed = receiveResponse - requestStart;
        op = context.request.operationName;

        if (!op) {
          const queryStr = context.request.query;
          let operationName = queryStr.substring(queryStr.indexOf(' '), queryStr.indexOf('{')).trim();
          if (operationName.length < 1) {
            operationName = 'Null';
          }
          op = operationName;
        }

        // Getting projectId from context object
        const id = context.contextValue.projectId;
        const query_string = context.request.query;
        // construct an object with metrics
        const metricBody = {
          query_string: query_string,
          execution_time: elapsed,
          success: success,
          operation_name: op
        };

        // check for dev mode
        if (devmode === 'true') {
          // insert metrics to Kensa database dev table
          await insertMetricsDev(metricBody, id);

        } else {
          // insert metrics to Kensa database
          await insertMetrics(metricBody, id);
        }
      }
    };
  }
};


