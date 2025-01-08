import axios from "axios";

export const register = async (user) => {
    try {
        const response = await axios.post("/auth/register", user);
        return response;
    } catch (error) {
        console.error("Register Error:", error.response?.data || error.message);
        return error.response?.data || "요청 실패";
    }
};

