import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Routes,
    Link
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Friends from "./Pages/Friends";
import ShowData from "./Pages/ShowData";
import EnterData from "./Pages/EnterData";
import ReadData from "./Pages/ReadData";
import FoodExpenses from "./Pages/FoodExpenses";
import ClothesExpenses from "./Pages/ClothesExpenses";
import CarExpenses from "./Pages/CarExpenses";
import HouseExpenses from "./Pages/HouseExpenses";
import EntertainmentExpenses from "./Pages/EntertainmentExpenses";
import OtherExpenses from "./Pages/OtherExpenses";
import FileUpload from "./Pages/FileUpload";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/friends" element={<Friends />} />
                <Route path="/show-data" element={<ShowData />} />
                <Route path="/enter-data" element={<EnterData />} />
                <Route path="/read-from-file-data" element={<ReadData />} />
                <Route path="/food-expenses" element={<FoodExpenses />} />
                <Route path="/clothes-expenses" element={<ClothesExpenses />} />
                <Route path="/car-expenses" element={<CarExpenses />} />
                <Route path="/house-expenses" element={<HouseExpenses />} />
                <Route path="/entertainment-expenses" element={<EntertainmentExpenses />} />
                <Route path="/other-expenses" element={<OtherExpenses />} />
                <Route path="/file-upload" element={<FileUpload />} />
            </Routes>
        </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
