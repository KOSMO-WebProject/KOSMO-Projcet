import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router';
import '@fortawesome/fontawesome-free/js/all.js'
import 'react-quill-new/dist/quill.snow.css'; // 스타일시트 경로 확인
import store from './redux/store';
import { Provider } from'react-redux';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <>
   <Provider store={store}> 
   <BrowserRouter>
        <App />
   </BrowserRouter>
   </Provider>
 
   </>
);


