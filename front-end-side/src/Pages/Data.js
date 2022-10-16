import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Pages/Data.css";
import Navbar from "../Components/Navbar";
const EnterData = () => {
    const [data, setData] = useState({});
    const [info, setInfo] = useState([]);
    const [status, setStatus] = useState(false);
    const [delay, setDelay] = useState(false);
    const [inputData, setInputData] = useState(false);
    const [delayForInput, setDelayForInput] = useState(false);
    const [expenses, setExpenses] = useState(0);
    const [inputValues, setInputValues] = useState([]);
    const [foodSum, setFoodSum] = useState(0);
    const [clothesSum, setClothesSum] = useState(0);
    const [carSum, setCarSum] = useState(0);
    const [houseSum, setHouseSum] = useState(0);
    const [entertainmentSum, setEntertainmentSum] = useState(0);
    const [otherSum, setOtherSum] = useState(0);
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
        fetch('https://localhost:7174/api/ShowData')
            .then((response) => response.json())
            .then((data) => {
                setInputValues(data);
            });
    }, []);
    useEffect(() => {
        let totalFood = 0;
        let totalClothes = 0;
        let totalHouse = 0;
        let totalCar = 0;
        let totalEnt = 0;
        let totalOther = 0;
        inputValues.map((item) => {
            switch (item.category) {
                case "food":
                    totalFood += parseFloat(item.amount);
                    setFoodSum(totalFood);
                    break;
                case "clothes":
                    totalClothes += parseFloat(item.amount);
                    setClothesSum(totalClothes);
                    break;
                case "car":
                    totalCar += parseFloat(item.amount);
                    setCarSum(totalCar);
                    break;
                case "house":
                    totalHouse += parseFloat(item.amount);
                    setHouseSum(totalHouse);
                    break;
                case "entertainment":
                    totalEnt += parseFloat(item.amount);
                    setEntertainmentSum(totalEnt);
                    break;
                case "other":
                    totalOther += parseFloat(item.amount);
                    setOtherSum(totalOther);
                    break;
                default:
                    break;
            }
        });
    }, [inputValues]);
    return (
        <div>
            <Navbar />
            <div class="container">

                <h2 class="title">Your expenses</h2>

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
                                            <td>{date.slice(0, 10)}</td>
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
                                    const { date, seller, amount, details } = item;
                                    return (
                                        <tr>
                                            <td>{date.slice(0, 10)}</td>
                                            <td>{seller.slice(0, 37)}</td>
                                            <td>{details.slice(0, 37)}</td>
                                            <td>{parseFloat(amount).toFixed(2)}</td>
                                        </tr>
                                    );
                                })
                            ) : (
                                null
                            )
                        }
                    </tbody>

                    <tfoot>
                        <tr>
                            <td colspan="3">Spent in total</td>
                            <td>{parseFloat(expenses + foodSum + clothesSum + carSum + houseSum + entertainmentSum + otherSum).toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div class="container">

                <h2 class="title">Statistics</h2>

                {  
                    (delay && delayForInput) ? (
                        <div id="statistics">
                            <div id="cards">
                                <div class="card food">
                                    <div class="padding">
                                        <div class="percentage-bar" style={{ background: 'conic-gradient( var(--food-color) 0deg, var(--food-color-shade) ' + (Math.round((data.data.foodSum + foodSum) / (expenses + foodSum + clothesSum + carSum + houseSum + entertainmentSum + otherSum) * 100 * 100) / 100 * 3.6) + 'deg, var(--main-text-color) ' + (Math.round( (data.data.foodSum + foodSum) / (expenses + foodSum + clothesSum + carSum + houseSum + entertainmentSum + otherSum) * 100 * 100) / 100 * 3.6) + 'deg 360deg)'}}>
                                            <div class="inside-box">{Math.round( (data.data.foodSum + foodSum) / (expenses + foodSum + clothesSum + carSum + houseSum + entertainmentSum + otherSum) * 10 * 100) / 10}%</div>
                                        </div>
                                        <div class="texts">
                                            <p class="title">Food expenses</p>
                                            <p class="amount">{ Math.round((data.data.foodSum + foodSum) * 100) / 100 } EUR</p>
                                        </div>
                                        <div class="button">
                                            <a href="/food-expenses">Details</a>
                                        </div>
                                    </div>

                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                        <path fill-opacity="1" d="M0,224L60,202.7C120,181,240,139,360,106.7C480,75,600,53,720,85.3C840,117,960,203,1080,224C1200,245,1320,203,1380,181.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                                    </svg>
                                </div>
                                <div class="card car">
                                    <div class="padding">
                                        <div class="percentage-bar" style={{ background: 'conic-gradient( var(--transportation-color) 0deg, var(--transportation-color-shade) ' + (Math.round((data.data.carSum + carSum) / (expenses + foodSum + clothesSum + carSum + houseSum + entertainmentSum + otherSum) * 100 * 100) / 100 * 3.6) + 'deg, var(--main-text-color) ' + (Math.round((data.data.carSum  + carSum) / (expenses + foodSum + clothesSum + carSum + houseSum + entertainmentSum + otherSum) * 100 * 100) / 100 * 3.6) + 'deg 360deg)' }}>
                                            <div class="inside-box">{Math.round((data.data.carSum + carSum) / (expenses + foodSum + clothesSum + carSum + houseSum + entertainmentSum + otherSum) * 10 * 100) / 10}%</div>
                                        </div>
                                        <div class="texts">
                                            <p class="title">Transportation expenses</p>
                                            <p class="amount">{Math.round((data.data.carSum + carSum) * 100) / 100} EUR</p>
                                        </div>
                                        <div class="button">
                                            <a href="/car-expenses">Details</a>
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                        <path fill-opacity="1" d="M0,224L60,202.7C120,181,240,139,360,106.7C480,75,600,53,720,85.3C840,117,960,203,1080,224C1200,245,1320,203,1380,181.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                                    </svg>
                                </div>
                                <div class="card entertainment">
                                    <div class="padding">
                                        <div class="percentage-bar" style={{ background: 'conic-gradient( var(--entertainment-color) 0deg, var(--entertainment-color-shade) ' + (Math.round((data.data.entertaintmentSum + entertainmentSum) / (expenses + foodSum + clothesSum + carSum + houseSum + entertainmentSum + otherSum) * 100 * 100) / 100 * 3.6) + 'deg, var(--main-text-color) ' + (Math.round((data.data.entertaintmentSum + entertainmentSum) / (expenses + foodSum + clothesSum + carSum + houseSum + entertainmentSum + otherSum) * 100 * 100) / 100 * 3.6) + 'deg 360deg)' }}>
                                            <div class="inside-box">{Math.round((data.data.entertaintmentSum + entertainmentSum) / (expenses + foodSum + clothesSum + carSum + houseSum + entertainmentSum + otherSum) * 10 * 100) / 10}%</div>
                                        </div>
                                        <div class="texts">
                                            <p class="title">Entertainment expenses</p>
                                            <p class="amount">{Math.round((data.data.entertaintmentSum + entertainmentSum) * 100) / 100} EUR</p>
                                        </div>
                                        <div class="button">
                                            <a href="/entertainment-expenses">Details</a>
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                        <path fill-opacity="1" d="M0,224L60,202.7C120,181,240,139,360,106.7C480,75,600,53,720,85.3C840,117,960,203,1080,224C1200,245,1320,203,1380,181.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                                    </svg>
                                </div>
                                <div class="card house">
                                    <div class="padding">
                                        <div class="percentage-bar" style={{ background: 'conic-gradient( var(--house-color) 0deg, var(--house-color-shade) ' + (Math.round(data.data.houseSum / (expenses + foodSum + clothesSum + carSum + houseSum + entertainmentSum + otherSum) * 100 * 100) / 100 * 3.6) + 'deg, var(--main-text-color) ' + (Math.round((data.data.houseSum + houseSum / (expenses + foodSum + clothesSum + carSum + houseSum + entertainmentSum + otherSum) * 100 * 100) / 100 * 3.6) + 'deg 360deg)') }}>
                                            <div class="inside-box">{Math.round((data.data.houseSum + houseSum) / (expenses + foodSum + clothesSum + carSum + houseSum + entertainmentSum + otherSum) * 10 * 100) / 10}%</div>
                                        </div>
                                        <div class="texts">
                                            <p class="title">Housing expenses</p>
                                            <p class="amount">{Math.round((data.data.houseSum + houseSum) * 100) / 100} EUR</p>
                                        </div>
                                        <div class="button">
                                            <a href="/house-expenses">Details</a>
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                        <path fill-opacity="1" d="M0,224L60,202.7C120,181,240,139,360,106.7C480,75,600,53,720,85.3C840,117,960,203,1080,224C1200,245,1320,203,1380,181.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                                    </svg>
                                </div>
                                <div class="card clothes">
                                    <div class="padding">
                                        <div class="percentage-bar" style={{ background: 'conic-gradient( var(--clothing-color) 0deg, var(--clothing-color-shade) ' + (Math.round((data.data.clothesSum + clothesSum) / (expenses + foodSum + clothesSum + carSum + houseSum + entertainmentSum + otherSum) * 100 * 100) / 100 * 3.6) + 'deg, var(--main-text-color) ' + (Math.round((data.data.clothesSum + clothesSum) / (expenses + foodSum + clothesSum + carSum + houseSum + entertainmentSum + otherSum) * 100 * 100) / 100 * 3.6) + 'deg 360deg)' }}>
                                            <div class="inside-box">{Math.round((data.data.clothesSum + clothesSum) / (expenses + foodSum + clothesSum + carSum + houseSum + entertainmentSum + otherSum) * 10 * 100) / 10}%</div>
                                        </div>
                                        <div class="texts">
                                            <p class="title">Clothes expenses</p>
                                            <p class="amount">{Math.round((data.data.clothesSum + clothesSum) * 100) / 100} EUR</p>
                                        </div>
                                        <div class="button">
                                            <a href="/clothes-expenses">Details</a>
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                        <path fill-opacity="1" d="M0,224L60,202.7C120,181,240,139,360,106.7C480,75,600,53,720,85.3C840,117,960,203,1080,224C1200,245,1320,203,1380,181.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                                    </svg>
                                </div>
                                <div class="card other">
                                    <div class="padding">
                                        <div class="percentage-bar" style={{ background: 'conic-gradient( var(--other-color) 0deg, var(--other-color-shade) ' + (Math.round((data.data.otherSum + otherSum) / (expenses + foodSum + clothesSum + carSum + houseSum + entertainmentSum + otherSum) * 100 * 100) / 100 * 3.6) + 'deg, var(--main-text-color) ' + (Math.round((data.data.otherSum + otherSum) / (expenses + foodSum + clothesSum + carSum + houseSum + entertainmentSum + otherSum) * 100 * 100) / 100 * 3.6) + 'deg 360deg)' }}>
                                            <div class="inside-box">{Math.round((data.data.otherSum + otherSum) / (expenses + foodSum + clothesSum + carSum + houseSum + entertainmentSum + otherSum) * 10 * 100) / 10}%</div>
                                        </div>
                                        <div class="texts">
                                            <p class="title">Other expenses</p>
                                            <p class="amount">{Math.round((data.data.otherSum + otherSum) * 100) / 100} EUR</p>
                                        </div>
                                        <div class="button">
                                            <a href="/other-expenses">Details</a>
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                        <path fill-opacity="1" d="M0,224L60,202.7C120,181,240,139,360,106.7C480,75,600,53,720,85.3C840,117,960,203,1080,224C1200,245,1320,203,1380,181.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                                    </svg>
                                </div>
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