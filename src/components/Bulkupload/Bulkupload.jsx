import React, { useState, useRef } from 'react';
import { useLocation } from "react-router-dom";

import 'mapbox-gl/dist/mapbox-gl.css';
import './Bulkupload.css';

import PageNavigation from '../PageNavigation/PageNavigation.jsx';

function Bulkupload() {
  const location = useLocation();

  const [selectedFile, setSelectedFile] = useState(null);
  console.log("🚀 ~ file: Bulkupload.jsx ~ line 13 ~ Bulkupload ~ selectedFile", selectedFile)

  const filePicker = useRef(null);

  function fileUploadHandleChange(event) {
    event.preventDefault();
    setSelectedFile(event.target.files[0]);
  }

  function handlePickFile(e) {
    e.preventDefault();
    //При клике на button, по факту клик производим на input
    filePicker.current.click();
  }

  return (
    <div className="bulkUpload">
      <div className="bulkUpload__container">
        <h2 className="bulkUpload__title">RIP.kz</h2>
        <PageNavigation
          location={location}
        />
        <div className="bulkUpload__fileUpload-block">
          <button onClick={handlePickFile} className="bulkUpload__fileUpload-pickfile-button">Выбрать файл</button>
          <input
            className="bulkUpload__fileUpload-fileInput-hidden"
            ref={filePicker}
            type="file"
            onChange={fileUploadHandleChange}
            accept=".xlsx,.xls,.csv"
          />
        </div>
        {
          selectedFile &&
          <table>
            
          </table>
        }
      </div>
    </div>
  );
}

export default Bulkupload;