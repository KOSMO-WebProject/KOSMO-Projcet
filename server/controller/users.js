const db = require('../database/db');

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
    getUserById
};
