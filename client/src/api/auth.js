import axios from "axios";

// 회원가입
export const register = async (user) => {
    try {
        const response = await axios.post("/auth/register", user);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};