import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Navbar from "../../src/Components/Navbar";
const ExpensesPages = ({ categoryType }) => {
    const [info, setInfo] = useState([]);
    const [status, setStatus] = useState(false);
    const [inputData, setInputData] = useState([]);
    const [delayForInput, setDelayForInput] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [date, setDate] = useState('');
    const [seller, setSeller] = useState('');
    const [amount, setAmount] = useState('');
    const [purpose, setPurpose] = useState('');
    const initialRender = useRef(true);
    useEffect(() => {
        axios.get("https://localhost:7174/api/File").then(resp => {
            setInfo(resp);
            setStatus(true);
        })
    }, []);
    useEffect(() => {
        axios.get('https://localhost:7174/api/ShowData').then(resp => {
            setInputData(resp);
            setDelayForInput(true);
        });
    }, []);


    const handleSelect = (category, index, newDate, newSeller, newPurpose, newAmount) => {
        setSelectedCategory(category);
        setCurrentIndex(index);
        setDate(newDate);
        setSeller(newSeller);
        setPurpose(newPurpose);
        setAmount(newAmount);
    }

    useEffect(() => {

        if (initialRender.current) {
            initialRender.current = false;
        }
        else {
            axios.put("https://localhost:7174/api/Sorting/" + currentIndex, { "date": date, "seller": seller, "amount": amount, "purpose": purpose, "category": selectedCategory, "isCategorized": true, "index": currentIndex }).then(() => {
                axios.get('https://localhost:7174/api/ShowData').then(resp => {
                    setInputData(resp);
                    setDelayForInput(true);
                });
                axios.get("https://localhost:7174/api/File").then(resp => {
                    setInfo(resp);
                    setStatus(true);
                });
            });
        }
    }, [selectedCategory, currentIndex, date, seller, purpose, amount]);

    return (
        <div>
            <Navbar />
            <h2 className="title">{categoryType} Expenses</h2>
            <div className="container">
                <table className="data_table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Seller</th>
                            <th>Details</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            status ? (
                                info.data.map((item, index) => {
                                    const { date, seller, purpose, amount, category } = item;
                                    if (category == categoryType) {
                                        return (
                                            <tr>
                                                <td>{date.slice(0, 10)}</td>
                                                <td>{seller}</td>
                                                <td>{purpose}</td>
                                                <td>{parseFloat(amount).toFixed(2)}</td>
                                                <td>
                                                    {categoryType == "food" ?
                                                        null 
                                                        : <a style={{ display: "block" }} onClick={() => handleSelect("food", index, date, seller, purpose, amount)}>Food</a>
                                                    }
                                                    {categoryType == "car" ?
                                                        null
                                                        : <a style={{ display: "block" }} onClick={() => handleSelect("car", index, date, seller, purpose, amount)}>Transportation</a>
                                                    }
                                                    {categoryType == "entertainment" ?
                                                        null
                                                        : <a style={{ display: "block" }} onClick={() => handleSelect("entertainment", index, date, seller, purpose, amount)}>Entertainment</a>
                                                    }
                                                    {categoryType == "house" ?
                                                        null
                                                        : <a style={{ display: "block" }} onClick={() => handleSelect("house", index, date, seller, purpose, amount)}>Housing</a>
                                                    }
                                                    {categoryType == "clothes" ?
                                                        null
                                                        : <a style={{ display: "block" }} onClick={() => handleSelect("clothes", index, date, seller, purpose, amount)}>Clothing</a>
                                                    }
                                                </td>
                                            </tr>
                                        );
                                    }
                                })
                            ) : (
                                null
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default ExpensesPages;