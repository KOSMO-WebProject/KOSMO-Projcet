import axios from "axios";



export const login = async (username,password) => {
    const res = await axios.post(
        `/login`,
        {username,password},
        {withCredentials: true} //쿠키 전송 활성화
        )
    return res.data;
}
