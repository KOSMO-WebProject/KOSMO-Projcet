const db = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
// 회원가입
const register = async (req, res) => {
  try {
    const [rows] = await db
      .get()
      .execute("SELECT * FROM users WHERE user_name = ?", [req.body.username]);
    if (rows.length > 0) {
      return res.status(409).json("해당 유저가 이미 존재합니다.");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const q =
      "INSERT INTO users(user_name, email, password,nickname,phonenumber,zipcode, address,detailaddress) VALUES (?, ?, ?, ?, ?, ? ,?, ?)";
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

    await db.get().execute(q, values);
    return res.status(200).json("회원가입이 완료되었습니다.");
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

// 로그인
const login = async (req, res) => {
  try {
    const [rows] = await db
      .get()
      .execute("SELECT * FROM users WHERE user_name = ?", [req.body.username]);
    if (rows.length === 0) {
      return res.status(400).json("아이디 또는 비밀번호가 틀렸습니다.");
    }

    const checkPassword = await bcrypt.compare(
      req.body.password,
      rows[0].password
    );
    if (!checkPassword) {
      return res.status(400).json("아이디 또는 비밀번호가 틀렸습니다!");
    }

    const accessToken = jwt.sign(
      { user_id: rows[0].user_id },
      process.env.ACCESS_SECRET,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      { user_id: rows[0].user_id },
      process.env.REFRESH_SECRET,
      { expiresIn: "24h" }
    );

    const { password, ...others } = rows[0];

    res
      .cookie("accessToken", accessToken, { httpOnly: true })
      .cookie("refreshToken", refreshToken, { httpOnly: true })
      .status(200)
      .json(others);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const kakaoLogin = async (req, res) => {
  const kakaoURL =
      `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=http://localhost:3000/auth/kakao/callback`;
  res.redirect(kakaoURL); // 클라이언트를 카카오 로그인 페이지로 리다이렉션
};

// 카카오 로그인 콜백 처리
const kakaoCallback = async (req, res) => {
  const code = req.query.code;

  try {
    // 카카오 Access Token 가져오기
    const tokenResponse = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        null,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
          params: {
            grant_type: "authorization_code",
            client_id: process.env.KAKAO_CLIENT_ID,
            redirect_uri: process.env.KAKAO_REDIRECT_URI,
            code,
          },
        }
    );
    const accessToken = tokenResponse.data.access_token;

    // 사용자 정보 가져오기
    const userResponse = await axios.post(
        "https://kapi.kakao.com/v2/user/me",
        null,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
    );

    const kakaoUser = userResponse.data;
    const kakaoId = kakaoUser.id;
    const nickname = kakaoUser.properties.nickname;

    /*
    // 데이터베이스에 사용자 존재 여부 확인
    const [rows] = await db
      .get()
      .execute("SELECT * FROM user WHERE kakao_id = ?", [kakaoId]);

    let userId;
    if (rows.length === 0) {
      // 신규 사용자면 DB에 등록
      const insertQuery =
        "INSERT INTO user (kakao_id, user_name) VALUES (?, ?)";
      const [result] = await db.get().execute(insertQuery, [kakaoId, nickname]);
      userId = result.insertId;
    } else {
      userId = rows[0].id;
    }
        */

    // JWT 토큰 생성
    const jwtToken = jwt.sign(
        { kakao_id: kakaoId },
        process.env.ACCESS_SECRET,
        {
          expiresIn: "1h", // 토큰 만료 시간 설정
        }
    );

    // 클라이언트에 토큰 전달 (쿠키 or 응답 JSON)
    res.cookie("accessToken", jwtToken, { httpOnly: true }); // 쿠키로 저장
    res.status(200).json({ message: "카카오 로그인 성공", nickname }); // 로그인 성공 응답
  } catch (error) {
    console.error("카카오 로그인 실패:", error.response?.data || error.message);
    res.status(500).json({ error: "카카오 인증 실패" });
  }
};

// 네이버 로그인 URL
const naverLogin = async (req, res) => {
  const naverURL =
      `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NAVER_CLIENT_ID}&redirect_uri=${process.env.NAVER_REDIRECT_URI}&state=STATE_STRING`;
  res.redirect(naverURL); // 클라이언트를 네이버 로그인 페이지로 리다이렉션
};

// 네이버 로그인 콜백 처리
const naverCallback = async (req, res) => {
  const code = req.body.code;
  const state = req.body.state;
  try {
    // 네이버 Access Token 가져오기
    const tokenResponse = await axios.post(
        "https://nid.naver.com/oauth2.0/token",
        null,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
          params: {
            grant_type: "authorization_code",
            client_id: process.env.NAVER_CLIENT_ID,
            client_secret: process.env.NAVER_CLIENT_SECRET,
            code,
            state,
          },
        }
    );

    const accessToken = tokenResponse.data.access_token;

    // 사용자 정보 가져오기
    const userResponse = await axios.post(
        "https://openapi.naver.com/v1/nid/me",
        null,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
    );

    const userData = userResponse.data.response;
    const naverId = userData.id;
    const email = userData.email;
    const nickname = userData.name;

    /*
   // 데이터베이스에 사용자 존재 여부 확인
    const [existingUser] = await db.get().execute("SELECT * FROM user WHERE social_id = ?", [naverId]);

    let userId;
    if (existingUser.length === 0) {
      // 신규 사용자면 DB에 등록
      const insertQuery = "INSERT INTO user (social_id, user_name) VALUES (?, ?)";
      const [result] = await db.get().execute(insertQuery, [naverId, nickname]);
      userId = result.insertId;
    } else {
      userId = existingUser[0].id;
    }
      */

    // JWT 토큰 생성
    const jwtToken = jwt.sign({ user_id: naverId }, process.env.ACCESS_SECRET, {
      expiresIn: "1h",
    });

    // 클라이언트에 토큰 전달 (쿠키로 저장)
    res
        .cookie("accessToken", jwtToken, { httpOnly: true })
        .status(200)
        .json({ message: "네이버 로그인 성공" });
  } catch (error) {
    console.error("네이버 로그인 실패:", error.response?.data || error.message);
    res.status(500).json({ error: "네이버 인증 실패" });
  }
};




const accessToken = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).send({ message: "Access token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    const [rows] = await db
      .get()
      .execute("SELECT * FROM users WHERE user_id = ?", [decoded.user_id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }
    const { password, ...others } = rows[0];
    res.status(200).json(others);
  } catch (error) {
    console.error(error);
    return res.status(403).send({ message: "Invalid or expired token" });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "로그아웃 성공" });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  accessToken,
  kakaoLogin,
  kakaoCallback,
  naverLogin,
  naverCallback,
};
