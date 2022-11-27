import React from "react";
import "../Components/FriendCard.css";
import Icon from "../Components/Icons.js";
const FriendCard = props => {

    return (
        <div className="friend-card">

            <div className="padding">
                <div className="profile-picture">
                    <img src={"/" + props.photo} alt="Regex is not home :(" />
                </div>
                <div className="texts">
                    <p className="title">{props.name }</p>
                </div>
                <div className="buttons">
                    <div className="button">
                        <div className="cursor-field">
                            <a>View</a>
                        </div>
                    </div>
                    <div className="button secondary">
                        <div className="cursor-field">
                            <a>Unfriend</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FriendCard;