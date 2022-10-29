import React, { useEffect, useState } from "react";
import axios from "axios";
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

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fillOpacity="1" d="M0,224L60,202.7C120,181,240,139,360,106.7C480,75,600,53,720,85.3C840,117,960,203,1080,224C1200,245,1320,203,1380,181.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
            </svg>
        </div>
    );
}

export default ExpensesCard;