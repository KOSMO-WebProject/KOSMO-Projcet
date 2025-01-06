import React from 'react';
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
