const kensa = require('kensa-api')


const response = {
  query_string: 'second query',
  project_id: 3,
  execution_time: 200,
  success: true
}


kensa.insertMetrics(response);
