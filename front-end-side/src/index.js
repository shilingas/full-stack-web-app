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
import ExpensesPages from "./Pages/ExpensesPages";
import reportWebVitals from './reportWebVitals';
import Friends from "./Pages/Friends";
import Data from "./Pages/Data";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/friends" element={<Friends />} />
                <Route path="/data" element={<Data />} />

                <Route path="/food-expenses" element={<ExpensesPages categoryType="food" />} />
                <Route path="/clothes-expenses" element={<ExpensesPages categoryType="clothes" />} />
                <Route path="/transportation-expenses" element={<ExpensesPages categoryType="car"/>} />
                <Route path="/house-expenses" element={<ExpensesPages categoryType="house" />} />
                <Route path="/entertainment-expenses" element={<ExpensesPages categoryType="entertainment" />} />
                <Route path="/other-expenses" element={<ExpensesPages categoryType="other" />} />
            </Routes>
        </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
