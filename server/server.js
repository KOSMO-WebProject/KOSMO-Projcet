
const express = require('express')
const cors = require('cors')
const app = express()
const api = require('./router/index')


app.use(cors()) //cors 사용


app.use('/api',api)



const port = 5000
//서버가 작동하는지 확인
app.listen(port,()=>{
    console.log(`서버가 실행되었습니다 접속 주소 : http://localhost:${port}`);
})