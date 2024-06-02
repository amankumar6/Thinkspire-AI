import axios from "axios";

export const handleFreeSubscriptionAPI = async () => {
    const response = await axios.post(
        "http://localhost:5000/api/v1/payment/free-plan",
        {},
        {
            withCredentials: true,
        }
    );
    return response?.data;
};

export const checkoutPaymentAPI = async (payment) => {
    const response = await axios.post(
        "http://localhost:5000/api/v1/payment/checkout",
        {
            amount: Number(payment?.amount),
            subscriptionPlan: payment?.subscriptionPlan,
        },
        {
            withCredentials: true,
        }
    );
    return response?.data;
};

export const verifyPaymentAPI = async (paymentId) => {
    const response = await axios.post(
        `http://localhost:5000/api/v1/payment/verify-payment/${paymentId}`,
        {},
        {
            withCredentials: true,
        }
    );
    return response?.data;
};
