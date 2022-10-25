const db = require('./models/db')

const kensa = {};

kensa.insertMetrics = async (response) => {
  const { query_string, project_id, execution_time, success } = response;
  
  const result = await db.query('INSERT INTO history_log(query_string, project_id, execution_time, success) VALUES($1, $2, $3, $4) RETURNING *;', [query_string, project_id, execution_time, success])

  console.log(result);
  console.log(result.rows[0])

}

module.exports = kensa;