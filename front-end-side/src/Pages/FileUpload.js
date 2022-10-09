import React, { useState } from "react";
import Navbar from "../../src/Components/Navbar";
import axios from "axios";
const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(null);

    const handleFile = (e) => {
        //console.log(e.target.files, "$$$$");
        //console.log(e.target.files[0].name, "NAME");
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const handleUpload = async (e) => {
        //console.log(file);
        //const formData = new FormData();
        //formData.append("formFile", file);
        //formData.append("fileName", fileName);
        try {
            const axios = require('axios')
            const res = await axios.post("https://localhost:7174/api/Upload", { "fileName" : fileName, "formFile" : file }, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            }).then(res => {
                console.log(res);
            }); 
        } catch (ex) {
            console.log("HAHAHAHHAHAH");
            console.log(ex);
        }

    };

    return (
            <div>
                <Navbar />
                <h1>File Upload</h1>
            <form>
                <div className="">
                    <label>Select File </label>
                    <input type="file" onChange={(e) => handleFile(e)}/>
                </div>

                <br />

                <button type="button" value = "upload" onClick={(e) => handleUpload(e)}>Upload</button>
             </form>

            </div>
        );
    
}
export default FileUpload;