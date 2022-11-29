import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Data, { GlobalDateContext } from "./Pages/Data";
import './index.css';
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import ExpensesPages from "./Pages/ExpensesPages";
import Friends from "./Pages/Friends";
import HomePage from "./Pages/HomePage";
const App = () => {
    const { user } = useAuth0();
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/friends" element={user ? <Friends /> : <HomePage />} />
                <Route path="/data" element={user ? <Data /> : <HomePage />} />
                <Route path="/data/food-expenses" element={user ? <ExpensesPages date={val} categoryType="food" /> :<HomePage />}/>
                <Route path="/data/clothes-expenses" element={user ? <ExpensesPages date={val} categoryType="clothes" /> : <HomePage />} />
                <Route path="/data/transportation-expenses" element={user ? <ExpensesPages date={val} categoryType="car" /> : <HomePage />} />
                <Route path="/data/house-expenses" element={user ? <ExpensesPages date={val} categoryType="house" /> : <HomePage />} />
                <Route path="/data/entertainment-expenses" element={user ? <ExpensesPages date={val} categoryType="entertainment" /> : <HomePage />} />
                <Route path="/data/other-expenses" element={user ? <ExpensesPages date={val} categoryType="other" /> : <HomePage />} />
            </Routes>
        </Router>
        )
}
export default App;