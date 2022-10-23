import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../Pages/EnterData.css";
import axios from "axios";
import ModalUpdateData from "../Pages/EnterData";
const ShowData = props => {
    const [date, setDate] = useState('');
    const [seller, setSeller] = useState('');
    const [amount, setAmount] = useState('');
    const [purpose, setPurpose] = useState('');
    const postData = async (e) => {
        e.preventDefault();
        const dateRegEx = /^([0-9]{4}-((0[13-9]|1[012])-(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])-31|02-(0[1-9]|1[0-9]|2[0-8]))|([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00)-02-29)$/
        const amountRegEx = /^\d+\.?\d{0,2}$/
        const isNotEmptyRegEx = /([^\s])/

        var inputDate = new Date(date);
        var currentDate = new Date();

        if ((!dateRegEx.test(date) && isNotEmptyRegEx.test(date)) || (!amountRegEx.test(amount) && isNotEmptyRegEx.test(amount)) || !isNotEmptyRegEx.test(purpose) || !isNotEmptyRegEx.test(seller) || !isNotEmptyRegEx.test(date) || !isNotEmptyRegEx.test(amount) || inputDate > currentDate) {
            removeErrors();

            if (!isNotEmptyRegEx.test(purpose) || !isNotEmptyRegEx.test(seller) || !isNotEmptyRegEx.test(date) || !isNotEmptyRegEx.test(amount)) {
                if (!isNotEmptyRegEx.test(date)) {
                    addErrorBorder("date");
                }
                if (!isNotEmptyRegEx.test(amount)) {
                    addErrorBorder("price");
                }
                if (!isNotEmptyRegEx.test(purpose)) {
                    addErrorBorder("details");
                }
                if (!isNotEmptyRegEx.test(seller)) {
                    addErrorBorder("seller");
                }
                printErrorMsg("There are empty fields");
            }

            if (!amountRegEx.test(amount) && isNotEmptyRegEx.test(amount)) {
                addErrorBorder("price");
                printErrorMsg("Amount is invalid or field is empty. Amount format should be seperated by <b>dot (.)</b>");
            }

            if (!dateRegEx.test(date) && isNotEmptyRegEx.test(date)) {
                addErrorBorder("date");
                printErrorMsg("Date is invalid or field is empty. Date format should be <b>xxxx-xx-xx</b>");
            } else if (inputDate > currentDate && isNotEmptyRegEx.test(date)) {
                addErrorBorder("date");
                printErrorMsg("Date is later than current date");
            }

        }
        else {
            printErrorMsg("Well Done! Your record will appear on the page in a moment!")
            const res = await axios.post('https://localhost:7174/api/ShowData', { "date": date, "seller": seller, "amount": amount, "purpose": purpose });
            window.location.reload(true);
        }

        function addErrorBorder(string) {
            document.getElementById(string).style.border = "1px solid var(--error-color)";
        }

        function printErrorMsg(string) {
            document.getElementById("error-msg").style.display = "block";
            document.getElementById("error-msg").innerHTML = string;
        }

        function removeErrors() {
            document.getElementById("date").style.border = "1px solid var(--input-bg)";
            document.getElementById("price").style.border = "1px solid var(--input-bg)";
            document.getElementById("details").style.border = "1px solid var(--input-bg)";
            document.getElementById("seller").style.border = "1px solid var(--input-bg)";
            document.getElementById("error-msg").style.display = "none";
        }
    }

    function removeClass() {
        document.getElementsByTagName("BODY")[0].setAttribute("class", "modal-open");
    }

    if (!props.show) {
        return null;
    }
    const updateData = (e) => {

        // props.index - id, kuri keisti
        // purpose, amount, seller, date - jau update inpute ivesti duomenys
        axios.put("https://localhost:7174/api/ShowData/" + props.index, { "date": date, "seller": seller, "amount": amount, "purpose": purpose, "id": props.index });
    }
    return (
        <div className="modal enter-data" onClick={removeClass(), props.onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div id="modal-decoration"></div>

                <div class="close">
                    <svg viewBox="0 0 30 30" onClick={removeClass(), props.onClose}>
                        <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z" />
                    </svg>
                </div>
                <div class="modal-padding">
                    <form id='form' onSubmit={props.buttonType == "post" ? postData : updateData}>
                        <input onChange={(e) => setDate(e.target.value)} className='form-inputs' type="text" id="date" name="date" value={date} placeholder="Date" />
                        <input onChange={(e) => setSeller(e.target.value)} className='form-inputs' type="text" id="seller" name="seller" value={seller} placeholder="Seller" />
                        <input onChange={(e) => setPurpose(e.target.value)} className='form-inputs' type="text" id="details" name="details" value={purpose} placeholder="Details" />
                        <input onChange={(e) => setAmount(e.target.value)} className='form-inputs' type="text" id="price" name="price" value={amount} placeholder="Amount" />
                        <button>Submit</button>
                        <p id="error-msg"></p>
                    </form>
                </div>
            </div>

        </div>
    );
}
export default ShowData;