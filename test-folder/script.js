const kensa = require('kensa-api')


const response = {
  query_string: 'newest query',
  project_id: 3,
  execution_time: 120,
  success: true
}

const apiKey = '123456789';

const projectId = kensa.getProjectId(apiKey);

// kensa.insertMetrics(response);
