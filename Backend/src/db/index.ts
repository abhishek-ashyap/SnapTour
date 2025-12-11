import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Recommended for development environments, but for production,
  // you'll want a more secure SSL configuration.
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: true } : false
});

export default {
  query: (text: string, params?: any[]) => pool.query(text, params),
};