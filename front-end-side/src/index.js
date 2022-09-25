import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Routes,
    Link
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Friends from "./Pages/Friends";
import ShowData from "./Pages/ShowData";
import EnterData from "./Pages/EnterData";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/friends" element={<Friends />} />
                <Route path="/show-data" element={<ShowData />} />
                <Route path="/enter-data" element={<EnterData />} />
            </Routes>
        </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
