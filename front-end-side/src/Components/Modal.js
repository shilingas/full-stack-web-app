import React from "react";
import { useEffect } from "react";
import Icon from "../Components/Icons.js";
import "../Pages/FileUpload.css";
const Modal = props => {

    const closeWithESC = (e) => {
        if ((e.char || e.keyCode) === 27) {
            props.onClose();
        }
    }

    useEffect(() => {
        document.body.addEventListener('keydown', closeWithESC)
        return function cleanUp() {
            document.body.removeEventListener('keydown', closeWithESC)
        }
    }, [])

    function removeClass() {
        document.getElementsByTagName("BODY")[0].setAttribute("class", "modal-open"); //FIX ME
    }

    if (!props.show) {
        return null;
    }

    return (
        <div className={'modal ' + props.className} onClick={removeClass(), props.onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div id="modal-decoration"></div>

                <div className="close">
                    <div className="clickable-place" onClick={removeClass(), props.onClose}>
                        <Icon type="close-button"></Icon>
                    </div>
                </div>
                <div className="modal-padding">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Modal;