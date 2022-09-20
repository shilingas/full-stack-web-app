import React, { Component, useState, useEffect } from 'react';
import axios from "axios";
const App = () => {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState(false);
    //  useEffect(() => {
    //     axios.get("https://localhost:7174/api/Check").then(resp => {
    //        setData(resp);
    //       setStatus(true);
    //    })
    //  });

    const showData = () => {
        axios.get("https://localhost:7174/api/Check").then(resp => {
            setData(resp);
            setStatus(true);
        })
    }
    return (
        <div className='container'>
            <button onClick={showData}>Show data</button>
            <button onClick={() => setData([])}>Clear data</button>
            <div className='data'>
                {
                    status ? (
                        data.data.map((item) => {
                            const { id, marketName } = item;
                            return (
                                <div>
                                    <h1>{id} </h1>
                                    <h1>{marketName}</h1>
                                </div>
                            );
                        })) : (
                        <h1>empty data...</h1>
                    )
                }
            </div>
        </div>
    );
}
export default App;