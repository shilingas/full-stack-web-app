import React, { useState, useEffect } from "react";
import "../Pages/FileUpload.css";
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

    if (!props.show) {
        return null;
    }

    return (

        <form>
            <div className="">
                <label class="upload-file">
                    <div class="zindex">
                        <div class="upload-icon">
                            <svg viewBox="0 0 490.955 490.955">
                                <path id="XMLID_448_" d="M445.767,308.42l-53.374-76.49v-20.656v-11.366V97.241c0-6.669-2.604-12.94-7.318-17.645L312.787,7.301  C308.073,2.588,301.796,0,295.149,0H77.597C54.161,0,35.103,19.066,35.103,42.494V425.68c0,23.427,19.059,42.494,42.494,42.494  h159.307h39.714c1.902,2.54,3.915,5,6.232,7.205c10.033,9.593,23.547,15.576,38.501,15.576c26.935,0-1.247,0,34.363,0  c14.936,0,28.483-5.982,38.517-15.576c11.693-11.159,17.348-25.825,17.348-40.29v-40.06c16.216-3.418,30.114-13.866,37.91-28.811  C459.151,347.704,457.731,325.554,445.767,308.42z M170.095,414.872H87.422V53.302h175.681v46.752  c0,16.655,13.547,30.209,30.209,30.209h46.76v66.377h-0.255v0.039c-17.685-0.415-35.529,7.285-46.934,23.46l-61.586,88.28  c-11.965,17.134-13.387,39.284-3.722,57.799c7.795,14.945,21.692,25.393,37.91,28.811v19.842h-10.29H170.095z M410.316,345.771  c-2.03,3.866-5.99,6.271-10.337,6.271h-0.016h-32.575v83.048c0,6.437-5.239,11.662-11.659,11.662h-0.017H321.35h-0.017  c-6.423,0-11.662-5.225-11.662-11.662v-83.048h-32.574h-0.016c-4.346,0-8.308-2.405-10.336-6.271  c-2.012-3.866-1.725-8.49,0.783-12.07l61.424-88.064c2.189-3.123,5.769-4.984,9.57-4.984h0.017c3.802,0,7.38,1.861,9.568,4.984  l61.427,88.064C412.04,337.28,412.328,341.905,410.316,345.771z" />
                            </svg>
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