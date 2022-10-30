import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Navbar from "../../src/Components/Navbar";
import Modal from "../Components/Modal";
import Icon from "../Components/Icons.js";
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
    const [showCategories, setShowCategories] = useState(false);
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


    const handleSelect = (index, newDate, newSeller, newPurpose, newAmount) => {
        setShowCategories(true);
        setCurrentIndex(index);
        setDate(newDate);
        setSeller(newSeller);
        setPurpose(newPurpose);
        setAmount(newAmount);
    }

    function addClass() {
        var element = document.getElementsByTagName("BODY")[0];
        element.classList.remove("modal-open");
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
            setShowCategories(false);
        }
    }, [selectedCategory]);

    return (
        <div>
            <Navbar />
            <h2 className="title">{categoryType} Expenses</h2>
            <Modal className="categorize" onClose={() => setShowCategories(false)} show={showCategories}>
                {categoryType == "food" ?
                    null
                    : <button style={{ display: "block", marginTop: "10px", width: "100%" }} onClick={() => setSelectedCategory("food")}>Food</button>
                }
                {categoryType == "car" ?
                    null
                    : <button style={{ display: "block", marginTop: "10px", width: "100%" }} onClick={() => setSelectedCategory("car")}>Transportation</button>
                }
                {categoryType == "entertainment" ?
                    null
                    : <button style={{ display: "block", marginTop: "10px", width: "100%" }} onClick={() => setSelectedCategory("entertainment")}>Entertainment</button>
                }
                {categoryType == "house" ?
                    null
                    : <button style={{ display: "block", marginTop: "10px", width: "100%" }} onClick={() => setSelectedCategory("house")}>Housing</button>
                }
                {categoryType == "clothes" ?
                    null
                    : <button style={{ display: "block", marginTop: "10px", width: "100%" }} onClick={() => setSelectedCategory("clothes")}>Clothing</button>
                }
            </Modal>
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
                                                <td className="edit" onClick={addClass(), () => handleSelect(index, date, seller, purpose, amount)}>
                                                    <Icon type="edit-button"></Icon>
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