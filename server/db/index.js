import postgre from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = postgre;

export const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});