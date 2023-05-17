import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import App from "./app/App";

import './styles/index.css';

const root = document.getElementById('root');
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
           <App />
        </BrowserRouter>
    </React.StrictMode>,
    root
);