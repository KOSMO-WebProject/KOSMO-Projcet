

import { Route, Routes } from 'react-router';
import './App.css';
import HomePage from './components/pages/HomePage';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import PostList from './components/pages/PostList';
import PostDetail from './components/pages/PostDetail';


const App = () => {
  return (
    <>
      <Routes>
          <Route path="/" exact ={true} element={<HomePage />}/>
          <Route path="/register" exact ={true} element={<Register />}/>
          <Route path="/posts" exact ={true} element={<PostList />}/>
          <Route path="/posts/:id" exact ={true} element={<PostDetail />}/>
          {/* <Route path="/notice/list" exact ={true} element={<NoticePage />}/> */}
          {/* <Route path="/login" exact ={true} element={<Login />}/> */}
      </Routes>
    </>
  );
}

export default App;
