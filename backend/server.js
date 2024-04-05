require("dotenv").config();
const express = require("express");
const cors = require("cors");

// const mysql2 = require('mysql2');
const db = require("./database/db");
const app = express();
const PORT = process.env.APP_PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
