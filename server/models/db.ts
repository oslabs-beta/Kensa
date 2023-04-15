import * as dotenv from 'dotenv';
dotenv.config();
import { Pool } from 'pg';

const PG_URI = process.env.PG_URI;

export default new Pool({
  connectionString: PG_URI,
});
