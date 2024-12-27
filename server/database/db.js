const mysql = require('mysql2/promise');

let pool;

exports.connect = async function() {
  try {
    pool = await mysql.createPool({
      connectionLimit: 100,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      waitForConnections: true,
      queueLimit: 0
    });
    console.log("MySQL 커넥션풀 생성 완료");
  } catch (error) {
    console.error("MySQL 커넥션풀 생성 중 오류", error);
    throw error;
  }
}

exports.get = () => {
  if (!pool) {
    throw new Error("커넥션 풀이 생성되지 않았습니다.");
  }
  return pool;
};