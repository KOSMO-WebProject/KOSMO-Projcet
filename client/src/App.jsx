import { Route, Routes } from "react-router";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";
import Register from "./pages/auth/Register";
// import Login from "./pages/auth/Login";
import NoticeList from "./pages/notice/NoticeList";
import NoticeDetail from "./pages/notice/NoticeDetail";
import UserProfile from "./pages/auth/UserProfile";
import NoticeWrite from "./pages/notice/NoticeWrite";
import ShopLandingPage from "./pages/shop/ShopLandingPage";
import LoginPage from "./pages/auth/LoginPage";
import NaverCallback from "./pages/auth/social/NaverCallback";
import KakaoCallback from "./pages/auth/social/KaKaoCallback";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" exact={true} element={<HomePage />} />
        <Route path="/register" exact={true} element={<Register />} />
        <Route path="/profile" exact={true} element={<UserProfile />} />
        <Route path="/clothing" exact ={true} element={<ShopLandingPage />}/>
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
