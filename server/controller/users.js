const db = require("../database/db"); // 데이터베이스 연결 모듈 불러오기
const bcrypt = require("bcrypt"); // 비밀번호 암호화 라이브러리 불러오기
const nodemailer = require("nodemailer"); // 이메일 전송 라이브러리 불러오기

// 아이디 찾기: 사용자가 입력한 전화번호와 이름으로 사용자 아이디를 찾는 함수
const findByID = async (req, res) => {
    const { phone_number, user_name } = req.body; // 요청 본문에서 전화번호와 사용자 이름 추출
    try {
        // 사용자 아이디를 찾는 SQL 쿼리 실행
        const [rows] = await db
            .get()
            .execute(
                "SELECT user_id FROM user WHERE phone_number = ? AND user_name = ?",
                [phone_number, user_name]
            );

        // 사용자가 없을 경우 404 상태와 오류 메시지 반환
        if (rows.length === 0) {
            return res.status(404).json("사용자를 찾을 수 없습니다.");
        }

        // 사용자가 존재하면 아이디를 반환
        res.status(200).json(rows[0]);
    } catch (error) {
        // 에러 발생 시 500 상태와 에러 메시지 반환
        console.error(error);
        res.status(500).json(error);
    }
};

// 비밀번호 변경: 사용자가 현재 비밀번호를 입력하고 새로운 비밀번호로 변경하는 함수
const updatePassword = async (req, res) => {
    try {
        const { user_id, current_password, new_password } = req.body; // 요청 본문에서 사용자 아이디, 현재 비밀번호, 새 비밀번호 추출
        // 사용자 정보 조회 SQL 쿼리 실행
        const [rows] = await db
            .get()
            .execute("SELECT * FROM user WHERE user_id = ?", [user_id]);

        // 사용자가 없을 경우 404 상태와 오류 메시지 반환
        if (rows.length === 0) {
            return res.status(404).json("사용자를 찾을 수 없습니다.");
        }

        // bcrypt를 사용하여 현재 비밀번호와 데이터베이스에 저장된 비밀번호 비교
        const validPassword = await bcrypt.compare(
            current_password,
            rows[0].user_pw
        );
        if (!validPassword) {
            // 비밀번호가 일치하지 않으면 400 상태와 오류 메시지 반환
            return res.status(400).json("현재 비밀번호가 틀렸습니다.");
        }

        // 새로운 비밀번호를 해싱하여 저장
        const salt = await bcrypt.genSalt(10); // 솔트 생성
        const hashedPassword = await bcrypt.hash(new_password, salt); // 새 비밀번호 해싱

        // 데이터베이스에 새로운 비밀번호로 업데이트
        await db
            .get()
            .execute("UPDATE user SET user_pw = ? WHERE user_id = ?", [
                hashedPassword,
                user_id,
            ]);

        // 비밀번호 변경 성공 메시지 반환
        res.status(200).json("비밀번호가 성공적으로 변경되었습니다.");
    } catch (error) {
        // 에러 발생 시 500 상태와 에러 메시지 반환
        console.error(error);
        res.status(500).json(error);
    }
};

// 비밀번호 찾기: 이메일로 임시 비밀번호를 발송하는 함수
const resetPassword = async (req, res) => {
    const { id } = req.params; // URL 파라미터에서 사용자 아이디 추출
    const { email } = req.body; // 요청 본문에서 이메일 추출

    try {
        // 사용자 정보 확인: 사용자 아이디와 이메일을 사용하여 사용자를 조회
        const [userRows] = await db
            .get()
            .execute("SELECT * FROM user WHERE user_id = ? AND email = ?", [
                id,
                email,
            ]);

        // 사용자가 없을 경우 404 상태와 오류 메시지 반환
        if (userRows.length === 0) {
            return res
                .status(404)
                .json({
                    message: "아이디와 이메일이 일치하는 사용자를 찾을 수 없습니다.",
                });
        }

        const user = userRows[0]; // 사용자 정보 추출

        // 임시 비밀번호 생성 (랜덤 문자열 8자리)
        const tempPassword = Math.random().toString(36).slice(-8); // 8자리 랜덤 문자열

        // 임시 비밀번호 해싱
        const salt = await bcrypt.genSalt(10); // 솔트 생성
        const hashedPassword = await bcrypt.hash(tempPassword, salt); // 해싱된 임시 비밀번호

        // 데이터베이스에 임시 비밀번호로 업데이트
        await db
            .get()
            .execute("UPDATE user SET user_pw = ? WHERE user_id = ?", [
                hashedPassword,
                id,
            ]);

        // 이메일 전송을 위한 transporter 설정 (Gmail 사용 예시)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // 이메일 계정
                pass: process.env.APP_PASS, // 이메일 계정 비밀번호
            },
        });

        // 이메일 발송 내용 설정
        const mailOptions = {
            from: process.env.EMAIL_USER, // 발신자 이메일
            to: email, // 수신자 이메일
            subject: "임시 비밀번호 안내", // 이메일 제목
            text: `안녕하세요, ${id}님. 임시 비밀번호는: ${tempPassword} 입니다. 로그인 후 비밀번호를 변경해주세요.`, // 이메일 내용
        };

        // 이메일 발송
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res
                    .status(500)
                    .json({
                        message: "이메일 발송 중 오류가 발생했습니다.",
                        error: error.message,
                    });
            }
            res
                .status(200)
                .json({ message: "임시 비밀번호가 이메일로 전송되었습니다." });
        });
    } catch (error) {
        // 에러 발생 시 500 상태와 에러 메시지 반환
        console.error("비밀번호 찾기 중 오류 발생:", error);
        res
            .status(500)
            .json({ message: "서버 오류가 발생했습니다.", error: error.message });
    }
};

// 개인정보 수정: 사용자가 자신의 개인정보를 수정하는 함수
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
        } = req.body; // 요청 본문에서 개인정보 추출

        // 개인정보 수정 SQL 쿼리 실행
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

        // 개인정보 수정 성공 메시지 반환
        res.status(200).json("개인정보가 성공적으로 수정되었습니다.");
    } catch (error) {
        // 에러 발생 시 500 상태와 에러 메시지 반환
        console.error(error);
        res.status(500).json(error);
    }
};

// 모든 사용자 조회: 모든 사용자의 정보를 반환하는 함수
const getAllUsers = async (req, res) => {
    const q = "SELECT * FROM performance_schema.users"; // 성능 스키마에서 모든 사용자 정보 조회
    try {
        // 사용자 정보 조회 SQL 쿼리 실행
        const [results] = await db.get().execute(q);
        // 사용자 정보 반환
        res.status(200).json(results);
    } catch (error) {
        // 에러 발생 시 500 상태와 에러 메시지 반환
        console.error("Error fetching all users:", error);
        res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
};

// 사용자 ID로 사용자 조회: 특정 ID를 가진 사용자 정보를 반환하는 함수
const getUserById = async (req, res) => {
    const q = "SELECT * FROM performance_schema.users WHERE id = ?"; // 특정 사용자 ID로 조회
    try {
        // 사용자 정보 조회 SQL 쿼리 실행
        const [results] = await db.get().execute(q, [req.params.id]);

        // 사용자가 없을 경우 404 상태와 오류 메시지 반환
        if (results.length === 0) {
            return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
        }

        // 사용자 정보 반환
        res.status(200).json(results[0]);
    } catch (error) {
        // 에러 발생 시 500 상태와 에러 메시지 반환
        console.error("Error fetching user by ID:", error);
        res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
};

// 회원 탈퇴: 사용자가 탈퇴할 때 해당 사용자 정보를 삭제하는 함수
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params; // URL에서 사용자 ID 추출

        // 사용자 ID로 사용자 번호 조회
        const [userRows] = await db
            .get()
            .execute("SELECT user_no FROM user WHERE user_id = ?", [id]);

        // 사용자가 없을 경우 404 상태와 오류 메시지 반환
        if (userRows.length === 0) {
            return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
        }

        const user_no = userRows[0].user_no; // 사용자 번호 추출

        // 데이터베이스에서 해당 사용자 번호로 사용자 삭제
        const [result] = await db
            .get()
            .execute("DELETE FROM user WHERE user_no = ?", [user_no]);

        // 삭제된 사용자가 없을 경우 404 상태와 오류 메시지 반환
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "사용자를 삭제할 수 없습니다." });
        }

        // 해당 사용자의 주소도 자동으로 삭제됨 (ON DELETE CASCADE 설정)

        // 회원 탈퇴 성공 메시지 반환
        res.status(200).json({ message: "회원 탈퇴가 성공적으로 처리되었습니다." });
    } catch (error) {
        // 에러 발생 시 500 상태와 에러 메시지 반환
        console.error("회원 탈퇴 중 오류 발생:", error);
        res
            .status(500)
            .json({ message: "서버 오류가 발생했습니다.", error: error.message });
    }
};

// 해당 함수들을 외부에서 사용할 수 있도록 export
module.exports = {
    getAllUsers,
    getUserById,
    findByID,
    updatePassword,
    updateUserInfo,
    deleteUser,
    resetPassword,
};
