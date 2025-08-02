const db = require('./db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )`, err => {
    if (err) console.error("Error creating table:", err);
    else console.log("Users table created or already exists.");
  });
});
