require('dotenv').config();
const { Pool } = require('pg');

// OSP Project Management Test App
const PG_URI = process.env.PG_URI;

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) =>  pool.query(text, params, callback)
};