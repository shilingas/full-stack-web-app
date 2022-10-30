import React from "react";
import "../Components/ExpensesCard.css";
import Icon from "../Components/Icons.js";
const ExpensesCard = props => {

    function checkIfNotNaN(number) {
        if (isNaN(number)) {
            return 0;
        } else {
            return number;
        }
    }

    return (
        <div className={props.categorySum != 0 ? 'card ' + props.name : 'card disabled ' + props.name}>
            <div className="padding">
                <div className="percentage-bar" style={{ background: 'conic-gradient( var(--' + props.name + '-color) 0deg, var(--' + props.name +'-color-shade) ' + checkIfNotNaN(Math.round(props.categorySum / props.expenses * 100 * 100) / 100 * 3.6) + 'deg, var(--main-text-color) ' + checkIfNotNaN(Math.round(props.categorySum / props.expenses * 100 * 100) / 100 * 3.6) + 'deg 360deg)' }}>
                    <div className="inside-box">{checkIfNotNaN(Math.round(props.categorySum / props.expenses * 10 * 100) / 10)}%</div>
                </div>
                <div className="texts">
                    <p className="title"><span class="category-name">{props.name}</span> expenses</p>
                    <p className="amount">{Math.round(props.categorySum * 100) / 100} EUR</p>
                </div>
                <div className="button">
                    <div className="cursor-field">
                        <a href={props.name + '-expenses'}>Details</a>
                    </div>
                </div>
            </div>

            <Icon type="vawe" />
        </div>
    );
}

export default ExpensesCard;