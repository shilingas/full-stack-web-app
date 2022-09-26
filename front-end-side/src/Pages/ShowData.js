import React, { useState } from "react";
import "../Pages/ShowData.css";
import axios from "axios";
import Navbar from "../../src/Components/Navbar";
const ShowData = () => {
    const [companyName, setCompanyName] = useState('');
    const [productType, setProductType] = useState('');
    const [price, setPrice] = useState('');
    const [info, setInfo] = useState([]);
    const [status, setStatus] = useState(false);
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(price !== '' && productType !== '' && companyName !== '')
            setInfo([...info, { price: price, companyName: companyName, productType: productType }]);
        setCompanyName('');
        setProductType('');
        setPrice('');
       const jsonToSend = JSON.stringify({ "companyName": companyName, "productType": productType, "price": price });
        const res = await axios.post('https://localhost:7174/api/ShowData', { "companyName": companyName, "productType": productType, "price": price } , {
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
                    <label className='form-labels' htmlFor="companyName">Company name: </label>
                    <input onChange={(e) => setCompanyName(e.target.value) } className='form-inputs' type="text" id="companyName" name="companyName" value={companyName}/>
                    <label className='form-labels' htmlFor="productType">Product type: </label>
                    <input onChange={(e) => setProductType(e.target.value)} className='form-inputs' type="text" id="productType" name="productType" value={productType} />
                    <label className='form-labels' htmlFor="companyName">Price: </label>
                    <input onChange={(e) => setPrice(e.target.value)} className='form-inputs' type="text" id="price" name="price" value={price}/>
                    <button>Submit</button>
                    <button onClick={() => show()}>Show all data</button>
                </form>
            </div>
            <div className='data'>
                {
                    status ? (
                    info.map((item) => {
                        const { price, companyName, productType } = item;
                        return (
                            <div className='data-item'>
                                <h1>Company name: {companyName}</h1>
                                <h1>Product type: {productType}</h1>
                                <h1>Price: {price}</h1>
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