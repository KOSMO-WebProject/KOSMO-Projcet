import axios from "axios";

const API_URL = "http://localhost:5000";

export const login = async (username,password) => {
    const res = await axios.post(
        `${API_URL}/login`,
        {username,password},
        {withCredentials: true} //쿠키 전송 활성화
        )
    return res.data;
}
