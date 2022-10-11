import React, { useState } from "react";
import Navbar from "../../src/Components/Navbar";
import axios from "axios";
const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [bank, setBank] = useState(null);

    const handleFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
        var selectedBank = document.getElementById("banks");
        setBank(selectedBank.value);
    };

    const handleUpload = async (e) => {
        const formData = new FormData();
        formData.append("fileName", fileName);
        formData.append("formFile", file);
        formData.append("bank", bank)
        const newData = Object.fromEntries(formData.entries());
        try {
            const res = await axios.post("https://localhost:7174/api/Upload", newData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },  
            }).then(res => {
                console.log(res);
            });
            console.log(res); 

        } catch (ex) {
            console.log(ex);
        }
    };

    return (
            <div class="container">
                <Navbar />
                <h2 class="title">File Upload</h2>
                <form>
                    <div className="">
                        <label for="banks">Choose a bank:</label>
                        <select id="banks">
                            <option value="0">Swedbank</option>
                            <option value="1">Paysera</option>
                            <option value="2">SEB</option>
                        </select>
                        <label>Select File </label>
                        <input type="file" accept=".csv" onChange={(e) => handleFile(e)}/>
                    </div>
                    <br />
                    <button type="button" value="upload" onClick={(e) => handleUpload(e)}>Upload</button>
                 </form>
            </div>
        );
    
}
export default FileUpload;