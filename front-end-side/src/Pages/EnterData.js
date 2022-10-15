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
    const [details, setDetails] = useState('');
    const postData = async (e) => {
        e.preventDefault();
        const res = await axios.post('https://localhost:7174/api/ShowData', { "date": date, "seller": seller, "amount": amount, "details": details });
        navigate('/data');
    }
    return (
        <div>
            <Navbar />
            <div className='container'>
                <form id='form' onSubmit={postData}>
                    <input onChange={(e) => setDate(e.target.value)} className='form-inputs' type="text" id="date" name="date" value={date} placeholder="Date" />
                    <input onChange={(e) => setSeller(e.target.value)} className='form-inputs' type="text" id="seller" name="seller" value={seller} placeholder="Seller" />
                    <input onChange={(e) => setAmount(e.target.value)} className='form-inputs' type="text" id="price" name="price" value={amount} placeholder="Amount" />
                    <input onChange={(e) => setDetails(e.target.value)} className='form-inputs' type="text" id="details" name="details" value={details} placeholder="Details" />
                    <button>Submit</button>
                </form>
            </div>
            
        </div>
    );
}
export default ShowData;