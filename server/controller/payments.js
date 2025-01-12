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
// };


// @docs https://docs.tosspayments.com/reference/using-api/api-keys
const widgetSecretKey = process.env.TOSS_WIDGET_SECRET_KEY;
// 토스페이먼츠 API는 시크릿 키를 사용자 ID로 사용하고, 비밀번호는 사용하지 않습니다.
// 비밀번호가 없다는 것을 알리기 위해 시크릿 키 뒤에 콜론을 추가합니다.
// @docs https://docs.tosspayments.com/reference/using-api/authorization#%EC%9D%B8%EC%A6%9D
const encryptedWidgetSecretKey = "Basic " + Buffer.from(widgetSecretKey + ":").toString("base64");
// 결제위젯 승인
const paymentWidget = (req, res) => {
    const { paymentKey, orderId, amount } = req.body;

    // 결제 승인 API를 호출하세요.
    // 결제를 승인하면 결제수단에서 금액이 차감돼요.
    // @docs https://docs.tosspayments.com/guides/v2/payment-widget/integration#3-결제-승인하기
    fetch("https://api.tosspayments.com/v1/payments/confirm", {
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
    }).then(async function (response) {
        const result = await response.json();
        console.log(result);

        if (!response.ok) {
            // TODO: 결제 승인 실패 비즈니스 로직을 구현하세요.
            res.status(response.status).json(result);

            return;
        }

        // TODO: 결제 완료 비즈니스 로직을 구현하세요.
        res.status(response.status).json(result);
    });
};



module.exports = {
    paymentWidget,
}