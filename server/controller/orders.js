const db = require('../database/db');
const {generateOrderNo} = require("../utils/currentyear");




const getOrdersList = async (req, res) => {
    try {
        const q = "SELECT * FROM 'order' WHERE user_no = ? ORDER BY order_no DESC";
        const [rows] = await db.get().execute(q, [req.user.user_no]);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

const postOrders = async (req, res) => {
    const { user_no, totalAmount, products } = req.body;
    console.log(user_no, totalAmount, products);

    const connection = await db.get().getConnection();
    try {
        await connection.beginTransaction();


        const order_no = generateOrderNo();
        // 1. 주문 정보 저장
        const q = "INSERT INTO `order` (order_no ,user_no, total_amount, payment_status, order_date) VALUES (?, ?, ?, 'PENDING', NOW())";
        const [orderResult] = await connection.execute(q,[order_no,user_no, totalAmount]);
        if (orderResult.affectedRows === 0) {
            return res.status(500).send("Internal Server Error");
        }
        // 2. 주문 상품 정보 저장 (여러 상품이 들어올 수 있으므로 배열로 받아서 처리)
        const productValues = products.map((product) => [order_no, product.product_no, product.quantity, product.price]);
        // 다중행 쿼리 삽입
        await connection.query(
            `INSERT INTO orderdetail (order_no, product_no, quantity, price) VALUES ?`,
            [productValues]
        );


        
        await connection.commit();
        res.status(201).json({ order_no });
    } catch (error) {
        console.error(error);
        await connection.rollback();
        res.status(500).send("Internal Server Error");
    } finally {
        connection.release();
    }
}

export async function updateOrderStatus(connection, orderId, status) {
    const [result] = await connection.execute(
        `UPDATE \`order\` SET payment_status = ? WHERE order_no = ?`,
        [status, orderId]
    );
    return result.affectedRows > 0;
}


module.exports = {
    getOrdersList,
    postOrders,
}