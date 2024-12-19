const db = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//회원가입
const register = (req, res) => {
  const q = "SELECT * FROM users WHERE userid = ?";

  db.query(q, [req.body.userid], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length > 0)
      return res.status(409).json("해당 유저가 이미 존재합니다.");

    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(500).json(err);
      bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
        if (err) return res.status(500).json(err);

        const q =
          "INSERT INTO users(`userid`,`email`,`password`,`nickname`,`phonenumber`,`zipcode`,`address`,`detailaddress`) VALUES (?)";
        const values = [
          req.body.userid,
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
  //클라이언트의 아이디를 바탕으로 데이터를 조회한다.
  const q = "SELECT * FROM users WHERE userid = ?"; //전체 데이터 조회

  db.query(q, [req.body.userid], (err, data) => {
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

    // 만약에 id와 password가 모두 일치하면
    const token = jwt.sign({ id: data[0].id }, "secretkey"); //pk(user.id)에 맞는 사용자 토큰을 발급해준다.
    // jwt.sign(페이로드, 비밀키, [옵션,콜백])
    // 1. 서버에서 토큰 만들기 -> 2. 클라이언트에게 토큰 전송하기 -> 3. 클라이언트에 대해 요청이 올 때 서버에서 토큰 검증하기

    const { password, ...others } = data[0]; //반환할 데이터

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      }) //쿠키를 만들어서 보낸다.
      .status(200)
      .json(others); // password 빼고 json으로 나머지 데이터들을 반환해준다.
      // 사용자의 정보와 쿠키를 보낸다.
    /*
    예시 데이터
    {
    "id": 8,
    "userid": "test",
    "email": "test@gmail.com",
    "nickname": "Jong Beom"
    }   
    */
  });
};

const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("로그아웃 하였습니다.");
};

module.exports = {
  register,
  login,
};
