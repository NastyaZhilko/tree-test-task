import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const TOAST_CONTAINER_ID = 'TOAST_CONTAINER_ID';
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <App/>
        <ToastContainer
            style={{width: '640px', maxWidth: '90%'}}
            newestOnTop
            containerId={TOAST_CONTAINER_ID}
        />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
