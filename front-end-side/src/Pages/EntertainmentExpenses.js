import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../src/Components/Navbar";
const FoodExpenses = () => {
    const [info, setInfo] = useState([]);
    const [status, setStatus] = useState(false);
    useEffect(() => {
        axios.get("https://localhost:7174/api/File").then(resp => {
            setInfo(resp);
            setStatus(true);
            console.log(resp);
        })
    }, []);

    return (
        <div>
            <Navbar />
            <h2 class="title">Entertainment Expenses</h2>
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
                                    const { date, seller, purpose, amount, category } = item;
                                    //item.filter(item => item.category == "food")
                                    if (category == "entertainment")
                                        return (

                                            <tr>
                                                <td>{date}</td>
                                                <td>{seller}</td>
                                                <td>{purpose}</td>
                                                <td>{amount}</td>
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
export default FoodExpenses;