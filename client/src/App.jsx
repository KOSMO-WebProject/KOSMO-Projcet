

import { Route, Routes } from 'react-router';
import './App.css';
import HomePage from './pages/HomePage';

import PostList from './pages/post/PostList';
import PostDetail from './pages/post/PostDetail';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';


const App = () => {
  return (
    <>
      <Routes>
          <Route path="/" exact ={true} element={<HomePage />}/>
          <Route path="/register" exact ={true} element={<Register />}/>
          <Route path="/posts" exact ={true} element={<PostList />}/>
          <Route path="/posts/:id" exact ={true} element={<PostDetail />}/>
          {/* <Route path="/notice/list" exact ={true} element={<NoticePage />}/> */}
          <Route path="/login" exact ={true} element={<Login />}/>
      </Routes>
    </>
  );
}

export default App;
