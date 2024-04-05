require("dotenv");

const mysql2 = require("mysql2");

const db = mysql2.createConnection({
  connectionLimit: 520,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database");
});

module.exports = db;
