import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Pages/Data.css";
import Icon from "../Components/Icons.js";
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
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [allShown, setAllShown] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(0);
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
    const showModal = (index) => {
        setShowConfirmation(true);
        setDeleteIndex(index);
    }
    const deleteData = (index) => {
        axios.delete(`https://localhost:7174/api/ShowData/${index}`).then(() => {
            axios.get("https://localhost:7174/api/File").then(resp => {
                setInfo(resp);
                setStatus(true);
            })
            axios.get("https://localhost:7174/api/Sorting").then(item => {
                setData(item);
                setDelay(true);
            });
            axios.get("https://localhost:7174/api/Sorting").then((item) => {
                setExpenses(item.data.carSum + item.data.clothesSum + item.data.entertaintmentSum + item.data.foodSum + item.data.otherSum + item.data.houseSum);
            })
        }
        )
        setShowConfirmation(false);
    }
    return (
        <div>
            <Navbar />

            <div className="container" style={{ marginTop: "30px" }}>
                <a onClick={addClass(), () => setShowEnterData(true)} style={{ marginRight: "10px" }}>Add data</a>
                <a onClick={() => setShowUploadData(true)}>Upload Data</a>
            </div>

            <Modal className="enter-data" onClose={() => setShowEnterData(false)} show={showEnterData}>
                <DataEnter buttonType={"post"} date={""} seller={""} purpose={""} amount={""} />
            </Modal>

            <Modal className="upload-data" onClose={() => setShowUploadData(false)} show={showUploadData}>
                <UploadFile />
            </Modal>

            <Modal className="enter-data" onClose={() => setShowUpdateData(false)} show={showUpdateData}>
                <ModalUpdateData show={showUpdateData} buttonType={"update"} index={currentIndex} date={currentDate} seller={currentSeller} purpose={currentPurpose} amount={currentAmount} />
            </Modal>
            <Modal show={showConfirmation} onClose={() => setShowConfirmation(false)}>
                <p>delete?</p>
                <button onClick={() => deleteData(deleteIndex)}>Yes</button>
                <button onClick={() => setShowConfirmation(false)}>No</button>
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
                                                <Icon type="edit-button"></Icon>
                                            </td>
                                            <td onClick={() => showModal(index)}>Remove item</td>
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