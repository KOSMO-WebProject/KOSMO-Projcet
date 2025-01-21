const db = require("../database/db"); // 데이터베이스 연결 객체를 가져옵니다.

// 모든 주소 조회
const getAllAddresses = async (req, res) => {
  // 비동기 함수로 모든 주소를 조회합니다.
  const query = "SELECT * FROM address"; // address 테이블에서 모든 열(*)을 선택하는 SQL 쿼리를 정의합니다.
  try {
    const [results] = await db.get().execute(query); // 쿼리를 실행하고 결과를 가져옵니다.
    res.status(200).json(results); // 결과를 200 상태 코드와 함께 JSON 형태로 반환합니다.
  } catch (error) {
    // 오류가 발생하면
    console.error("Error fetching all addresses:", error); // 오류 로그를 출력합니다.
    res.status(500).json({ message: "서버 오류가 발생했습니다." }); // 500 상태 코드와 오류 메시지를 반환합니다.
  }
};

// 특정 사용자 주소 조회
const getAddressByUserId = async (req, res) => {
  // 비동기 함수로 특정 사용자 ID에 해당하는 주소를 조회합니다.
  const query = "SELECT * FROM shopping.address WHERE user_no = ?"; // shopping.address 테이블에서 user_no(사용자 번호)가 일치하는 주소를 조회하는 SQL 쿼리를 정의합니다.
  try {
    const [results] = await db.get().execute(query, [req.params.userId]); // URL 파라미터로 받은 userId로 쿼리를 실행합니다.
    if (results.length === 0) {
      // 주소가 없으면
      return res.status(404).json({ message: "주소를 찾을 수 없습니다." }); // 404 상태 코드와 메시지를 반환합니다.
    }
    res.status(200).json(results); // 결과를 200 상태 코드와 함께 JSON 형태로 반환합니다.
  } catch (error) {
    // 오류가 발생하면
    console.error("Error fetching addresses by user ID:", error); // 오류 로그를 출력합니다.
    res.status(500).json({ message: "서버 오류가 발생했습니다." }); // 500 상태 코드와 오류 메시지를 반환합니다.
  }
};

// 새로운 주소 추가
const addAddress = async (req, res) => {
  // 비동기 함수로 새로운 주소를 추가합니다.
  const {
    user_id,
    recipient_name,
    phone_number,
    postal_code,
    address,
    detailed_address,
    is_default,
  } = req.body; // 요청 본문에서 주소 정보를 가져옵니다.

  // 기본 배송지로 설정된 주소가 이미 존재한다면, 기존 주소는 기본 배송지 아니게 업데이트
  if (is_default === 1) {
    // is_default가 1이면 기본 배송지로 설정합니다.
    const updateQuery = "UPDATE address SET is_default = 0 WHERE user_no = ?"; // user_no가 일치하는 기존 기본 배송지의 is_default 값을 0으로 업데이트하는 SQL 쿼리를 정의합니다.
    try {
      await db.get().execute(updateQuery, [user_no]); // 쿼리를 실행하여 기존 기본 배송지를 기본 배송지 아닌 주소로 업데이트합니다.
    } catch (error) {
      // 오류가 발생하면
      console.error("기본 배송지 업데이트 실패:", error); // 오류 로그를 출력합니다.
      return res.status(500).json({ message: "기본 배송지 업데이트 실패" }); // 500 상태 코드와 오류 메시지를 반환합니다.
    }
  }

  const query = `
        INSERT INTO address (user_no, recipient_name, phone_number, postal_code, address, detailed_address, is_default)
        VALUES (?, ?, ?, ?, ?, ?, ?)  // 새로운 주소 정보를 address 테이블에 삽입하는 SQL 쿼리를 정의합니다.
    `;
  try {
    await db.get().execute(query, [
      user_id, // 사용자의 ID
      recipient_name, // 수취인 이름
      phone_number, // 전화번호
      postal_code, // 우편번호
      address, // 기본 주소
      detailed_address, // 상세 주소
      is_default, // 기본 배송지 여부
    ]); // 쿼리를 실행하여 새로운 주소를 데이터베이스에 추가합니다.
    res.status(201).json({ message: "주소가 추가되었습니다." }); // 201 상태 코드와 성공 메시지를 반환합니다.
  } catch (error) {
    // 오류가 발생하면
    console.error("Error adding address:", error); // 오류 로그를 출력합니다.
    res.status(500).json({ message: "서버 오류가 발생했습니다." }); // 500 상태 코드와 오류 메시지를 반환합니다.
  }
};

module.exports = {
  // 이 모듈에서 사용할 함수들을 외부에 내보냅니다.
  getAllAddresses,
  getAddressByUserId,
  addAddress,
};
