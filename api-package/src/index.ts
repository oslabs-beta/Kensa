import { query } from './models/db'

export const getProjectId = async (apiKey: any): Promise<any> => {
  const result = await query('SELECT id FROM projects WHERE api_key = $1;', [apiKey]);
  return result.rows[0];
}

export const insertMetrics = async (response: any, projectId: number) : Promise<any> => {
  // cosnt { project_id } = GraphQL context object
  const { query_string, execution_time, success } = response;
  
  const result = await query('INSERT INTO history_log(query_string, project_id, execution_time, success) VALUES($1, $2, $3, $4) RETURNING *;', [query_string, projectId, execution_time, success])

  console.log(result.rows[0]);
  return result.rows[0];
}

// NPM package needs to find a way to use the API key to get their project ID
//   -An idea: get client to input API key into their code so that their project information can be received
//   -passing project ID into GraphQL context object so query results/metrics/projectID/resolvers can be inserted into database
//   -two methods needed : 
//     - kensa.getProjectId - getting project ID that takes in API key as argument 
//     - kensa.insertMetrics - after the query finishes executing, call the method passing in response object and project_id from the GraphQL context object