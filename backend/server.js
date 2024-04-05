require("dotenv").config();
const express = require("express");
const cors = require("cors");

const mysql2 = require('mysql2');

const app = express();
const PORT = process.env.APP_PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql2.createConnection({
  connectionLimit: 520,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://127.0.0.1:3000"],
    optionsSuccessStatus: 200,
    credentials: true,
  })
);


app.get("/", (req, res) => {
  res.send("Hello Frederico Server");
});

app.get("/users", (req, res) => {
  console.log("🚀 - res:", res.data);
  db.query("select * from users", (err, data) => {
    console.log(err, data);
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

app.listen(PORT, () => {
  console.log(`==> Server is running on port: ${PORT} <==`);
});
