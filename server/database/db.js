const mysql = require('mysql2/promise');

//DB연결 풀 객체
let connect;

exports.connect = function() {
  try {
    connection = mysql.createPool({
      connectionLimit: 100,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      waitForConnections: true, //연결 가득 찬 경우에 대기
      queueLimit: 0 //대기열 제한 없음
    });
    console.log("MySQL 커넥션풀 생성 완료");
  }catch (error) {
    console.error("MySQL 커넥션풀 생성 중 오류",error)
    throw error;
  }
}



//외부에서 커넥션 풀을 활용하도록 연결 풀 반환하는 함수 선언
exports.get = () => {
  if(!connect) {
    throw new Error("커넥션 풀이 생성되지 않았습니다.")
  }
  return connect; //고차함수
};


