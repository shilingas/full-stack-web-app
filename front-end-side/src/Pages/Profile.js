import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../src/Components/Navbar";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
    const [workplace, setWorkplace] = useState("");
    const [incomeData, setIncomeData] = useState([]);
    const [status, setStatus] = useState(false);
    const [deletedWork, setDeletedWork] = useState("");
    const [unique, setUnique] = useState([]);
    const [sum, setSum] = useState(0);

    useEffect(() => {
        axios.get("https://localhost:7174/api/Income").then(resp => {
            setIncomeData(resp);
            setStatus(true);
        })
    }, [])

    useEffect(() => {
        axios.get("https://localhost:7174/api/InSum").then(resp => {
            setSum(resp.data);
        })
    }, [])

    useEffect(() => {
        if (status) {
            const uniqueArray = [...new Set(incomeData.data.map(item => {
                if (item.isSelected == true) {
                    return (item.seller);
                }
            }))];
            setUnique(uniqueArray);
        }
    }, [incomeData])

    const submitWorkplace = () => {
        axios.put("https://localhost:7174/api/Income/" + workplace);
    }

    const deleteWorkplace = (work) => {
        axios.delete("https://localhost:7174/api/Income/" + work).then(resp => {
            axios.get("https://localhost:7174/api/Income").then(resp => {
                setIncomeData(resp);
                setStatus(true);
            })
            axios.get("https://localhost:7174/api/InSum").then(resp => {
                setSum(resp.data);
            })
        }
        );
    }

    const moveToWorkplace = (work) => {
        axios.put("https://localhost:7174/api/Income/" + work).then(resp => {
            axios.get("https://localhost:7174/api/Income").then(resp => {
                setIncomeData(resp);
                setStatus(true);
            })
            axios.get("https://localhost:7174/api/InSum").then(resp => {
                setSum(resp.data);
            })
        }
        );;
    }

    return (
        <div>
            <Navbar />
            <div className="container">
                <h1>Profile</h1>
                <h1>Enter your source of income: </h1>
                <form onSubmit={submitWorkplace}>
                    <input onChange={(e) => setWorkplace(e.target.value)} type="text" placeholder="Workplace" />
                    <button>add</button>
                </form>
                {
                    status ? (
                        unique.map((item) => {
                            if (item != null) {
                                return (
                                    <div>{item}<a onClick={() => deleteWorkplace(item)} style={{ marginLeft: "25px" }}>Delete</a></div>
                                );
                            }
                        })
                    ) : (
                        null
                    )
                }
                <table className="data_table" style={{ marginBottom: "30px" }}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Source</th>
                            <th>Details</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            status ? (
                                incomeData.data.map((item) => {
                                    const { date, seller, purpose, amount, id, isSelected } = item;
                                    if (isSelected == true) {
                                        return (
                                            <tr>
                                                <td>{date.slice(0, 10)}</td>
                                                <td>{seller}</td>
                                                <td>{purpose}</td>
                                                <td>{parseFloat(amount).toFixed(2)}</td>
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
                <table className="data_table" style={{ marginBottom: "30px" }}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Source</th>
                            <th>Details</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            status ? (
                                incomeData.data.map((item) => {
                                    const { date, seller, purpose, amount, id, isSelected } = item;
                                    if (isSelected == false) {
                                        return (
                                            <tr>
                                                <td>{date.slice(0, 10)}</td>
                                                <td>{seller}</td>
                                                <td>{purpose}</td>
                                                <td>{parseFloat(amount).toFixed(2)}</td>
                                                <td><a onClick={() => moveToWorkplace(seller)}>add</a></td>
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
            </div>
        </div>
    );
}
export default Profile;