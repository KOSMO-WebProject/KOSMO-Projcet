
// http-proxy-middleware 라이브러리를 사용하여 API 프록시 설정
const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function(app) {

    //'/api': 모든 /api로 시작하는 요청에 대해 이 미들웨어를 적용합니다.
    // 즉, 클라이언트에서 /api/somepath로 요청하면 이 요청은 프록시를 통해 서버로 전달됩니다.
    app.use(
        '/api',
        createProxyMiddleware({
            target : 'http://localhost:5000', // 프록시가 요청을 전달할 목표 서버의 주소이다. 즉 http://localhost:8000 이 나의 서버이다.
            changeOrigin : true, // 원래 요청의 출처(origin)를 목표 서버의 출처로 변경합니다
        })
    )
}


// 이 설정은 주로 로컬 개발 환경에서 클라이언트(예: React 앱)와 서버(Node.js 백엔드)가 다른 포트에서 실행될 때 유용합니다.
// 개발 중에는 프론트엔드 개발 서버가 API 요청을 백엔드 서버로 투명하게 전달할 수 있어 개발 과정이 훨씬 간편해집니다.
// 또한 배포 시에는 이러한 프록시 설정을 사용하여 
// 실제 서버 환경에서도 동일한 도메인과 포트에서 API를 제공할 수 있도록 설정을 조정할 수 있습니다.