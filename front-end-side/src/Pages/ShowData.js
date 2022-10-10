import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../Pages/ShowData.css";
import axios from "axios";
import Navbar from "../../src/Components/Navbar";
const ShowData = () => {
    const navigate = useNavigate();
    const [date, setDate] = useState('');
    const [seller, setSeller] = useState('');
    const [amount, setAmount] = useState('');
    const [info, setInfo] = useState([]);
    const [details, setDetails] = useState('');
    const [status, setStatus] = useState(false);
    const postData = async (e) => {
        e.preventDefault();
        const res = await axios.post('https://localhost:7174/api/ShowData', { "date": date, "seller": seller, "amount": amount, "details": details });
        navigate('/read-from-file-data');
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        await axios.get('https://localhost:7174/api/ShowData').then(resp => {
            setInfo(resp);
            setStatus(true);
        })
    }
    const show = () => {
        setStatus(true);
    }
    return (
        <div>
            <Navbar />
            <div className='form-container'>
                <form className='form' onSubmit={postData}>
                    <label className='form-labels' htmlFor="date">Date: </label>
                    <input onChange={(e) => setDate(e.target.value) } className='form-inputs' type="text" id="date" name="date" value={date}/>
                    <label className='form-labels' htmlFor="seller">Seller: </label>
                    <input onChange={(e) => setSeller(e.target.value)} className='form-inputs' type="text" id="seller" name="seller" value={seller} />
                    <label className='form-labels' htmlFor="price">Amount: </label>
                    <input onChange={(e) => setAmount(e.target.value)} className='form-inputs' type="text" id="price" name="price" value={amount} />
                    <label className='form-labels' htmlFor="details">Details: </label>
                    <input onChange={(e) => setDetails(e.target.value)} className='form-inputs' type="text" id="price" name="price" value={details} />
                    <button>Submit</button>
                    <button onClick={() => show()}>Show all data</button>
                </form>
            </div>
            <div className='data'>
                {
                    status ? (
                    info.data.map((item) => {
                        const { date, seller, category, amount } = item;
                        return (
                            <div className='data-item'>
                                <h1>Date: {date}</h1>
                                <h1>Seller: {seller}</h1>
                                <h1>Amount: {amount}</h1>
                                <h1>Category: {category}</h1>
                             </div>
                            );
                    })) : (
                            null
                          )
                }
            </div>
        </div>
    );
}
export default ShowData;