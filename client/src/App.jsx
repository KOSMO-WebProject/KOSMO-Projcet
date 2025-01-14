import { Route, Routes } from "react-router";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";
import NoticeList from "./pages/notice/NoticeList";
import NoticeDetail from "./pages/notice/NoticeDetail";
import UserProfile from "./pages/auth/UserProfile";
import NoticeWrite from "./pages/notice/NoticeWrite";
import ShopLandingPage from "./pages/shop/ShopLandingPage";
import LoginPage from "./pages/auth/LoginPage";
import NaverCallback from "./pages/auth/social/NaverCallback";
import KakaoCallback from "./pages/auth/social/KaKaoCallback";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./redux/slice/authSlice";
import SignupPage from "./pages/auth/SignupPage";
import NoticeCenter from "./pages/notice/NoticeCenter";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // 애플리케이션 초기화 시 사용자 정보를 불러옴
    dispatch(loadUser());
    console.log("API URL:", process.env.REACT_APP_API_URL); // 환경 변수 사용 예시
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/notice/center" exact={true} element={<NoticeCenter />} />
        <Route path="/" exact={true} element={<HomePage />} />
        <Route path="/profile" exact={true} element={<UserProfile />} />
        <Route path="/signup" exact={true} element={<SignupPage />} />
        <Route path="/clothing" exact={true} element={<ShopLandingPage />} />
        <Route path="/notice" exact={true} element={<NoticeList />} />
        <Route path="/notice/write" exact={true} element={<NoticeWrite />} />
        <Route path="/notice/:id" exact={true} element={<NoticeDetail />} />
        <Route path="/login" exact={true} element={<LoginPage />} />
        <Route path="/auth/kakao/callback" element={<KakaoCallback />} />
        <Route path="/auth/naver/callback" element={<NaverCallback />} />
      </Routes>
    </>
  );
};

export default App;
