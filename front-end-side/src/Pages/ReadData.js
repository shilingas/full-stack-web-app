import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Pages/ReadData.css";
import Navbar from "../../src/Components/Navbar";
const EnterData = () => { 
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

            <div class="container">

                <h2 class="title">Statistics</h2>

                <div id="statistics">
                    <div id="stat-bar">
                        <a class="stat food" href="#" style={{ width: '30%' }}><span class="text">30%</span></a>
                        <a class="stat clothes" href="#" style={{ width: '17%' }}><span class="text">17%</span></a>
                        <a class="stat car" href="#" style={{ width: '18%' }}><span class="text">18%</span></a>
                        <a class="stat house" href="#" style={{ width: '25%' }}><span class="text">25%</span></a>
                        <a class="stat entertaintment" href="#" style={{ width: '9%' }}><span class="text">9%</span></a>
                        <a class="stat other last" href="#" style={{ width: '31%' }}><span class="text">31%</span></a>
                    </div>
                    <ul id="legend">
                        <li class="item">
                            <div class="dot food"></div>
                            <span class="name">Food</span>
                            <span class="percentage">30%</span>
                        </li>

                        <li class="item">
                            <div class="dot clothes"></div>
                            <span class="name">Clothes</span>
                            <span class="percentage">17%</span>
                        </li>

                        <li class="item">
                            <div class="dot car"></div>
                            <span class="name">Car</span>
                            <span class="percentage">18%</span>
                        </li>

                        <li class="item">
                            <div class="dot house"></div>
                            <span class="name">House</span>
                            <span class="percentage">25%</span>
                        </li>

                        <li class="item">
                            <div class="dot entertaintment"></div>
                            <span class="name">Entertaintment</span>
                            <span class="percentage">9%</span>
                        </li>

                        <li class="item">
                            <div class="dot other"></div>
                            <span class="name">Other</span>
                            <span class="percentage">31%</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default EnterData;