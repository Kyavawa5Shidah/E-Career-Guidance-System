import * as dotenv from "dotenv";
dotenv.config(); // Load environment variables

import mysql from "serverless-mysql";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

console.log('MYSQL_USER:', process.env.MYSQL_USER);
console.log('MYSQL_PASSWORD:', process.env.MYSQL_PASSWORD);
console.log('MYSQL_HOST:', process.env.MYSQL_HOST);
console.log('MYSQL_PORT:', process.env.MYSQL_PORT);
console.log('MYSQL_DATABASE:', process.env.MYSQL_DATABASE);

export type QueryResult = RowDataPacket[] | RowDataPacket[][] | ResultSetHeader;

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST || 'localhost',
    port: Number(process.env.MYSQL_PORT) || 3306,
    database: process.env.MYSQL_DATABASE || 'ecgs_db',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'password',
  },
});

export async function query(q: string, values: any = []): Promise<QueryResult> {
  try {
    const results = await db.query(q, values);
    return results as QueryResult;
  } catch (e: any) {
    console.error("Database query error:", e.message);
    throw new Error(e.message); // Rethrow the error to be handled by the caller
  } finally {
    await db.end(); // Ensure db connection is closed
  }
}

export async function testConnection() {
  try {
    await db.query("SELECT 1 + 1 AS result");
    await db.end(); // Close connection
    return true;
  } catch (error) {
    console.error("Database connection test failed:", error);
    return false;
  }
}
