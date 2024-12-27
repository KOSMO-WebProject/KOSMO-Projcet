import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';


//ContextAPI 사용해서 login logout token사용해보기
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const login = async (username, password) => {
        try {
            const response = await axios.post('/auth/login', { username, password }, { withCredentials: true });
            setCurrentUser(response.data);
        } catch (error) {
            console.error('로그인 실패 :', error);
            throw error;
        }
    };


    const logout = async () => {
        try {
            await axios.post('/auth/logout', {}, { withCredentials: true });
            setCurrentUser(null);
        } catch (error) {
            console.error('로그아웃 실패 :', error);
        }
    };

    // 로그인 상태 유지
    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await axios.get('/auth/accesstoken', { withCredentials: true });
                console.log(response);
                setCurrentUser(response.data);
            } catch (error) {
                console.error('Failed to load user:', error);
            }
        };

        loadUser();
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
