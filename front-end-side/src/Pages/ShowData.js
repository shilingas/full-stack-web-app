import React, { useState } from "react";
import "../Pages/ShowData.css";
import axios from "axios";
import Navbar from "../../src/Components/Navbar";
const ShowData = () => {
    const [date, setDate] = useState('');
    const [seller, setSeller] = useState('');
    const [purpose, setPurpose] = useState('');
    const [amount, setAmount] = useState('');
    const [info, setInfo] = useState([]);
    const [status, setStatus] = useState(false);
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(amount !== '' && seller !== '' && purpose !== '' && date !== '')
            setInfo([...info, { date: date, seller: seller, purpose: purpose, amount: amount }]);
        setDate('');
        setSeller('');
        setPurpose('');
        setAmount('');
        const res = await axios.post('https://localhost:7174/api/ShowData', { "date": date, "seller": seller, "purpose": purpose, "amount": amount } , {
           headers: {
       
            },
       });
    }
    const show = () => {
        setStatus(true);
    }
    return (
        <div>
            <Navbar />
            <div className='form-container'>
                <form className='form' onSubmit={handleSubmit}>
                    <label className='form-labels' htmlFor="date">Date: </label>
                    <input onChange={(e) => setDate(e.target.value) } className='form-inputs' type="text" id="date" name="date" value={date}/>
                    <label className='form-labels' htmlFor="seller">Seller: </label>
                    <input onChange={(e) => setSeller(e.target.value)} className='form-inputs' type="text" id="seller" name="seller" value={seller} />
                    <label className='form-labels' htmlFor="details">Purpose: </label>
                    <input onChange={(e) => setPurpose(e.target.value)} className='form-inputs' type="text" id="details" name="details" value={purpose} />
                    <label className='form-labels' htmlFor="price">Amount: </label>
                    <input onChange={(e) => setAmount(e.target.value)} className='form-inputs' type="text" id="price" name="price" value={amount} />
                    <button>Submit</button>
                    <button onClick={() => show()}>Show all data</button>
                </form>
            </div>
            <div className='data'>
                {
                    status ? (
                    info.map((item) => {
                        const { date, seller, purpose, amount } = item;
                        return (
                            <div className='data-item'>
                                <h1>Date: {date}</h1>
                                <h1>Seller: {seller}</h1>
                                <h1>Amount: {amount}</h1>
                                <h1>Purpose: {purpose}</h1>
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