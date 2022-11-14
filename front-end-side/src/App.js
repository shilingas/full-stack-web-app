import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './index.css';
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import ExpensesPages from "./Pages/ExpensesPages";
import Friends from "./Pages/Friends";
import Data from "./Pages/Data";
import HomePage from "./Pages/HomePage";
const App = () => {
    const { user } = useAuth0();
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/friends" element={user ? <Friends /> : <HomePage />} />
                <Route path="/data" element={user ? <Data /> : <HomePage/>} />
                <Route path="/food-expenses" element={user ? <ExpensesPages categoryType="food" /> : <HomePage />} />
                <Route path="/clothes-expenses" element={user ? <ExpensesPages categoryType="clothes" /> : <HomePage />} />
                <Route path="/transportation-expenses" element={user ? <ExpensesPages categoryType="car" /> : <HomePage />} />
                <Route path="/house-expenses" element={user ? <ExpensesPages categoryType="house" /> : <HomePage />} />
                <Route path="/entertainment-expenses" element={user ? <ExpensesPages categoryType="entertainment" /> : <HomePage />} />
                <Route path="/other-expenses" element={user ? <ExpensesPages categoryType="other" /> : <HomePage />} />
            </Routes>
        </Router>
        )
}
export default App;