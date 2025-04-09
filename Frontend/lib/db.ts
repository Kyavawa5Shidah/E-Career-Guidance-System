// lib/db.ts
import mysql from 'serverless-mysql';

const db = mysql({
  config: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  }
});

export async function query(
  q: string,
  values: (string | number)[] | object = []
) {
  try {
    const results = await db.query(q, values);
    await db.end();
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

export default db;