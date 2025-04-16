// scripts/create-tables.ts

import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'ecgsdb.ctuaii00sdt8.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'mintAndfable',
  database: 'ecgsdb',
};

async function createTables() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to AWS MySQL database');
    
    const createUsersTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await connection.execute(createUsersTableQuery);
    console.log('✅ Table "users" created or already exists');

    await connection.end();
    console.log('✅ Connection closed');
  } catch (error) {
    console.error('❌ Error creating table:', error);
  }
}

createTables();
