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
  const query = "SELECT * FROM address WHERE user_id = ?";
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
  const query = `
        INSERT INTO address (user_id, recipient_name, phone_number, postal_code, address, detailed_address, is_default)
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
