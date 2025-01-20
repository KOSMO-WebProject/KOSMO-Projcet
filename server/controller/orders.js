const db = require('../database/db');
const {generateOrderNo} = require("../utils/currentyear");




const getOrdersList = async (req, res) => {
    const { user_no } = req.params;
    try {
        const q = `
            SELECT 
                o.order_no,
                o.user_no,
                o.order_date,
                o.total_amount,
                o.payment_status,
                p.payment_date,
                p.status AS payment_status,
                od.product_no,
                od.quantity,
                od.price,
                pr.name AS product_name,
                pr.img_url
            FROM 
                shopping.order AS o
            INNER JOIN 
                shopping.payment AS p ON o.order_no = p.order_no
            INNER JOIN 
                shopping.orderdetail AS od ON o.order_no = od.order_no
            INNER JOIN 
                shopping.product AS pr ON od.product_no = pr.product_no
            WHERE 
                o.user_no = ?
                AND o.payment_status = 'COMPLETED'
                AND p.status = 'COMPLETED'
            ORDER BY 
                o.order_date DESC
        `;
        const [rows] = await db.get().execute(q, [user_no]);


        const groupedOrders = rows.reduce((acc, row) => {
            const { order_no, product_no, quantity, price, product_name, img_url, ...orderDetails } = row;

            if (!acc[order_no]) {
                acc[order_no] = {
                    ...orderDetails,
                    products: [],
                };
            }

            acc[order_no].products.push({
                product_no,
                quantity,
                price,
                name: product_name,
                img_url,
            });

            return acc;
        }, {});

        const ordersArray = Object.values(groupedOrders);

        res.status(200).json(ordersArray);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

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



module.exports = {
    getOrdersList,
    postOrders,
}