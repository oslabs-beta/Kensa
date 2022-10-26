// const db = require('./models/db')

// const kensa = {};

// kensa.getProjectId = async (apiKey) => {
//  const result = await db.query('SELECT id  FROM projects WHERE api_key = $1;', [apiKey]);
//  return result.rows[0];
// }

// kensa.insertMetrics = async (response) => {
//   // cosnt { project_id } = GraphQL context object
//   const { query_string, execution_time, success } = response;
  
//   const result = await db.query('INSERT INTO history_log(query_string, project_id, execution_time, success) VALUES($1, $2, $3, $4) RETURNING *;', [query_string, project_id, execution_time, success])

//   console.log(result);
//   console.log(result.rows[0])

// }

// NPM package needs to find a way to use the API key to get their project ID
//   -An idea: get client to input API key into their code so that their project information can be received
//   -passing project ID into GraphQL context object so query results/metrics/projectID/resolvers can be inserted into database
//   -two methods needed : 
//     - kensa.getProjectId - getting project ID that takes in API key as argument 
//     - kensa.insertMetrics - after the query finishes executing, call the method passing in response object and project_id from the GraphQL context object


// module.exports = kensa;