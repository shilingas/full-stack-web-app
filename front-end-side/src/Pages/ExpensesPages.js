import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../src/Components/Navbar";
const ExpensesPages = ({ categoryType }) => {
    const [info, setInfo] = useState([]);
    const [status, setStatus] = useState(false);
    const [inputData, setInputData] = useState([]);
    const [delayForInput, setDelayForInput] = useState(false);
    useEffect(() => {
        axios.get("https://localhost:7174/api/File").then(resp => {
            setInfo(resp);
            setStatus(true);
            console.log(resp);
        })
    }, []);
    useEffect(() => {
        axios.get('https://localhost:7174/api/ShowData').then(resp => {
            setInputData(resp);
            setDelayForInput(true);
            console.log(resp);
        });
    }, []);

    return (
        <div>
            <Navbar />
            <h2 class="title">{categoryType} Expenses</h2>
            <div class="container">
                <table class="data_table">
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
                                info.data.map((item) => {
                                    const { date, seller, details, amount, category } = item;
                                    if (category == categoryType)
                                        return (
                                            <tr>
                                                <td>{date.slice(0, 10)}</td>
                                                <td>{seller.slice(0, 37)}</td>
                                                <td>{details.slice(0, 37)}</td>
                                                <td>{parseFloat(amount)}</td>
                                            </tr>
                                        );
                                })
                            ) : (
                                null
                            )
                        }
                        {
                            delayForInput ? (
                                inputData.data.map((item) => {
                                    const { date, seller, purpose, amount, category } = item;
                                    if (category == categoryType)
                                        return (

                                            <tr>
                                                <td>{date.slice(0, 10)}</td>
                                                <td>{seller.slice(0, 37)}</td>
                                                <td>{purpose.slice(0, 37)}</td>
                                                <td>{parseFloat(amount)}</td>
                                            </tr>
                                        );
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