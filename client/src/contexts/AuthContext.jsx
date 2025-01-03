import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';


// 초기 상태
const initialState = {
    currentUser: null, // 초기 상태는 null
    setCurrentUser: () => {}, // 사용자 상태를 설정하는 함수
};

  // AuthContext 생성
export const AuthContext = createContext(initialState);

  // useAuth 훅: context 값을 사용하도록 제공
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

  // AuthProvider: children을 감싸고 context를 제공하는 컴포넌트
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);  // 사용자 상태 관리

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
