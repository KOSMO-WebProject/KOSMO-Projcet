

import { Route, Routes } from 'react-router';
import './App.css';
import HomePage from './pages/HomePage';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import NoticeList from './pages/notice/NoticeList';
import NoticeDetail from './pages/notice/NoticeDetail';



const App = () => {
  return (
    <>
      <Routes>
          <Route path="/" exact ={true} element={<HomePage />}/>
          <Route path="/register" exact ={true} element={<Register />}/>
      
          <Route path="/notice" exact ={true} element={<NoticeList />}/>
          <Route path="/notice/:id" exact ={true} element={<NoticeDetail />}/>
          <Route path="/login" exact ={true} element={<Login />}/>
      </Routes>
    </>
  );
}

export default App;
