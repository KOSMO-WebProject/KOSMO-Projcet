const mysql = require("mysql2/promise");

const conn = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '1234',
  port: process.env.DB_PORT || '3306',
  database: process.env.DB_NAME || 'webdb_proj2',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

conn.connect = async () => {
  if (!err) {
    console.log("Database Connected");
  } else {
    console.log("Database Not Connected");
  }
};

module.exports = conn;
