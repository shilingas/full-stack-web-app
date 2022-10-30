import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Pages/Data.css";
import Navbar from "../Components/Navbar";
import Modal from "../Components/Modal";
import ExpensesCard from "../Components/ExpensesCard";
import DataEnter from "../Pages/EnterData";
import UploadFile from "../Pages/FileUpload";
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
    const [size, setSize] = useState(5);
    const [allShown, setAllShown] = useState(false);
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
            setDelayForInput(true);
        })
    }, []);

    function addClass() {
        var element = document.getElementsByTagName("BODY")[0];
        element.classList.remove("modal-open");
    }

    function showAll() {
        setSize(info.data.length);
        setAllShown(true);
    }
    function showLess() {
        setSize(5);
        setAllShown(false);
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

            <Modal onClose={() => setShowEnterData(false)} show={showEnterData}>
                <DataEnter buttonType={"post"} date={""} seller={""} purpose={""} amount={""} />
            </Modal>

            <Modal onClose={() => setShowUploadData(false)} show={showUploadData}>
                <UploadFile/>
            </Modal>

            <Modal onClose={() => setShowUpdateData(false)} show={showUpdateData}>
                <ModalUpdateData show={showUpdateData} buttonType={"update"} index={currentIndex} date={currentDate} seller={currentSeller} purpose={currentPurpose} amount={currentAmount} />
            </Modal>

            <div className="container statistics-table">

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
                                
                                info.data.slice(0, size).map((item, index) => {
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

                {allShown ?
                    <button type="button" onClick={showLess}>Show less</button>
                    : <button type="button" onClick={showAll}>Show more</button>
                }
            </div>

            <div className="container">

                <h2 className="title">Statistics</h2>

                {
                    (delay && delayForInput) ? (
                        <div id="statistics">
                            <div id="cards">
                                <ExpensesCard name="food" categorySum={data.data.foodSum} expenses={expenses} />
                                <ExpensesCard name="transportation" categorySum={data.data.carSum} expenses={expenses} />
                                <ExpensesCard name="entertainment" categorySum={data.data.entertaintmentSum} expenses={expenses} />
                                <ExpensesCard name="house" categorySum={data.data.houseSum} expenses={expenses} />
                                <ExpensesCard name="clothes" categorySum={data.data.clothesSum} expenses={expenses} />
                                <ExpensesCard name="other" categorySum={data.data.otherSum} expenses={expenses} />
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