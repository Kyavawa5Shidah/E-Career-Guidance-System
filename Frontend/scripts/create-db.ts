import mysql from 'mysql2/promise';

async function runSQLScript() {
  try {
    const connection = await mysql.createConnection({
      host: 'ecgsdb.ctuaii00sdt8.us-east-1.rds.amazonaws.com',
      user: 'admin',
      password: 'mintAndfable',
      database: '',
    });

    // Example SQL script
    const createDatabaseQuery = 'CREATE DATABASE IF NOT EXISTS ecgsdb;';
    await connection.execute(createDatabaseQuery);

    console.log('Database created or already exists.');
    
    await connection.end();
  } catch (error) {
    console.error('Error executing SQL:', error);
  }
}

runSQLScript();
