const mysql = require("mysql2");

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

conn.connect((err) => {
  if (!err) {
    console.log("Database Connected");
  } else {
    console.log("Database Not Connected");
  }
});

module.exports = conn;
