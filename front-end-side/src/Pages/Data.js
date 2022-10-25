import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Pages/Data.css";
import Navbar from "../Components/Navbar";
import ModalEnterData from "../Pages/EnterData";
import ModalUploadFile from "../Pages/FileUpload";
import ModalUpdateData from "../Pages/EnterData";
const EnterData = () => {
    const [data, setData] = useState({});
    const [info, setInfo] = useState([]);
    const [status, setStatus] = useState(false);
    const [delay, setDelay] = useState(false);
    const [delayForInput, setDelayForInput] = useState(false);
    const [expenses, setExpenses] = useState(0);
    const [showUploadData, setShowUploadData] = useState(false);
    const [showEnterData, setShowEnterData] = useState(false);
    const [showUpdateData, setShowUpdateData] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentDate, setCurrentDate] = useState("");
    const [currentSeller, setCurrentSeller] = useState("");
    const [currentPurpose, setCurrentPurpose] = useState("");
    const [currentAmount, setCurrentAmount] = useState("");
    useEffect(() => {
        axios.get("https://localhost:7174/api/Sorting").then(item => {
            setData(item);
            setDelay(true);
        })
    }, []);
    useEffect(() => {
        axios.get("https://localhost:7174/api/Sorting").then(item => {

            setExpenses(item.data.carSum + item.data.clothesSum + item.data.entertaintmentSum + item.data.foodSum + item.data.otherSum + item.data.houseSum);

            setTimeout(function () {
                if (item.data.foodSum == 0) {
                    disableField("food");
                }
                if (item.data.carSum == 0) {
                    disableField("car");
                }
                if (item.data.entertaintmentSum == 0) {
                    disableField("entertainment");
                }
                if (item.data.clothesSum == 0) {
                    disableField("clothes");
                }
                if (item.data.houseSum == 0) {
                    disableField("house");
                }
                if (item.data.otherSum == 0) {
                    disableField("other");
                }
            }, delay);


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
            setDelayForInput(true);
        })
    }, []);

    function disableField(string) {
        var elems = document.getElementsByClassName(string);
        for (var i = 0; i < elems.length; i += 1) {
            elems[i].className += ' disabled';
        }
    }

    function checkIfNotNaN(number) {
        if (isNaN(number)) {
            return 0;
        } else {
            return number;
        }
    }

    function addClass() {
        var element = document.getElementsByTagName("BODY")[0];
        element.classList.remove("modal-open");
    }
    const updateData = (index, date, seller, purpose, amount) => {
        setCurrentIndex(index);
        setCurrentDate(date);
        setCurrentSeller(seller);
        setCurrentPurpose(purpose);
        setCurrentAmount(amount);
        addClass();
        setShowUpdateData(true);
    }

    return (
        <div>
            <Navbar />

            <div className="container" style={{marginTop: "30px"} }>
                <a onClick={addClass(), () => setShowEnterData(true)} style={{marginRight: "10px"} }>Add data</a>
                <a onClick={() => setShowUploadData(true)}>Upload Data</a>
            </div>

            <ModalEnterData onClose={() => setShowEnterData(false)} show={showEnterData} buttonType={"post"} date={"Date"} seller={"Seller"} purpose={"Purpose"} amount={"Amount"} />
            <ModalUploadFile onClose={() => setShowUploadData(false)} show={showUploadData} />
            <ModalUpdateData onClose={() => setShowUpdateData(false)} show={showUpdateData} buttonType={"update"} index={currentIndex} date={currentDate} seller={currentSeller} purpose={currentPurpose} amount={currentAmount} />

            <div className="container">

                <h2 className="title">Your expenses</h2>

                <table className="data_table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Seller</th>
                            <th>Details</th>
                            <th>Price</th>
                            <th colSpan="2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            status ? (
                                info.data.map((item, index) => {
                                    const { date, seller, purpose, amount } = item;
                                    return (
                                        <tr>
                                            <td>{date.slice(0, 10)}</td>
                                            <td>{seller}</td>
                                            <td>{purpose}</td>
                                            <td>{amount.toFixed(2)}</td>
                                            <td className="edit" onClick={() => updateData(parseInt(index), date, seller, purpose, amount)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30">    <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path></svg>
                                            </td>
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
                            <td colSpan="3">Spent in total</td>
                            <td colSpan="3">{parseFloat(expenses).toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div className="container">

                <h2 className="title">Statistics</h2>

                {
                    (delay && delayForInput) ? (
                        <div id="statistics">
                            <div id="cards">
                                <div className="card food">
                                    <div className="padding">
                                        <div className="percentage-bar" style={{ background: 'conic-gradient( var(--food-color) 0deg, var(--food-color-shade) ' + checkIfNotNaN(Math.round((data.data.foodSum) / (expenses) * 100 * 100) / 100 * 3.6) + 'deg, var(--main-text-color) ' + checkIfNotNaN(Math.round((data.data.foodSum) / (expenses) * 100 * 100) / 100 * 3.6) + 'deg 360deg)' }}>
                                            <div className="inside-box">{checkIfNotNaN(Math.round((data.data.foodSum) / (expenses) * 10 * 100) / 10)}%</div>
                                        </div>
                                        <div className="texts">
                                            <p className="title">Food expenses</p>
                                            <p className="amount">{Math.round((data.data.foodSum) * 100) / 100} EUR</p>
                                        </div>
                                        <div className="button">
                                            <div className="cursor-field">
                                                <a href="/food-expenses">Details</a>
                                            </div>
                                        </div>
                                    </div>

                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                        <path fillOpacity="1" d="M0,224L60,202.7C120,181,240,139,360,106.7C480,75,600,53,720,85.3C840,117,960,203,1080,224C1200,245,1320,203,1380,181.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                                    </svg>
                                </div>
                                <div className="card car">
                                    <div className="padding">
                                        <div className="percentage-bar" style={{ background: 'conic-gradient( var(--transportation-color) 0deg, var(--transportation-color-shade) ' + checkIfNotNaN(Math.round((data.data.carSum) / (expenses) * 100 * 100) / 100 * 3.6) + 'deg, var(--main-text-color) ' + checkIfNotNaN(Math.round((data.data.carSum) / (expenses) * 100 * 100) / 100 * 3.6) + 'deg 360deg)' }}>
                                            <div className="inside-box">{checkIfNotNaN(Math.round((data.data.carSum) / (expenses) * 10 * 100) / 10)}%</div>
                                        </div>
                                        <div className="texts">
                                            <p className="title">Transportation expenses</p>
                                            <p className="amount">{Math.round((data.data.carSum) * 100) / 100} EUR</p>
                                        </div>
                                        <div className="button">
                                            <div className="cursor-field">
                                                <a href="/car-expenses">Details</a>
                                            </div>
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                        <path fillOpacity="1" d="M0,224L60,202.7C120,181,240,139,360,106.7C480,75,600,53,720,85.3C840,117,960,203,1080,224C1200,245,1320,203,1380,181.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                                    </svg>
                                </div>
                                <div className="card entertainment">
                                    <div className="padding">
                                        <div className="percentage-bar" style={{ background: 'conic-gradient( var(--entertainment-color) 0deg, var(--entertainment-color-shade) ' + checkIfNotNaN(Math.round((data.data.entertaintmentSum) / (expenses) * 100 * 100) / 100 * 3.6) + 'deg, var(--main-text-color) ' + checkIfNotNaN(Math.round((data.data.entertaintmentSum) / (expenses) * 100 * 100) / 100 * 3.6) + 'deg 360deg)' }}>
                                            <div className="inside-box">{checkIfNotNaN(Math.round((data.data.entertaintmentSum) / (expenses) * 10 * 100) / 10)}%</div>
                                        </div>
                                        <div className="texts">
                                            <p className="title">Entertainment expenses</p>
                                            <p className="amount">{Math.round((data.data.entertaintmentSum) * 100) / 100} EUR</p>
                                        </div>
                                        <div className="button">
                                            <div className="cursor-field">
                                                <a href="/entertainment-expenses">Details</a>
                                            </div>
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                        <path fillOpacity="1" d="M0,224L60,202.7C120,181,240,139,360,106.7C480,75,600,53,720,85.3C840,117,960,203,1080,224C1200,245,1320,203,1380,181.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                                    </svg>
                                </div>
                                <div className="card house">
                                    <div className="padding">
                                        <div className="percentage-bar" style={{ background: 'conic-gradient( var(--house-color) 0deg, var(--house-color-shade) ' + checkIfNotNaN(Math.round(data.data.houseSum / (expenses) * 100 * 100) / 100 * 3.6) + 'deg, var(--main-text-color) ' + checkIfNotNaN(Math.round((data.data.houseSum / (expenses) * 100 * 100) / 100 * 3.6) + 'deg 360deg)') }}>
                                            <div className="inside-box">{checkIfNotNaN(Math.round((data.data.houseSum) / (expenses) * 10 * 100) / 10)}%</div>
                                        </div>
                                        <div className="texts">
                                            <p className="title">Housing expenses</p>
                                            <p className="amount">{Math.round((data.data.houseSum) * 100) / 100} EUR</p>
                                        </div>
                                        <div className="button">
                                            <div className="cursor-field">
                                                <a href="/house-expenses">Details</a>
                                            </div>
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                        <path fillOpacity="1" d="M0,224L60,202.7C120,181,240,139,360,106.7C480,75,600,53,720,85.3C840,117,960,203,1080,224C1200,245,1320,203,1380,181.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                                    </svg>
                                </div>
                                <div className="card clothes">
                                    <div className="padding">
                                        <div className="percentage-bar" style={{ background: 'conic-gradient( var(--clothing-color) 0deg, var(--clothing-color-shade) ' + checkIfNotNaN(Math.round((data.data.clothesSum) / (expenses) * 100 * 100) / 100 * 3.6) + 'deg, var(--main-text-color) ' + checkIfNotNaN(Math.round((data.data.clothesSum) / (expenses) * 100 * 100) / 100 * 3.6) + 'deg 360deg)' }}>
                                            <div className="inside-box">{checkIfNotNaN(Math.round((data.data.clothesSum) / (expenses) * 10 * 100) / 10)}%</div>
                                        </div>
                                        <div className="texts">
                                            <p className="title">Clothes expenses</p>
                                            <p className="amount">{Math.round((data.data.clothesSum) * 100) / 100} EUR</p>
                                        </div>
                                        <div className="button">
                                            <div className="cursor-field">
                                                <a href="/clothes-expenses">Details</a>
                                            </div>
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                        <path fillOpacity="1" d="M0,224L60,202.7C120,181,240,139,360,106.7C480,75,600,53,720,85.3C840,117,960,203,1080,224C1200,245,1320,203,1380,181.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                                    </svg>
                                </div>
                                <div className="card other">
                                    <div className="padding">
                                        <div className="percentage-bar" style={{ background: 'conic-gradient( var(--other-color) 0deg, var(--other-color-shade) ' + checkIfNotNaN(Math.round((data.data.otherSum) / (expenses) * 100 * 100) / 100 * 3.6) + 'deg, var(--main-text-color) ' + checkIfNotNaN(Math.round((data.data.otherSum) / (expenses) * 100 * 100) / 100 * 3.6) + 'deg 360deg)' }}>
                                            <div className="inside-box">{checkIfNotNaN(Math.round((data.data.otherSum) / (expenses) * 10 * 100) / 10)}%</div>
                                        </div>
                                        <div className="texts">
                                            <p className="title">Other expenses</p>
                                            <p className="amount">{Math.round((data.data.otherSum) * 100) / 100} EUR</p>
                                        </div>
                                        <div className="button">
                                            <div className="cursor-field">
                                                <a href="/other-expenses">Details</a>
                                            </div>
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                        <path fillOpacity="1" d="M0,224L60,202.7C120,181,240,139,360,106.7C480,75,600,53,720,85.3C840,117,960,203,1080,224C1200,245,1320,203,1380,181.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
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