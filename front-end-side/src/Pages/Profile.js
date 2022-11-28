import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../src/Components/Navbar";
import { useAuth0 } from "@auth0/auth0-react";

const Friends = () => {
    const [workplace, setWorkplace] = useState("");
    const [incomeData, setIncomeData] = useState([]);
    const [status, setStatus] = useState(false);
    const [deletedWork, setDeletedWork] = useState("");

    useEffect(() => {
        axios.get("https://localhost:7174/api/Income").then(resp => {
            setIncomeData(resp);
            setStatus(true);
        })
    }, [])

    const submitWorkplace = () => {
        axios.put("https://localhost:7174/api/Income/" + workplace);
    }

    const deleteWorkplace = (work) => {
            axios.delete("https://localhost:7174/api/Income/" + work).then(resp => {
                axios.get("https://localhost:7174/api/Income").then(resp => {
                    setIncomeData(resp);
                    setStatus(true);
                })
            }
            );
    }

    return (
        <div>
            <Navbar />
            <div className="container">
                <h1>Profile</h1>
                <h1>Enter your source of income: </h1>
                <form onSubmit={submitWorkplace}>
                    <input onChange={(e) => setWorkplace(e.target.value)} type="text" placeholder="WorkPlace" />
                    <button>add</button>
                </form>
                {
                    status ? (
                        incomeData.data.map((item, index) => {
                            const { date, seller, purpose, amount, id, isSelected } = item;
                            if (isSelected == true) {
                                return (
                                    <div>{seller}<a onClick={() => deleteWorkplace(seller)} style={{marginLeft: "25px"} }>Delete</a></div>
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
                                incomeData.data.map((item, index) => {
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
                                incomeData.data.map((item, index) => {
                                    const { date, seller, purpose, amount, id, isSelected } = item;
                                    if (isSelected == false) {
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
                </table>
            </div>
        </div>
    );
}
export default Friends;