import React, { useState, useRef } from 'react';
import { useLocation } from "react-router-dom";

import { read, utils } from 'xlsx';

import 'mapbox-gl/dist/mapbox-gl.css';
import './Bulkupload.css';

import PageNavigation from '../PageNavigation/PageNavigation.jsx';
import TableTitle from '../TableTitle/TableTitle.jsx';
import createArrayTitles from '../../utils/createArrayTitles.js';

function Bulkupload() {
  const location = useLocation();

  const [selectedFile, setSelectedFile] = useState([]);
  // const [renderSelectedFile, setRenderSelectedFile] = useState([]);
  console.log("🚀 ~ file: Bulkupload.jsx ~ line 17 ~ Bulkupload ~ selectedFile", selectedFile)

  //нужна функция чтобы добавить ключи объекта в body
  // function addKeysToObjects(file) {
  //   if (file.length > 0) {
  //     let standart = selectedFile[0];
  //     // let standartArr = Object.getOwnPropertyNames(standart);

  //     return standart;
  //   }
  // }

// console.log(addKeysToObjects(selectedFile))

  const filePicker = useRef(null);

  function handleImport(event) {
    const files = event.target.files;

    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
            const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
            //нужна функция чтобы добавить ключи объекта в body                         здесь наверное!!!!!!!!!!!!!!!!!!!!!!!!!!
            setSelectedFile(rows)
        }
      }

      reader.readAsArrayBuffer(file);
    }
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
            name="upload"
            id="upload"
            className="bulkUpload__fileUpload-fileInput-hidden"
            ref={filePicker}
            type="file"
            onChange={(e) => handleImport(e)}
            // accept=".xlsx,.xls,.csv"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />
        </div>
          <table className="table">
            <thead>
              <tr>
                {
                  selectedFile && createArrayTitles(selectedFile).map((title, index) => {
                    return <TableTitle
                              key={index}
                              title={title}
                            />
                  })
                }
              </tr>
            </thead>
            <tbody>
              {

              }
            </tbody>
          </table>
      </div>
    </div>
  );
}

export default Bulkupload;