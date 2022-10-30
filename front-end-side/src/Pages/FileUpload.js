import React, { useState, useEffect } from "react";
import "../Pages/FileUpload.css";
import Icon from "../Components/Icons.js";
import axios from "axios";
const FileUpload = props => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [delay, setDelay] = useState(false);

    useEffect(() => {
        axios.get("https://localhost:7174/api/Sorting").then(() => {
            setDelay(true);
        })
    }, []);

    const handleFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const handleUpload = async (e) => {
        const formData = new FormData();
        formData.append("fileName", fileName);
        formData.append("formFile", file);
        const newData = Object.fromEntries(formData.entries());
        try {
            const res = await axios.post("https://localhost:7174/api/Upload", newData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            })

        } catch (ex) {
            console.log(ex);
        }
        window.location.reload(true);
    };

    function updateList() {
        setTimeout(function () {
            var input = document.getElementById('file');
            var output = document.getElementById('fileName');

            output.innerHTML = input.files.item(0).name;
        }, delay);
    }

    return (

        <form>
            <div className="">
                <label class="upload-file">
                    <div class="zindex">
                        <div class="upload-icon">
                            <Icon type="upload-icon" />
                            <p className="title">Drag and Drop files here</p>
                            <p className="files-upported">Only Swedbank, SEB and Paysera .csv files are supported!</p>
                            <button>Choose File</button>
                        </div>
                    </div>
                    <input type="file" id="file" accept=".csv" onChange={updateList(), (e) => handleFile(e)} />
                    <div id="fileName">No file chosen</div>
                </label>
            </div>

            <div class="button-block">
                <button type="button" value="upload" onClick={(e) => handleUpload(e)}>Upload</button>
            </div>
        </form>
    );
}

export default FileUpload;