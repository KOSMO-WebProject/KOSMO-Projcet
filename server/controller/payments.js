const db = require('../database/db');
// 결제 요청
// const payment = async (req, res) => {
//     const encryptedSecretKey =
//          `Basic ${Buffer.from(SECRET_KEY + ":", "utf8").toString("base64")}`
//     try {
//         await axios.post(
//             `https://api.tosspayments.com/v1/payments/confirm`,
//             {
//                 customerKey: "customerKey",
//                 paymentKey: req.body.paymentKey,
//                 orderId: req.body.orderId,
//                 amount: req.body.amount,
//             },
//             {
//                 headers: {
//                     Authorization: `Basic ${Buffer.from(SECRET_KEY + ":", "utf8").toString("base64")}`,
//                     "Content-Type": "application/json",
//                 },
//             }
//         );
//         res.status(200).send("OK");
//     } catch (error) {
//         console.error(error.response.data.message);
//         res.status(500).send(error.response.data.message);
//     }
// }

// @docs https://docs.tosspayments.com/reference/using-api/api-keys
const widgetSecretKey = process.env.TOSS_WIDGET_SECRET_KEY;
// 토스페이먼츠 API 는 시크릿 키를 사용자 ID로 사용하고, 비밀번호는 사용하지 않습니다.
// 비밀번호가 없다는 것을 알리기 위해 시크릿 키 뒤에 콜론을 추가합니다.
// @docs https://docs.tosspayments.com/reference/using-api/authorization#%EC%9D%B8%EC%A6%9D
const encryptedWidgetSecretKey = "Basic " + Buffer.from(widgetSecretKey + ":").toString("base64");
// 결제위젯 승인
const paymentWidget = async (req, res) => {
    const { paymentKey, orderId, amount } = req.body;

    const connection = await db.get().getConnection();

    try {
        await connection.beginTransaction();

        // 1. Toss Payments 결제 승인 API 호출
        const paymentApprovalResult = await confirmPayment(paymentKey, orderId, amount);

        // 2. 주문 정보 업데이트
        await updateOrderStatus(connection, orderId, 'COMPLETED');

        // 3. 결제 정보 저장
        await savePaymentInfo(connection, orderId, amount, paymentKey);

        // 4. 결제 성공 시 장바구니 정리 (옵션)
        await clearCartAfterPayment(connection, orderId);


        // 5. 트랜잭션 커밋 및 응답
        await connection.commit();
        res.status(200).json({
            message: "Payment approved successfully.",
            paymentDetails: paymentApprovalResult,
        });
    } catch (error) {
        await connection.rollback();
        console.error("Error during payment approval:", error);
        res.status(500).json({ message: error.message || "Failed to process payment." });
    } finally {
        connection.release();
    }
};

async function confirmPayment(paymentKey, orderId, amount) {
    try {
        const response = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
            method: "POST",
            headers: {
                Authorization: encryptedWidgetSecretKey,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderId: orderId,
                amount: amount,
                paymentKey: paymentKey,
            }),
        });

        if (!response.ok) {
            const errorResult = await response.json();
            console.error("Toss Payment Approval Failed:", errorResult);
            throw new Error(errorResult.message || "Payment approval failed.");
        }

        return await response.json();
    } catch (error) {
        console.error("Error in confirmPayment:", error);
        throw error;
    }
}
async function updateOrderStatus(connection, orderId, completed) {
    const [result] = await connection.execute(
        `UPDATE \`order\` SET payment_status = ? WHERE order_no = ?`,
        [completed, orderId]
    );
    return result.affectedRows > 0;
}


async function savePaymentInfo(connection, orderId, amount, paymentKey) {
    const [result] = await connection.execute(
        `INSERT INTO payment (order_no, amount, status, payment_date, paymentKey) 
         VALUES (?, ?, 'COMPLETED', NOW(), ?)`,
        [orderId, amount, paymentKey]
    );
    return result.affectedRows > 0;
}



async function clearCartAfterPayment(connection, orderId) {
    const query = `
        DELETE ci
        FROM cartitem ci
        JOIN cart c ON ci.cart_no = c.cart_no
        WHERE c.user_no = (SELECT user_no FROM \`order\` WHERE order_no = ?)
          AND ci.product_no IN (SELECT product_no FROM orderdetail WHERE order_no = ?)
    `;
    const [result] = await connection.execute(query, [orderId, orderId]);
    return result.affectedRows > 0;
}


module.exports = {
    paymentWidget,
}