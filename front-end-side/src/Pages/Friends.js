import React from "react";
import Navbar from "../../src/Components/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import "../Pages/Friends.css";
import Friend from "../../src/Components/FriendCard";
const Friends = () => {
    return (
        <div>
            <Navbar />
            <div className="container">
                <h2 class="title">Your friends</h2>

                <div id="all-friends">
                    <Friend name="Regex" photo="dog.gif"></Friend>
                </div>
                
            </div>
        </div>
    );
}
export default Friends;