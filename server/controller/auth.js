const db = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//회원가입
const register = async(req, res) => {
  const q = "SELECT * FROM users WHERE user_name = ?";
  await db.get().execute(q, [req.body.userid], (err, data) => {
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
        db.get().execute(q, [values], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json("회원가입이 완료되었습니다.");
        });
      });
    });
  });
};

//로그인
const login = async (req, res) => {
  const q = "SELECT * FROM users WHERE user_name = ?"; //전체 데이터 조회
  await db.get().execute(q, [req.body.username], (err, data) => {
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
        const accessToken = jwt.sign({ user_id: data[0].user_id }, process.env.ACCESS_SECRET,{expiresIn:'1h'}); //pk(user.id)에 맞는 사용자 토큰을 발급해준다.
        //refreshToken 발급
        const refreshToken = jwt.sign({ user_id: data[0].user_id }, process.env.REFRESH_SECRET,{expiresIn:'24h'}); //pk(user.id)에 맞는 사용자 토큰을 발급해준다.
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



const accessToken = async (req, res) => {
  const token = req.cookies.accessToken;  // 쿠키에서 토큰 추출
  if (!token) {
    return res.status(401).send({ message: 'Access token is missing' });
  }

  const q = "SELECT * FROM users WHERE user_id = ?";  // 쿼리 수정
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    const user_id = decoded.user_id;  // ID 추출
    await db.get().execute(q, [user_id], (err, result) => {  // id를 배열로 전달
        if (err) {
            return res.status(500).json(err);
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "User not found." });
        }
        const { password, ...others } = result[0];
        res.status(200).json(others);
    });
  } catch (error) {
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
