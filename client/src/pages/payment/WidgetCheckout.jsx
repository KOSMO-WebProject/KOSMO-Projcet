import React, { useEffect, useState } from "react";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { useLocation } from "react-router-dom";
import axios from "axios";

const clientKey = process.env.REACT_APP_TOSS_CLIENT_KEY;
const customerKey = generateRandomString();

export function WidgetCheckoutPage() {
    const location = useLocation();
    const { totalAmount, selectedProducts, currentUser } = location.state;


    const [amount, setAmount] = useState({
        currency: "KRW",
        value: totalAmount,
    });
    const [ready, setReady] = useState(false);
    const [widgets, setWidgets] = useState(null);

    // 토스페이먼츠 위젯 초기화
    useEffect(() => {

        async function fetchPaymentWidgets() {
            try {
                const tossPayments = await loadTossPayments(clientKey);
                const widgets = tossPayments.widgets({ customerKey });
                setWidgets(widgets);
            } catch (error) {
                console.error("Error fetching payment widget:", error);
            }
        }

        fetchPaymentWidgets();
    }, [clientKey, customerKey]);

    // 위젯 렌더링
    useEffect(() => {
        async function renderPaymentWidgets() {
            if (!widgets) return;

            try {
                await widgets.setAmount(amount);
                await Promise.all([
                    widgets.renderPaymentMethods({ selector: "#payment-method", variantKey: "DEFAULT" }),
                    widgets.renderAgreement({ selector: "#agreement", variantKey: "AGREEMENT" }),
                ]);
                setReady(true);
            } catch (error) {
                console.error("Error rendering payment widgets:", error);
            }
        }

        renderPaymentWidgets();
    }, [widgets, amount]);

    // 주문 데이터 저장
    const saveOrderData = async () => {
        try {
            const response = await axios.post("/orders", {
                user_no: currentUser.user_no,
                totalAmount,
                products: selectedProducts,
            });

            const data = response.data;
            console.log(data);


            return data.order_no; // 서버에서 반환된 주문 ID
        } catch (error) {
            console.error("Error saving order data:", error);
        }
    };

    // 결제 요청 처리
    const handlePayment = async () => {
        try {
            // 주문 데이터를 먼저 저장
            const order_no = await saveOrderData();

            // 결제 요청
            await widgets.requestPayment({
                orderId : order_no,
                orderName: `${selectedProducts[0].name} 외 ${selectedProducts.length - 1}개 상품`,
                successUrl: `${window.location.origin}/widget/success`,
                failUrl: `${window.location.origin}/widget/fail`,
                customerEmail: currentUser.email,
                customerName: currentUser.nick_name,
            });
        } catch (error) {
            console.error("Error during payment:", error);
        }
    };

    return (
        <div className="wrapper">
            <div className="box_section">
                <div id="payment-method" />
                <div id="agreement" />
                <button
                    className="button"
                    style={{ marginTop: "30px" }}
                    disabled={!ready}
                    onClick={handlePayment}
                >
                    결제하기
                </button>
            </div>
        </div>
    );
}

function generateRandomString() {
    return window.btoa(Math.random().toString()).slice(0, 20);
}