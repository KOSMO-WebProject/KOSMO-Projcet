

import { Route, Routes } from 'react-router';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import HomePage from './pages/HomePage';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import NoticeList from './pages/notice/NoticeList';
import NoticeDetail from './pages/notice/NoticeDetail';
import UserProfile from './pages/auth/UserProfile';
import NoticeWrite from './pages/notice/NoticeWrite';



const App = () => {
  return (
    <>
      <Routes>
          <Route path="/" exact ={true} element={<HomePage />}/>
          <Route path="/register" exact ={true} element={<Register />}/>
          <Route path="/profile" exact ={true} element={<UserProfile />}/>

          <Route path="/notice" exact ={true} element={<NoticeList />}/>
          <Route path="/notice/write" exact ={true} element={<NoticeWrite />}/>
          <Route path="/notice/:id" exact ={true} element={<NoticeDetail />}/>
          <Route path="/login" exact ={true} element={<Login />}/>
      </Routes>
    </>
  );
}

export default App;
