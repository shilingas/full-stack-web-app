import React from "react";
import { useState } from "react";
import Icon from "../Components/Icons.js";
import "../Components/Accordion.css";
const Accordion = props => {
    const [isVisible, setIsVisible] = useState(false);

    const OpenAccordionContent = (e) => {
        if (isVisible) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    }

    return (
        <div className={isVisible ? 'accordion opened ' + props.className : 'accordion closed ' + props.className}>
            <div className="title" onClick={OpenAccordionContent}>
                <h3>{props.title}</h3>
                <button className={isVisible? "opened" : "closed"}>
                    <Icon type="expand-arrow"></Icon>
                </button>
            </div>
            <div class="full-content">
                {
                    isVisible ?
                        <div class="content">
                            {props.children}
                        </div>
                        : null
                }
            </div>
        </div>
    );
}

export default Accordion;