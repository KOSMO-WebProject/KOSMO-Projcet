const db = require("../database/db"); // DB 연결 객체 불러오기
const bcrypt = require("bcrypt"); // 비밀번호 해싱을 위한 bcrypt 라이브러리
const jwt = require("jsonwebtoken"); // JWT를 이용한 인증을 위한 라이브러리
const axios = require("axios"); // 외부 API 요청을 위한 axios 라이브러리

// 회원가입
const register = async (req, res) => {
  const connection = await db.get().getConnection(); // DB 연결
  try {
    // 1. 아이디 중복 확인
    const q = "SELECT * FROM user WHERE user_id = ?"; // user_id로 이미 존재하는 유저가 있는지 확인하는 쿼리
    const [rows] = await connection.execute(q, [req.body.user_id]); // 쿼리 실행
    if (rows.length > 0) { // 이미 존재하면 409(Conflict) 에러 반환
      return res.status(409).json("해당 유저가 이미 존재합니다.");
    }

    // 2. 비밀번호 해싱
    const salt = await bcrypt.genSalt(10); // bcrypt를 사용해 salt 값 생성
    const hashedPassword = await bcrypt.hash(req.body.user_pw, salt); // 비밀번호 해싱

    // 3. 사용자 정보 삽입
    const q1 = `INSERT INTO user (user_id, user_pw, user_name, phone_number, email, date_of_birth, gender, nick_name)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`; // 사용자 정보를 user 테이블에 삽입하는 쿼리입니다.
    
   // 유효한 경우 ISO 형식으로 변환
    let gender =
      req.body.gender === "male"
        ? "M"
        : req.body.gender === "female"
        ? "F"
        : "U";

    const userValues = [
      req.body.user_id, // 사용자 아이디 (회원가입 시 입력된 아이디)
      hashedPassword, // 해싱된 비밀번호 (bcrypt를 이용하여 암호화된 비밀번호)
      req.body.user_name, // 사용자 이름 (회원가입 시 입력된 이름)
      req.body.phone_number, // 전화번호 (회원가입 시 입력된 전화번호)
      req.body.email, // 이메일 (회원가입 시 입력된 이메일)
      req.body.date_of_birth, // 생년월일 (회원가입 시 입력된 생년월일)
      gender, // 성별 ("M", "F", "U" 중 하나로 처리)
      req.body.nick_name, // 닉네임 (회원가입 시 입력된 닉네임)
    ];

    await connection.beginTransaction(); // 트랜잭션 시작

    const [rows1] = await connection.execute(q1, userValues); // 사용자 정보 삽입 쿼리 실행
    const userNo = rows1.insertId; // 삽입된 사용자의 ID (자동 생성된 값)

    // 4. 주소 정보 삽입
    const addressQuery = `INSERT INTO address (user_no, recipient_name, phone_number, postal_code, address, detailed_address, is_default)
                          VALUES (?, ?, ?, ?, ?, ?, ?)`; // 주소 정보를 address 테이블에 삽입하는 쿼리
    const addressValues = [
      userNo, // 사용자 ID (user 테이블에서 삽입된 후 얻은 userNo를 참조)
      req.body.user_name, // 수취인 이름 (회원가입 시 입력된 이름)
      req.body.phone_number, // 수취인 전화번호 (회원가입 시 입력된 전화번호)
      req.body.postal_code, // 우편번호 (회원가입 시 입력된 우편번호)
      req.body.address, // 주소 (회원가입 시 입력된 기본 주소)
      req.body.detailed_address, // 상세 주소 (회원가입 시 입력된 상세 주소)
      1, // 기본 배송지 여부 (1로 설정하여 기본 배송지로 지정)
    ];

    await connection.execute(addressQuery, addressValues); // 주소 삽입 쿼리 실행

    await connection.commit(); // 트랜잭션 커밋 (변경 사항 저장)

    // 5. 성공 응답
    return res.status(201).json({ message: "회원가입이 완료되었습니다." });
  } catch (error) {
    await connection.rollback(); // 오류 발생 시 트랜잭션 롤백 (변경 사항 취소)
    console.error(error); // 오류 로그 출력
    return res.status(500).json(error); // 서버 오류 응답
  } finally {
    connection.release(); // DB 연결 반환
  }
};

// 로그인
const login = async (req, res) => {
  const { password } = req.body; // 요청에서 비밀번호를 가져옴
  try {
    const [rows] = await db
      .get()
      .execute("SELECT user_no, user_pw, user_id, user_name, phone_number, email, date_of_birth, gender, nick_name FROM user WHERE user_id = ?", [req.body.user_id]); // 아이디로 사용자 조회
    if (rows.length === 0) { // 사용자 정보가 없으면 400(잘못된 요청) 에러 반환
      return res.status(400).json("아이디 또는 비밀번호가 틀렸습니다.");
    }

    const checkPassword = await bcrypt.compare(password, rows[0].user_pw); // 입력한 비밀번호와 저장된 비밀번호 비교
    if (!checkPassword) { // 비밀번호가 틀리면 400(잘못된 요청) 에러 반환
      return res.status(400).json("아이디 또는 비밀번호가 틀렸습니다!");
    }

    // JWT 토큰 생성 (accessToken은 1시간 동안 유효)
    const accessToken = jwt.sign(
      { user_no: rows[0].user_no },
      process.env.ACCESS_SECRET,
      { expiresIn: "1h" }
    );

    // Refresh 토큰 생성 (24시간 동안 유효)
    const refreshToken = jwt.sign(
      { user_no: rows[0].user_no },
      process.env.REFRESH_SECRET,
      { expiresIn: "24h" }
    );

    const { user_pw, ...others } = rows[0]; // 비밀번호 제외한 사용자 정보

    // 클라이언트에 쿠키로 토큰 전달
    res
      .cookie("accessToken", accessToken, { httpOnly: true })
      .cookie("refreshToken", refreshToken, { httpOnly: true })
      .status(200)
      .json(others); // 사용자 정보와 함께 응답
  } catch (error) {
    console.error(error); // 오류 로그 출력
    res.status(500).json(error); // 서버 오류 응답
  }
};

// 카카오 로그인
const kakaoLogin = async (req, res) => {
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=http://localhost:3000/auth/kakao/callback`;
  res.redirect(kakaoURL); // 클라이언트를 카카오 로그인 페이지로 리다이렉션
};

// 카카오 로그인 콜백 처리
const kakaoCallback = async (req, res) => {
  const code = req.query.code; // 카카오 인증 코드

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
    const accessToken = tokenResponse.data.access_token; // 카카오 액세스 토큰

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

    const kakaoUser = userResponse.data; // 카카오 사용자 정보
    const kakaoId = kakaoUser.id; // 카카오 아이디
    const nickname = kakaoUser.properties.nickname; // 카카오 닉네임

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

    // JWT 토큰 생성 (카카오 로그인 사용자의 정보로 토큰을 생성)
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
  const naverURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NAVER_CLIENT_ID}&redirect_uri=${process.env.NAVER_REDIRECT_URI}&state=STATE_STRING`;
  res.redirect(naverURL); // 클라이언트를 네이버 로그인 페이지로 리다이렉션
};

// 네이버 로그인 콜백 처리
const naverCallback = async (req, res) => {
  const code = req.body.code; // 네이버 인증 코드
  const state = req.body.state; // 인증 상태
  
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

    const accessToken = tokenResponse.data.access_token; // 네이버 액세스 토큰

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

    const userData = userResponse.data.response; // 네이버 사용자 정보
    const naverId = userData.id; // 네이버 ID
    const email = userData.email; // 이메일
    const nickname = userData.name; // 이름

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

    // JWT 토큰 생성 (네이버 로그인 사용자의 정보로 토큰을 생성)
    const jwtToken = jwt.sign({ user_no: naverId }, process.env.ACCESS_SECRET, {
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

// Access Token 확인
const accessToken = async (req, res) => {
  const token = req.cookies.accessToken; // 쿠키에서 accessToken 가져오기
  if (!token) { // 토큰이 없으면 401(Unauthorized) 에러 반환
    return res.status(401).send({ message: "Access token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET); // JWT 토큰 검증
    const [rows] = await db
      .get()
      .execute("SELECT * FROM user WHERE user_no = ?", [decoded.user_no]); // user_no로 사용자 정보 조회
    if (rows.length === 0) { // 사용자가 없으면 404(Not Found) 에러 반환
      return res.status(404).json({ message: "User not found." });
    }
    const { user_pw, ...others } = rows[0]; // 비밀번호 제외한 사용자 정보
    res.status(200).json(others); // 사용자 정보 응답
  } catch (error) {
    console.error(error); // 오류 로그 출력
    return res.status(403).send({ message: "Invalid or expired token" }); // 토큰 만료 또는 유효하지 않으면 403(Forbidden) 에러 반환
  }
};

// 로그아웃
const logout = (req, res) => {
  try {
    res.clearCookie("accessToken"); // accessToken 쿠키 삭제
    res.clearCookie("refreshToken"); // refreshToken 쿠키 삭제
    res.status(200).json({ message: "로그아웃 성공" }); // 로그아웃 성공 응답
  } catch (error) {
    console.error(error); // 오류 로그 출력
    res.status(500).json(error); // 서버 오류 응답
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
