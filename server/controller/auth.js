const db = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//회원가입
const register = (req, res) => {
  const q = "SELECT * FROM users WHERE user_name = ?";

  db.query(q, [req.body.userid], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length > 0)
      return res.status(409).json("해당 유저가 이미 존재합니다.");
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(500).json(err);
      bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
        if (err) return res.status(500).json(err);
        const q =
          "INSERT INTO users(`user_name`,`email`,`password`,`nickname`,`phonenumber`,`zipcode`,`address`,`detailaddress`) VALUES (?)";
        const values = [
          req.body.username,
          req.body.email,
          hashedPassword,
          req.body.name,
          req.body.phoneNumber,
          req.body.zipCode,
          req.body.address,
          req.body.detailAddress,
        ];
        db.query(q, [values], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json("회원가입이 완료되었습니다.");
        });
      });
    });
  });
};

//로그인
const login = (req, res) => {
  const q = "SELECT * FROM users WHERE user_name = ?"; //전체 데이터 조회
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json("err");
    if (data.length === 0)
      return res.status(400).json("아이디 또는 비밀번호가 틀렸습니다."); //아이디에 맞는 데이터가 없으면 400 에러

    //만약에 아이디에 일치하는 데이터가 있으면 비밀번호를 비교한다.
    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );
    //사용자로부터 받은 password랑 db에 있는 password를 비교한다.
    if (!checkPassword)
      return res.status(400).json("아이디 또는 비밀번호가 틀렸습니다!");
    //만약 비밀번호가 틀리면 400 에러
    try{
        //accessToken 발급
        const accessToken = jwt.sign({ id: data[0].id }, process.env.ACCESS_SECRET,{expiresIn:'1h',issuer:"About Tech"}); //pk(user.id)에 맞는 사용자 토큰을 발급해준다.
        //refreshToken 발급
        const refreshToken = jwt.sign({ id: data[0].id }, process.env.REFRESH_SECRET,{expiresIn:'24h',issuer:"About Tech"}); //pk(user.id)에 맞는 사용자 토큰을 발급해준다.
        const { password, ...others } = data[0]; //반환할 데이터
        //token 전송
       // 동시에 accessToken과 refreshToken을 쿠키로 설정
       res
       .cookie("accessToken", accessToken, {
         httpOnly: true,

       })
       .cookie("refreshToken", refreshToken, {
         httpOnly: true,
       })
       .status(200)
       .json(others); // 클라이언트에 JSON 응답 보내기

    }catch(error){
        res.status(500).json(error)
    }
    // 만약에 id와 password가 모두 일치하면
    // jwt.sign(페이로드, 비밀키, [옵션,콜백])
    // 1. 서버에서 토큰 만들기 -> 2. 클라이언트에게 토큰 전송하기 -> 3. 클라이언트에 대해 요청이 올 때 서버에서 토큰 검증하기
  });
};


// const accessToken = (req, res) => {
//   try {
//       const token = req.cookies.accessToken; // 쿠키에서 accessToken을 가져온다.
//       if (!token) {
//           return res.status(401).json({ message: "토큰이 제공되지 않았습니다." });
//       }
//       const decoded = jwt.verify(token, process.env.ACCESS_SECRET); // 토큰을 검증하고 디코딩한다.
//       // 토큰에서 추출한 사용자 ID로 사용자 데이터 조회
//       const q = "SELECT * FROM users WHERE id = ?";
//       db.query(q, [decoded.id], (err, result) => {
//           if (err) {
//               return res.status(500).json(err);
//           }
//           if (result.length === 0) {
//               return res.status(404).json({ message: "유저를 찾을 수 없습니다." });
//           }

//           const { password, ...userData } = result[0]; // 패스워드를 제외한 사용자 데이터
//           res.status(200).json(userData); // 사용자 데이터를 JSON 형식으로 반환
//       });
//   } catch (error) {
//       if (error.name === "JsonWebTokenError") {
//           return res.status(401).json({ message: "Invalid token" });
//       } else if (error.name === "TokenExpiredError") {
//           return res.status(401).json({ message: "Token expired" });
//       } else {
//           res.status(500).json({ message: "Server error" });
//       }
//   }
// }

const accessToken = (req, res) => {
  // 쿠키에서 토큰을 추출
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).send({ message: 'Access token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    req.user = decoded; // 디코드된 토큰 정보를 req 객체에 추가
    res.status(200).json({
      message: "Token is valid",
      user: req.user
    });
  } catch (error) {
    // 토큰 검증 과정에서 발생한 에러를 처리
    return res.status(403).send({ message: 'Invalid or expired token' });
  }
};






const logout = (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "로그아웃 성공" });
  } catch (error) {
    res.status(500).json(error)
  }
  
};

module.exports = {
  register,
  login,
  logout,
  accessToken
};
