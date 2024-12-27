const express = require("express");
const cors = require("cors");
const app = express();
const bodyparser = require("body-parser");
const cookiepaser = require("cookie-parser");
require("dotenv").config();
const db = require('./database/db')
//middlewares
// app.use((req,res,next)=>{
//   res.header("Access-Control-Allow-Credentials",true)
//   next()
// })

app.use(
  cors({
    origin : "http://loaclhost:3000", 
    credentials : true,
}));

//기본 설정 middlewares
app.use(express.json()); 
app.use(bodyparser.urlencoded({ extended: true })); // URL 인코딩된 데이터 파싱을 위해
app.use(bodyparser.json()); // JSON 데이터 파싱을 위해
app.use(cookiepaser()); //쿠키를 사용하기 위해

//const RouterPath = require('./router') //기본 동작 index.js 파일이 자동으로 로드된다.
const RouterPath = require("./router/index"); // 중앙 라우터 모듈 불러오기 명시적으로 rotuer 들고오기
app.use("/", RouterPath); // 루트 경로에서 모든 라우팅 처리

// RouterPath 모듈을 불러와서 루트 경로(/)에 등록함으로써, 모든 라우팅을 index.js로 위임합니다.


app.get("/", (req, res) => {
  console.log("Welcome to the API");
  res.send("Hello World");
});


async function startServer() {
  try {
    await db.connect();
    const port = process.env.SERVER_PORT;
    app.listen(port, () => {
      console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
    });
  } catch (error) {
    console.error("서버 시작 중 오류 발생:", error);
    process.exit(1);
  }
}

startServer();
