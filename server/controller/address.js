const db = require("../database/db");

// 모든 주소 조회
const getAllAddresses = async (req, res) => {
    const query = "SELECT * FROM address";
    try {
        const [results] = await db.get().execute(query);
        res.status(200).json(results);
    } catch (error) {
        console.error("Error fetching all addresses:", error);
        res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
};

// 특정 사용자 주소 조회
const getAddressByUserId = async (req, res) => {
    const query = "SELECT * FROM shopping.address WHERE user_no = ?";
    try {
        const [results] = await db.get().execute(query, [req.params.userId]);
        if (results.length === 0) {
            return res.status(404).json({ message: "주소를 찾을 수 없습니다." });
        }
        res.status(200).json(results);
    } catch (error) {
        console.error("Error fetching addresses by user ID:", error);
        res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
};

// 새로운 주소 추가
const addAddress = async (req, res) => {
    const {
        user_id,
        recipient_name,
        phone_number,
        postal_code,
        address,
        detailed_address,
        is_default,
    } = req.body;

    // 기본 배송지로 설정된 주소가 이미 존재한다면, 기존 주소는 기본 배송지 아니게 업데이트
    if (is_default === 1) {
        const updateQuery = "UPDATE address SET is_default = 0 WHERE user_no = ?";
        try {
            await db.get().execute(updateQuery, [user_no]);
        } catch (error) {
            console.error("기본 배송지 업데이트 실패:", error);
            return res.status(500).json({ message: "기본 배송지 업데이트 실패" });
        }
    }

    const query = `
        INSERT INTO address (user_no, recipient_name, phone_number, postal_code, address, detailed_address, is_default)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    try {
        await db
            .get()
            .execute(query, [
                user_id,
                recipient_name,
                phone_number,
                postal_code,
                address,
                detailed_address,
                is_default,
            ]);
        res.status(201).json({ message: "주소가 추가되었습니다." });
    } catch (error) {
        console.error("Error adding address:", error);
        res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
};

module.exports = {
    getAllAddresses,
    getAddressByUserId,
    addAddress,
};