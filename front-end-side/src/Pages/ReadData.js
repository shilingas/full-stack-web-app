import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Pages/ReadData.css";
import Navbar from "../../src/Components/Navbar";
const EnterData = () => {
    const [data, setData] = useState({});
    const [info, setInfo] = useState([]);
    const [status, setStatus] = useState(false);
    const [delay, setDelay] = useState(false);
    const [inputData, setInputData] = useState(false);
    const [delayForInput, setDelayForInput] = useState(false);
    const [expenses, setExpenses] = useState(0);
    useEffect(() => {
        axios.get("https://localhost:7174/api/Sorting").then(item => {
            setData(item);
            setDelay(true);
        })
    }, []);
    useEffect(() => {
        axios.get("https://localhost:7174/api/Sorting").then(item => {
            setExpenses(item.data.carSum + item.data.clothesSum + item.data.entertaintmentSum + item.data.foodSum + item.data.otherSum + item.data.houseSum);
    })
    }, []);
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
        })
    }, []);
    return (
        <div>
            <Navbar />
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
                                    const { date, seller, purpose, amount } = item;
                                    return (
                                        <tr>
                                            <td>{date}</td>
                                            <td>{seller.slice(0, 37)}</td>
                                            <td>{purpose.slice(0, 37)}</td>
                                            <td>{amount.toFixed(2)}</td>
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
                                    const { date, seller, purpose, amount } = item;
                                    return (
                                        <tr>
                                            <td>{date}</td>
                                            <td>{seller.slice(0, 40)}</td>
                                            <td>{purpose.slice(0, 40)}</td>
                                            <td>{amount.toFixed(2)}</td>
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

            <div class="container">

                <h2 class="title">Statistics</h2>

                {  
                    delay ? (
                        <div id="statistics">
                            <div id="stat-bar">
                                <a class="stat food" href="/food-expenses" style={{ width: (Math.round(data.data.foodSum / (expenses) * 100 * 100) / 100)+'%' }}><span class="text">{Math.round(data.data.foodSum / (expenses) * 100 * 100) / 100}%</span></a>
                                <a class="stat clothes" href="/clothes-expenses" style={{ width: (Math.round(data.data.clothesSum / (expenses) * 100 * 100) / 100) + '%' }}><span class="text">{Math.round(data.data.clothesSum / (expenses) * 100 * 100) / 100}%</span></a>
                                <a class="stat car" href="/car-expenses" style={{ width: Math.round(data.data.carSum / (expenses) * 100 * 100) / 100 +'%' }}><span class="text">{Math.round(data.data.carSum / (expenses) * 100 * 100) / 100}%</span></a>
                                <a class="stat house" href="/house-expenses" style={{ width: (Math.round(data.data.houseSum / (expenses) * 100 * 100) / 100)+'%' }}><span class="text">{Math.round(data.data.houseSum / (expenses) * 100 * 100) / 100}%</span></a>
                                <a class="stat entertaintment" href="/entertainment-expenses" style={{ width: (Math.round(data.data.entertaintmentSum / (expenses) * 100 * 100) / 100)+'%' }}><span class="text">{Math.round(data.data.entertaintmentSum / (expenses) * 100 * 100) / 100}%</span></a>
                                <a class="stat other last" href="/other-expenses" style={{ width: (Math.round(data.data.otherSum / (expenses) * 100 * 100) / 100)+'%' }}><span class="text">{Math.round(data.data.otherSum / (expenses) * 100 * 100) / 100}%</span></a>
                            </div>

                            <ul id="legend">
                                <a href="/food-expenses">
                                    <li class="item">
                                        <div class="dot food"></div>
                                        <span class="name">Food</span>
                                        <span class="percentage">{Math.round(data.data.foodSum / (expenses) * 100 * 100) / 100}%</span>
                                    </li>
                                </a>

                                <a href="/clothes-expenses">
                                    <li class="item">
                                        <div class="dot clothes"></div>
                                        <span class="name">Clothes</span>
                                        <span class="percentage">{Math.round(data.data.clothesSum / (expenses) * 100 * 100) / 100}%</span>
                                    </li>
                                </a>

                                <a href="/car-expenses">
                                    <li class="item">
                                        <div class="dot car"></div>
                                        <span class="name">Car</span>
                                        <span class="percentage">{Math.round(data.data.carSum / (expenses) * 100 * 100) / 100}%</span>
                                    </li>
                                </a>

                                <a href="/house-expenses">
                                    <li class="item">
                                        <div class="dot house"></div>
                                        <span class="name">House</span>
                                        <span class="percentage">{Math.round(data.data.houseSum / (expenses) * 100 * 100) / 100}%</span>
                                    </li>
                                </a>

                                <a href="/entertainment-expenses">
                                    <li class="item">
                                        <div class="dot entertaintment"></div>
                                        <span class="name">Entertainment</span>
                                        <span class="percentage">{Math.round(data.data.entertaintmentSum / (expenses) * 100 * 100) / 100}%</span>
                                    </li>
                                </a>

                                <a href="/other-expenses">
                                    <li class="item">
                                        <div class="dot other"></div>
                                        <span class="name">Other</span>
                                        <span class="percentage">{Math.round(data.data.otherSum / (expenses) * 100 * 100) / 100}%</span>
                                    </li>
                                </a>

                            </ul>
                            <div class="expenses">
                                <p>
                                    <span class="p_title">Total: </span>
                                    {Math.round(expenses * 100)/100} EUR
                                </p>
                                <p>
                                    <span class="p_title">Spent on food: </span>
                                    {Math.round(data.data.foodSum * 100) / 100} EUR
                                </p>
                                <p>
                                    <span class="p_title">Spent on clothing: </span>
                                    {Math.round(data.data.clothesSum * 100) / 100} EUR
                                </p>
                                <p>
                                    <span class="p_title">Spent on transportation: </span>
                                    {Math.round(data.data.carSum * 100) / 100} EUR
                                </p>
                                <p>
                                    <span class="p_title">Spent on housing: </span>
                                    {Math.round(data.data.houseSum * 100) / 100} EUR
                                </p>
                                <p>
                                    <span class="p_title">Spent on entertainment: </span>
                                    {Math.round(data.data.entertaintmentSum * 100) / 100} EUR
                                </p>
                                <p>
                                    <span class="p_title">Other expenses: </span>
                                    {Math.round(data.data.otherSum * 100) / 100} EUR
                                </p>
                            </div>
                        </div>
                    ) : (
                        null
                    )
                }
            </div>
        </div>
    );
}
export default EnterData;