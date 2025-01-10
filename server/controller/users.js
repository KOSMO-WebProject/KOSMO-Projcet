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








const getAllUsers = async (req, res) => {
    const q = "SELECT * FROM users";
    try {
        const [results] = await db.get().execute(q);
        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
};


const getUserById = async (req, res) => {
    const q = 'SELECT * FROM users WHERE id = ?';
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

module.exports = {
    getAllUsers,
    getUserById,
    findByID,
};
