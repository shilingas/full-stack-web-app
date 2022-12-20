import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../src/Components/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import Icon from "../../src/Components/Icons";
import Modal from "../Components/Modal";
import ModalUpdateData from "../Pages/EnterData";
import Accordion from "../Components/Accordion";
import "../Pages/Profile.css";

const Profile = () => {
    const [workplace, setWorkplace] = useState("");
    const [incomeData, setIncomeData] = useState([]);
    const [status, setStatus] = useState(false);
    const [unique, setUnique] = useState([]);
    const [sum, setSum] = useState(0);
    const [currentId, setCurrentId] = useState(0);
    const [currentDate, setCurrentDate] = useState("");
    const [currentSeller, setCurrentSeller] = useState("");
    const [currentPurpose, setCurrentPurpose] = useState("");
    const [currentAmount, setCurrentAmount] = useState("");
    const [showUpdateData, setShowUpdateData] = useState(false);
    const [income, setIncome] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0].slice(0, 7));
    const [allData, setAllData] = useState(null);

    function addClass() {
        var element = document.getElementsByTagName("BODY")[0];
        element.classList.remove("modal-open");
    }

    useEffect(() => {
        axios.get("https://localhost:7174/api/Income/Get/" + selectedDate).then(resp => {
            setIncomeData(resp);
            setStatus(true);
        })
    }, [])

    useEffect(() => {
        axios.get("https://localhost:7174/api/InSum/" + selectedDate).then(resp => {
            setSum(resp.data);
        })
    }, [])

    useEffect(() => {
        axios.get("https://localhost:7174/api/Income/GetAll").then(resp => {
            setAllData(resp);
        })
    }, [])

    useEffect(() => {
        if (status) {
            if (allData.data != null) {
                let uniqueArray = [...new Set(allData.data.map(item => {
                    let seller = item.seller.toUpperCase();
                    console.log(item.seller);
                    if (item.isSelected == true) {
                        return (seller);
                    }
                }))];
                setUnique(uniqueArray);
            }
        }
    }, [allData])

    const submitWorkplace = () => {
        axios.put("https://localhost:7174/api/Income/Put/" + workplace).then(resp => {
        });
    }

    const deleteWorkplace = (work) => {
        axios.delete("https://localhost:7174/api/Income/Delete/" + work).then(resp => {
            axios.get("https://localhost:7174/api/Income/Get/" + selectedDate).then(resp => {
                setIncomeData(resp);
                setStatus(true);
            })
            axios.get("https://localhost:7174/api/InSum/" + selectedDate).then(resp => {
                setSum(resp.data);
            })
            axios.get("https://localhost:7174/api/Income/GetAll").then(resp => {
                setAllData(resp);
            })
        }
        );
    }

    const moveToWorkplace = (id) => {
        axios.put("https://localhost:7174/api/Income/AddRecord/" + id).then(resp => {
            axios.get("https://localhost:7174/api/Income/Get/" + selectedDate).then(resp => {
                setIncomeData(resp);
                setStatus(true);
            })
            axios.get("https://localhost:7174/api/InSum/" + selectedDate).then(resp => {
                setSum(resp.data);
            })
        });
    }

    const updateData = (id, date, seller, purpose, amount, isSelected, isAdded) => {
        setCurrentId(id);
        setCurrentDate(date);
        setCurrentSeller(seller);
        setCurrentPurpose(purpose);
        setCurrentAmount(amount);
        setIsSelected(isSelected);
        setIsAdded(isAdded);
        setIncome(true);
        addClass();
        setShowUpdateData(true);
    }

    useEffect(() => {
        if (selectedDate === "") {
            sendDate("total");
        }
    }, [selectedDate]);

    const sendDate = (date) => {
        setSelectedDate(date);
        axios.get("https://localhost:7174/api/Income/Get/" + date).then(resp => {
            setIncomeData(resp);
            setStatus(true);
        });
        axios.get("https://localhost:7174/api/InSum/" + date).then(resp => {
            setSum(resp.data);
        });

    }
    const remove = (id) => {
        axios.delete("https://localhost:7174/api/Income/Remove/" + id).then(resp => {
            axios.get("https://localhost:7174/api/Income/Get/" + selectedDate).then(resp => {
                setIncomeData(resp);
                setStatus(true);
            })
            axios.get("https://localhost:7174/api/InSum/" + selectedDate).then(resp => {
                setSum(resp.data);
            })
        });
    }

    return (
        <div>
            <Navbar />
            <Modal className="enter-data" onClose={() => setShowUpdateData(false)} show={showUpdateData}>
                <ModalUpdateData show={showUpdateData} buttonType={"update"} id={currentId} date={currentDate} seller={currentSeller} purpose={currentPurpose} amount={currentAmount} income={income} isSelected={isSelected} isAdded={isAdded} />
            </Modal>
            <div className="container" style={{margin: "50px auto"} }>

                <Accordion title="Income manager">
                    <div id="all-sources">
                        {
                            status ? (
                                unique.map((item) => {
                                    if (item != null) {
                                        return (
                                            <div className="income-source">
                                                {item}
                                                <a onClick={() => deleteWorkplace(item)}>
                                                    <Icon type="trash-bin"></Icon>
                                                </a>
                                            </div>
                                        );
                                    }
                                })
                            ) : (
                                null
                            )
                        }
                    </div>

                    <form onSubmit={submitWorkplace} id="workplace-input-form">
                        <input onChange={(e) => setWorkplace(e.target.value)} type="text" placeholder="Workplace" />
                        <button>add</button>
                    </form>

                    <div>
                        <input type="month" onChange={e => sendDate(e.target.value)} max={new Date().toISOString().split('T')[0].slice(0, 7)} defaultValue={new Date().toISOString().split('T')[0].slice(0, 7)}></input>
                    </div>
                    <table className="data_table" style={{ marginBottom: "30px" }}>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Source</th>
                                <th>Details</th>
                                <th>Amount</th>
                                <th colSpan="2" className="last"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                status ? (
                                    incomeData.data.map((item) => {
                                        const { date, seller, purpose, amount, id, isSelected, isAdded } = item;
                                        if (isSelected == true || isAdded == true) {
                                            return (
                                                <tr>
                                                    <td>{date.slice(0, 10)}</td>
                                                    <td>{seller}</td>
                                                    <td>{purpose}</td>
                                                    <td>{parseFloat(amount).toFixed(2)}</td>
                                                    <td className="edit" onClick={addClass(), () => updateData(id, date, seller, purpose, amount, isSelected, isAdded)}>
                                                        <Icon type="edit-button"></Icon>
                                                    </td>
                                                    <td className="delete" onClick={addClass(), () => remove(id)}>
                                                        <Icon type="close-button"></Icon>
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
                        <tfoot>
                            <tr>
                                <td colSpan="3">Total Income</td>
                                <td colSpan="3">{parseFloat(sum).toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                    <table className="data_table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Source</th>
                                <th>Details</th>
                                <th>Amount</th>
                                <th colSpan="2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                status ? (
                                    incomeData.data.map((item) => {
                                        const { date, seller, purpose, amount, id, isSelected, isAdded } = item;
                                        if (isSelected == false && isAdded == false) {
                                            return (
                                                <tr>
                                                    <td>{date.slice(0, 10)}</td>
                                                    <td>{seller}</td>
                                                    <td>{purpose}</td>
                                                    <td>{parseFloat(amount).toFixed(2)}</td>
                                                    <td className="add" onClick={() => moveToWorkplace(id)}>
                                                        <Icon type="close-button"></Icon>
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
                </Accordion>

                <Accordion title="Set your goals">
                    Nothing to show yet
                </Accordion>
                <Accordion title="Profile settings">
                    Nothing to show yet
                </Accordion>

            </div>
        </div>
    );
}
export default Profile;