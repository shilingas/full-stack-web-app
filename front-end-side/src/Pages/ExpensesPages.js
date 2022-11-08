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
    const [id, setId] = useState("");
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


    const handleSelect = (index, newDate, newSeller, newPurpose, newAmount, newId) => {
        setShowCategories(true);
        setCurrentIndex(index);
        setDate(newDate);
        setSeller(newSeller);
        setPurpose(newPurpose);
        setAmount(newAmount);
        setId(newId);
    }

    function addClass() {
        var element = document.getElementsByTagName("BODY")[0];
        element.classList.remove("modal-open");
    }

    function CustomAlert(type, msg, duration) {
        var element = document.createElement("div");
        element.setAttribute("id", "custom-alert");
        var decoration = '<div id="alignment"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve"><g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"><path d="M 89.357 7.284 c -1.02 -1.297 -2.9 -1.552 -4.216 -0.557 C 73.3 15.685 62.228 25.68 52.018 36.561 c -5.44 5.811 -10.63 11.885 -15.478 18.289 c -2.576 3.427 -5.054 6.948 -7.396 10.6 h -0.148 L 15.315 38.08 c -0.132 -0.262 -0.282 -0.527 -0.445 -0.779 c -2.522 -3.903 -7.817 -4.933 -11.632 -2.175 c -3.577 2.586 -4.206 7.702 -1.811 11.41 l 22.147 34.278 l 0.271 0.421 c 0.783 1.216 2.034 2.156 3.635 2.516 c 2.745 0.617 5.472 -1.02 6.608 -3.595 c 2.922 -6.621 6.702 -13.106 10.829 -19.367 c 4.206 -6.345 8.816 -12.484 13.706 -18.41 c 9.183 -11.104 19.331 -21.496 30.315 -30.939 C 90.168 10.382 90.358 8.558 89.357 7.284 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(114,181,55); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" /></g ></svg ><div class="text"><p class="title">' + type + '</p><p class="message">' + msg + '</p></div><div id="decoration"></div></div>';

        element.innerHTML = decoration;
        setTimeout(function () {
            element.parentNode.removeChild(element);
        }, duration);
        document.body.appendChild(element);
    }

    useEffect(() => {

        if (initialRender.current) {
            initialRender.current = false;
        }
        else {
            if (selectedCategory != "") {
                axios.put("https://localhost:7174/api/Sorting/" + id, { "date": date, "seller": seller, "amount": amount, "purpose": purpose, "category": selectedCategory, "isCategorized": true, "id": id }).then(() => {
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
                setSelectedCategory("");
                CustomAlert("Success!", "Category of the record has been changed successfully!", 3000);
            }
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

                <table className="data_table" style={{ marginBottom: "30px" }}>
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
                                info.data.sort((a, b) => a.date > b.date ? 1 : -1).map((item, index) => {
                                    const { date, seller, purpose, amount, category, id } = item;
                                    if (category == categoryType) {
                                        return (
                                            <tr>
                                                <td>{date.slice(0, 10)}</td>
                                                <td>{seller}</td>
                                                <td>{purpose}</td>
                                                <td>{parseFloat(amount).toFixed(2)}</td>
                                                <td className="move" onClick={addClass(), () => handleSelect(index, date, seller, purpose, amount, id)}>
                                                    <Icon type="change-category"></Icon>
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