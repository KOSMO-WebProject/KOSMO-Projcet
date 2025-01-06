import React from 'react';
<<<<<<< HEAD
import ReactDOM from 'react-dom/client'; // Note: import from 'react-dom/client'
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create root
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
=======
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store'; // store.js 파일의 경로에 맞게 수정
import App from './App'; // App 컴포넌트 경로에 맞게 수정

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
>>>>>>> develop
