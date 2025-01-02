const db = require("../database/db");
const bcrypt = require("bcrypt"); // 비밀번호를 암호화해주는 코드
const jwt = require("jsonwebtoken"); // JWT 토큰을 생성하고 검증하는 라이브러리입니다. 주로 사용자 인증에 사용됩니다.
const axios = require("axios");

// 회원가입
const register = async (req, res) => {
  try {
    const [rows] = await db
      .get()
      .execute("SELECT * FROM user WHERE user_id = ?", [req.body.user_id]);
    if (rows.length > 0) {
      return res.status(409).json("해당 유저가 이미 존재합니다.");
    }

    const salt = await bcrypt.genSalt(10); // Salt는 사용자의 비밀번호에 난수를 추가하여 함께 해시 함수를 돌려 보안을 높이는 매개변수이다.
    const hashedPassword = await bcrypt.hash(req.body.user_pw, salt); // 비빌번호 해싱 비밀번호 입력 시 ...으로 나오게 합니다.

    const q = "INSERT INTO user(user_id, user_pw, user_name) VALUES (?)";
    values = [
      req.body.user_id, // pk값
      hashedPassword, // 위에서 지정한 비빌번호 ***으로 나오게 합니다.
      req.body.user_name, // 사용자 이름
      req.body.phone_number, // 비빌번호
      req.body.postal_code, // 우편번호
      req.body.address, // 주소
      req.body.detailed_address, // 상세 주소
      req.body.is_default, // 주소 및 상세주소를 기본배송지로 적용
    ];
    const [rows1] = await db.get().execute(q, values);
    console.log(rows1);

    if (rows1) {
      const q = "SELECT * FROM user WHERE user_id = ?";
      const [rows2] = await db.get().execute(q, [req.body.user_id]);
      const id = rows2[0].id;

      const q1 = "INSERT INTO address (user_id, recipient_name) VALUES (?, ?)";
      await db.get().execute(q1, [id, req.body.user_name]);
      return res.status(201).json("회원가입이 완료되었습니다.");
    }
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
      .execute("SELECT * FROM user WHERE user_id = ?", [req.body.user_id]);
    if (rows.length === 0) {
      return res.status(400).json("아이디 또는 비밀번호가 틀렸습니다.");
    }

    const checkPassword = await bcrypt.compare(
      req.body.user_pw,
      rows[0].user_pw
    );
    if (!checkPassword) {
      return res.status(400).json("아이디 또는 비밀번호가 틀렸습니다!");
    }

    const accessToken = jwt.sign(
      { user_id: rows[0].id },
      process.env.ACCESS_SECRET,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      { user_id: rows[0].id },
      process.env.REFRESH_SECRET,
      { expiresIn: "24h" }
    );

    const { user_pw, ...others } = rows[0];

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

const accessToken = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).send({ message: "Access token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    const [rows] = await db
      .get()
      .execute("SELECT * FROM user WHERE user_id = ?", [decoded.user_id]);
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

// 카카오 로그인 URL로 리디렉션
const kakaoLogin = async (req, res) => {
  const kakaoURL =
    "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=6b10a8106270f172344447e5cec8953b&redirect_uri=http://localhost:3000/auth/kakao/login";
  res.redirect(kakaoURL);
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

// 카카오 로그아웃 처리
const kakaoLogout = async (req, res) => {
  try {
    // 클라이언트에서 받은 쿠키의 accessToken
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({ message: "Access token is missing" });
    }

    // 카카오 API로 로그아웃 요청
    const logoutResponse = await axios.post(
      "https://kapi.kakao.com/v1/user/logout",
      null,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // 카카오 서버에서 로그아웃 성공
    if (logoutResponse.status === 200) {
      // 로그아웃 성공 시, 클라이언트의 쿠키에서 accessToken 제거
      res.clearCookie("accessToken");
      return res.status(200).json({ message: "카카오 로그아웃 성공" });
    } else {
      return res.status(400).json({ message: "카카오 로그아웃 실패" });
    }
  } catch (error) {
    console.error("카카오 로그아웃 실패:", error.response?.data || error.message);
    res.status(500).json({ error: "카카오 로그아웃 처리 중 오류 발생" });
  }
};

module.exports = {
  register,
  login,
  logout,
  accessToken,
  kakaoLogin,
  kakaoCallback,
  kakaoLogout,
};
