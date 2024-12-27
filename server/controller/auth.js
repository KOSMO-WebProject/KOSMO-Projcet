const db = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// 회원가입
const register = async (req, res) => {
  try {
    const [rows] = await db
      .get()
      .execute("SELECT * FROM user WHERE id = ?", [req.body.user_id]);
    if (rows.length > 0) {
      return res.status(409).json("해당 유저가 이미 존재합니다.");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.user_pw, salt);

    const q =
      "INSERT INTO user(`user_id`,`user_pw`,`user_name`,`phone_number`,`email`,`date_of_birth`,`gender`) VALUES (?)";
    const values = [
      req.body.user_id,
      hashedPassword,
      req.body.user_name,
      req.body.phone_number,
      req.body.email,
      req.body.date_of_birth,
      req.body.gender,
    ];

    const q1 =
      "insert into address(`user_id`, `recipient_name`, `phone_number`, `postal_code`, `address`, `detailed_address`, `is_default`) values(?)";
    const values1 = [
      req.body.user_id,
      req.body.recipient_name,
      req.body.phone_number,
      req.body.postal_code,
      req.body.address,
      req.body.detailed_address,
      req.body.is_default,
    ];

    await db.get().execute(q, [values]);
    await db.get().execute(q1, [values1]);
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
      .execute("SELECT * FROM user WHERE user_name = ?", [req.body.username]);
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

module.exports = {
  register,
  login,
  logout,
  accessToken,
};
