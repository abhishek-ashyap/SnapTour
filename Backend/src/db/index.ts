import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction
    ? { rejectUnauthorized: false } // Render / cloud
    : false,                        // Local Postgres
});

export default {
  query: (text: string, params?: any[]) => pool.query(text, params),
};
