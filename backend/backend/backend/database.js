import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new sqlite3.Database(join(__dirname, 'database.db'), (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('✅ Connected to SQLite database');
    initializeDatabase();
  }
});

function initializeDatabase() {
 
  db.run(`
    CREATE TABLE IF NOT EXISTS organizations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT,
      address TEXT,
      website TEXT,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Error creating organizations table:', err);
    } else {
      console.log('✅ Organizations table ready');
    }
  });
  
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      organization_id INTEGER NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT,
      role TEXT,
      department TEXT,
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (organization_id) REFERENCES organizations (id) ON DELETE CASCADE
    )
  `, (err) => {
    if (err) {
      console.error('Error creating users table:', err);
    } else {
      console.log('✅ Users table ready');
    }
  });
}

export default db;
