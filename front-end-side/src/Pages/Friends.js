import React from "react";
import Navbar from "../../src/Components/Navbar";
import "../Pages/Friends.css";
const Friends = () => {
    return (
        <div>
            <Navbar/>
            <h1>Friends:</h1>
            <h2>Regex</h2>
            <img src="/dog.gif" alt="Regex is not home :("/>
        </div>
    );
}
export default Friends;