const { Pool } = require('pg')

const PG_URI = 'postgres://cinamzyi:JX38bpVpO5jpxFDtUM3fc0qvBBuSkbqB@peanut.db.elephantsql.com/cinamzyi'

const pool = new Pool({
  connectionString: PG_URI
})

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text)
    return pool.query(text, params, callback)
  }
}