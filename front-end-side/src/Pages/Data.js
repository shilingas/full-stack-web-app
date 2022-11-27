import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../Pages/Data.css";
import Icon from "../Components/Icons.js";
import Navbar from "../Components/Navbar";
import Modal from "../Components/Modal";
import ExpensesCard from "../Components/ExpensesCard";
import DataEnter from "../Pages/EnterData";
import UploadFile from "../Pages/FileUpload";
import ModalUpdateData from "../Pages/EnterData";
import useGetData from "../useGetData";
const EnterData = () => {
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
    const [fileData, statusForFileData, setFileData, setStatusForFileData] = useGetData("GET_FILE_DATA");
    const [newExpenses, statusForExpenses, setNewExpenses, setStatusForExpenses] = useGetData("GET_EXPENSES");
    const [categoryData, categoryStatus, setCategoryData, setCategoryStatus] = useGetData("GET_CATEGORY_DATA");
    const [datePick, setDatePick] = useState(new Date().toISOString().split('T')[0].slice(0, 7));
    const [minDate, setMinDate] = useState(new Date().toISOString().split('T')[0].slice(0, 7));
    const initialRender = useRef(true);
    function addClass() {
        var element = document.getElementsByTagName("BODY")[0];
        element.classList.remove("modal-open");
    }
    function showAll() {
        setSize(fileData.data.length);
        setAllShown(true);
    }
    function showLess() {
        setSize(5);
        setAllShown(false);
    }

    useEffect(() => {

        if (initialRender.current) {
            initialRender.current = false;
        }
        else {
            var minStart = new Date();

            fileData.data.map((item) => {
                const { date } = item;
                let laikina = new Date(date);
                if (laikina < minStart) {
                    minStart = date;
                }
            })

            setMinDate(minStart);
        }
    }, [fileData.data]);

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
    const deleteData = (index) => {
        axios.delete(`https://localhost:7174/api/ShowData/${index}`).then(() => {
            axios.get("https://localhost:7174/api/File").then(resp => {
                setFileData(resp);
                setStatusForFileData(true);
            })
            axios.get("https://localhost:7174/api/Sorting").then(item => {
                setCategoryData(item);
                setCategoryStatus(true);
                setStatusForExpenses(true);
            });
            axios.get("https://localhost:7174/api/Sorting").then((item) => {
                setNewExpenses(item.data.carSum + item.data.clothesSum + item.data.entertaintmentSum + item.data.foodSum + item.data.otherSum + item.data.houseSum);
            })
        }
        )
        setShowConfirmation(false);
        CustomAlert("Success", "Record has been removed succesfully", 3000);
    }

    function toMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber - 1);

        if (monthNumber === "") {
            return "Your total";
        } else {
            return date.toLocaleString('en-US', {
                month: 'long',
            });
        }
    }

    useEffect(() => {
        if (datePick === "") {
            sendDate("total");
        }
    }, [datePick]);

    const sendDate = (e) => {
        if (e !== "total") {
            setDatePick(e);
        }
        axios.get("https://localhost:7174/api/MonthPicker/" + e).then(resp => {
            setFileData(resp);
        })
        axios.get("https://localhost:7174/api/SumsByMonth/" + e).then(item => {
            setCategoryData(item);
            setCategoryStatus(true);
            setStatusForExpenses(true);
        })
        axios.get("https://localhost:7174/api/SumsByMonth/" + e).then((item) => {
            setNewExpenses(item.data.carSum + item.data.clothesSum + item.data.entertaintmentSum + item.data.foodSum + item.data.otherSum + item.data.houseSum);
        })
    }

    return (
        <div>
            <Navbar />

            {
                !categoryStatus ? null :
                    newExpenses !== 0 ?
                        (
                            <React.Fragment>
                                <div className="container" style={{ marginTop: "30px" }}>
                                    <div class="second-navigation">
                                        <div className={"selects"}>
                                            <a onClick={addClass(), () => setShowEnterData(true)} style={{ marginRight: "10px" }}>Add data</a>
                                            <a onClick={() => setShowUploadData(true)}>Upload file</a>
                                        </div>
                                        <div>
                                            <input type="month" onChange={e => sendDate(e.target.value)} max={new Date().toISOString().split('T')[0].slice(0, 7)} defaultValue={new Date().toISOString().split('T')[0].slice(0, 7)}></input>
                                        </div>
                                    </div>

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
                                <Modal className="delete-comfirmation" show={showConfirmation} onClose={() => setShowConfirmation(false)}>
                                    <p>Are you sure you want to delete this record?</p>
                                    <div id="buttons">
                                        <button onClick={() => deleteData(deleteIndex)}>Yes</button>
                                        <button onClick={() => setShowConfirmation(false)} className="secondary">No</button>
                                    </div>
                                </Modal>

                                <div class="double-title">
                                    <h6 className="date">{datePick.slice(0, 4) + " " + toMonthName(datePick.slice(5, 7))}</h6>
                                    <h2 className="title">expenses</h2>
                                </div>

                                <div className="container statistics-table">

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
                                            {statusForFileData ? (

                                                fileData.data.slice(0, size).map((item) => {
                                                    const { date, seller, purpose, amount, id } = item;
                                                    return (

                                                        <tr>
                                                            <td>{date.slice(0, 10)}</td>
                                                            <td>{seller}</td>
                                                            <td>{purpose}</td>
                                                            <td>{amount.toFixed(2)}</td>
                                                            <td className="edit" onClick={() => updateData(id, date, seller, purpose, amount)}>
                                                                <Icon type="edit-button"></Icon>
                                                            </td>
                                                            <td className="delete" onClick={() => showModal(id)}>
                                                                <Icon type="trash-bin"></Icon>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            ) : (
                                                null
                                            )}
                                        </tbody>

                                        <tfoot>
                                            <tr>
                                                <td colSpan="3">Spent in total</td>
                                                <td colSpan="3">{parseFloat(newExpenses).toFixed(2)}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                    {
                                        fileData.data.length <= 5 ? null :
                                            allShown ?
                                                <button type="button" onClick={showLess}>Show less</button>
                                                : <button type="button" onClick={showAll}>Show more</button>
                                    }
                                </div>
                                <div className="container">

                                    <div class="double-title">
                                        <h6 className="date">{datePick.slice(0, 4) + " " + toMonthName(datePick.slice(5, 7))}</h6>
                                        <h2 className="title">statistics</h2>
                                    </div>
                                    {(statusForExpenses && categoryStatus) ? (
                                        <div id="statistics">
                                            <div id="cards">
                                                <ExpensesCard name="food" categorySum={categoryData.data.foodSum} expenses={newExpenses} />
                                                <ExpensesCard name="transportation" categorySum={categoryData.data.carSum} expenses={newExpenses} />
                                                <ExpensesCard name="entertainment" categorySum={categoryData.data.entertaintmentSum} expenses={newExpenses} />
                                                <ExpensesCard name="house" categorySum={categoryData.data.houseSum} expenses={newExpenses} />
                                                <ExpensesCard name="clothes" categorySum={categoryData.data.clothesSum} expenses={newExpenses} />
                                                <ExpensesCard name="other" categorySum={categoryData.data.otherSum} expenses={newExpenses} />
                                            </div>
                                        </div>
                                    ) : (
                                        null
                                    )}
                                </div>
                            </React.Fragment>
                        ) : (
                            <>
                                <div id="nothing-to-show">
                                    <div className="container">
                                        <h2 className="title">Ooops...</h2>
                                        <h5>Nothing to show here. Upload or enter data to get statistics</h5>
                                    </div>
                                </div>

                                <div className="container" style={{ marginTop: "30px" }}>
                                    <div class="second-navigation">
                                        <div className={"selects buttons"}>
                                            <a onClick={addClass(), () => setShowEnterData(true)} style={{ marginRight: "10px" }}>Add data</a>
                                            <a onClick={() => setShowUploadData(true)}>Upload file</a>
                                        </div>
                                    </div>

                                </div>
                                <Modal className="enter-data" onClose={() => setShowEnterData(false)} show={showEnterData}>
                                    <DataEnter buttonType={"post"} date={""} seller={""} purpose={""} amount={""} />
                                </Modal>
                                <Modal className="upload-data" onClose={() => setShowUploadData(false)} show={showUploadData}>
                                    <UploadFile />
                                </Modal>
                            </>
                        )
            }
        </div>
    );
}
export default EnterData;