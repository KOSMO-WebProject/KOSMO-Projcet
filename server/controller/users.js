const db = require('../database/db');


// 아이디 찾기
const findByID = async (req, res) => {
    const { phone_number, user_name } = req.body;
    try {
        const [rows] = await db.get().execute("SELECT user_id FROM user WHERE phone_number = ? AND user_name = ?", [phone_number, user_name]);
        if (rows.length === 0) {
            return res.status(404).json("사용자를 찾을 수 없습니다.");
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

// 비밀번호 변경
const updatePassword = async (req, res) => {
    try {
        const { user_id, current_password, new_password } = req.body;
        const [rows] = await db.get().execute("SELECT * FROM user WHERE user_id = ?", [user_id]);
        if (rows.length === 0) {
            return res.status(404).json("사용자를 찾을 수 없습니다.");
        }
        const validPassword = await bcrypt.compare(current_password, rows[0].user_pw);
        if (!validPassword) {
            return res.status(400).json("현재 비밀번호가 틀렸습니다.");
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(new_password, salt);
        await db.get().execute("UPDATE user SET user_pw = ? WHERE user_id = ?", [hashedPassword, user_id]);
        res.status(200).json("비밀번호가 성공적으로 변경되었습니다.");
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

// 비밀번호 찾기 (이메일을 통한 임시 비밀번호 발송)
const resetPassword = async (req, res) => {
  const { id } = req.params; // URL 파라미터에서 user_id를 받음
  const { email } = req.body;

  try {
    // 1. 사용자 정보 확인
    const [userRows] = await db.get().execute("SELECT * FROM user WHERE user_id = ? AND email = ?", [id, email]);

    if (userRows.length === 0) {
      return res.status(404).json({ message: "아이디와 이메일이 일치하는 사용자를 찾을 수 없습니다." });
    }

    const user = userRows[0];

    // 2. 임시 비밀번호 생성 (기본적으로 문자+숫자 조합)
    const tempPassword = Math.random().toString(36).slice(-8);  // 8자리 랜덤 문자열

    // 3. 임시 비밀번호 해싱
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(tempPassword, salt);

    // 4. 임시 비밀번호로 데이터베이스 업데이트
    await db.get().execute("UPDATE user SET user_pw = ? WHERE user_id = ?", [hashedPassword, id]);

    // 5. 임시 비밀번호를 사용자 이메일로 전송
    const transporter = nodemailer.createTransport({
      service: "gmail", // 예시로 Gmail 사용
      auth: {
        user: process.env.EMAIL_USER,  // 이메일 계정
        pass: process.env.APP_PASS,  // 이메일 계정 비밀번호
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,  // 발신자 이메일
      to: email,                    // 수신자 이메일
      subject: "임시 비밀번호 안내",  // 이메일 제목
      text: `안녕하세요, ${id}님. 임시 비밀번호는: ${tempPassword} 입니다. 로그인 후 비밀번호를 변경해주세요.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: "이메일 발송 중 오류가 발생했습니다.", error: error.message });
      }
      res.status(200).json({ message: "임시 비밀번호가 이메일로 전송되었습니다." });
    });

  } catch (error) {
    console.error("비밀번호 찾기 중 오류 발생:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다.", error: error.message });
  }
};

// 개인정보 수정
const updateUserInfo = async (req, res) => {
  try {
    const {
      user_id,
      user_name,
      phone_number,
      email,
      date_of_birth,
      gender,
      nick_name,
    } = req.body;

    await db
      .get()
      .execute(
        "UPDATE user SET user_name = ?, phone_number = ?, email = ?, date_of_birth = ?, gender = ?, nick_name = ? WHERE user_id = ?",
        [
          user_name,
          phone_number,
          email,
          date_of_birth,
          gender,
          nick_name,
          user_id,
        ]
      );

    res.status(200).json("개인정보가 성공적으로 수정되었습니다.");
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const getAllUsers = async (req, res) => {
    const q = "SELECT * FROM performance_schema.users";
    try {
        const [results] = await db.get().execute(q);
        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
};


const getUserById = async (req, res) => {
    const q = 'SELECT * FROM performance_schema.users WHERE id = ?';
    try {
        const [results] = await db.get().execute(q, [req.params.id]);
        if (results.length === 0) {
            return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
        }
        res.status(200).json(results[0]);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
};

// 회원 탈퇴
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params; // URL에서 user_id를 받음

    // user_id로 user_no를 조회
    const [userRows] = await db.get().execute("SELECT user_no FROM user WHERE user_id = ?", [id]);
    
    // 사용자가 존재하지 않으면 404 반환
    if (userRows.length === 0) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    const user_no = userRows[0].user_no;

    // 데이터베이스에서 user_no에 해당하는 사용자 삭제
    const [result] = await db.get().execute("DELETE FROM user WHERE user_no = ?", [user_no]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "사용자를 삭제할 수 없습니다." });
    }

    // 주소 테이블은 `ON DELETE CASCADE` 설정이 되어 있기 때문에, 
    // 사용자 삭제 시 해당 사용자의 주소도 자동으로 삭제됩니다.

    // JSON 형태로 응답 보내기
    res.status(200).json({ message: "회원 탈퇴가 성공적으로 처리되었습니다." });
  } catch (error) {
    console.error("회원 탈퇴 중 오류 발생:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다.", error: error.message });
  }
};

module.exports = {
    getAllUsers,
    getUserById,
    findByID,
    updatePassword,
    updateUserInfo,
    deleteUser,
    resetPassword
};
