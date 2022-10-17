import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../Pages/EnterData.css";
import axios from "axios";
import Navbar from "../Components/Navbar";
const ShowData = () => {
    const navigate = useNavigate();
    const [date, setDate] = useState('');
    const [seller, setSeller] = useState('');
    const [amount, setAmount] = useState('');
    const [purpose, setPurpose] = useState('');
    const postData = async (e) => {
        e.preventDefault();
        const dateRegEx = /^([0-9]{4}-((0[13-9]|1[012])-(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])-31|02-(0[1-9]|1[0-9]|2[0-8]))|([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00)-02-29)$/
        const amountRegEx = /^\d+\.?\d{0,2}$/
        const isNotEmptyRegEx = /([^\s])/

        if ((!dateRegEx.test(date) && isNotEmptyRegEx.test(date)) || (!amountRegEx.test(amount) && isNotEmptyRegEx.test(amount)) || !isNotEmptyRegEx.test(purpose) || !isNotEmptyRegEx.test(seller) || !isNotEmptyRegEx.test(date) || !isNotEmptyRegEx.test(amount)) {
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
            }
        }
        else {
            const res = await axios.post('https://localhost:7174/api/ShowData', { "date": date, "seller": seller, "amount": amount, "purpose": purpose });
            navigate('/data');
        }

        function addErrorBorder(string) {
            document.getElementById(string).style.border = "1px solid #c0392b";
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
    return (
        <div>
            <Navbar />
            <div className='container'>
                <form id='form' onSubmit={postData}>
                    <input onChange={(e) => setDate(e.target.value)} className='form-inputs' type="text" id="date" name="date" value={date} placeholder="Date" />
                    <input onChange={(e) => setSeller(e.target.value)} className='form-inputs' type="text" id="seller" name="seller" value={seller} placeholder="Seller" />
                    <input onChange={(e) => setPurpose(e.target.value)} className='form-inputs' type="text" id="details" name="details" value={purpose} placeholder="Details" />
                    <input onChange={(e) => setAmount(e.target.value)} className='form-inputs' type="text" id="price" name="price" value={amount} placeholder="Amount" />
                    <p id="error-msg"></p>
                    <button>Submit</button>
                </form>
            </div>

        </div>
    );
}
export default ShowData;