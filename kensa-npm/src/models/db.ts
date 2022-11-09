import { Pool } from 'pg';

const PG_URI = 'postgres://cinamzyi:JX38bpVpO5jpxFDtUM3fc0qvBBuSkbqB@peanut.db.elephantsql.com/cinamzyi';

const pool = new Pool({
  connectionString: PG_URI
})

export const query = (text: string, params: any, callback?: any): any => {
  console.log('executed query', text);
  return pool.query(text, params, callback);
} 