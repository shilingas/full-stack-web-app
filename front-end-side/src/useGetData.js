import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
function useGetData(type) {
    const [data, setData] = useState([]);
    const [delay, setDelay] = useState(false);
    const [expenses, setExpenses] = useState(0);
    const [info, setInfo] = useState([]);
    const [status, setStatus] = useState(false);
    const [delayForInput, setDelayForInput] = useState(false);
    const [statusForSorting, setStatusForSorting] = useState(false);
    const { getAccessTokenSilently } = useAuth0();
    // kategoriju sumos
    useEffect(() => {
        axios.get("https://localhost:7174/api/Sorting").then(item => {
            setData(item);
            setStatusForSorting(true);
        })
    }, []);
    // kategoriju sumos
    useEffect(() => {
        axios.get("https://localhost:7174/api/Sorting").then(item => {
            setExpenses(item.data.carSum + item.data.clothesSum + item.data.entertaintmentSum + item.data.foodSum + item.data.otherSum + item.data.houseSum);
            setStatusForSorting(true);
        })
    }, []);
    // info is file
    useEffect(() => {
        (async () => {
            const token = await getAccessTokenSilently();
            console.log(token);
            try {
                const resp = await axios.get("https://localhost:7174/api/File", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setStatus(true);
                setInfo(resp);               
            } catch (e) {

            }
        })();
    }, []);
    useEffect(() => {
        axios.get('https://localhost:7174/api/ShowData').then(resp => {
            setDelayForInput(true);
        })
    }, []);
    if (type == "GET_FILE_DATA") {
        return [info, status, setInfo, setStatus];
    }
    if (type == "GET_EXPENSES") {
        return [expenses, statusForSorting, setExpenses, setStatusForSorting];
    }
    if (type == "GET_CATEGORY_DATA")
        return [data, statusForSorting, setData, setStatusForSorting];
}
export default useGetData;