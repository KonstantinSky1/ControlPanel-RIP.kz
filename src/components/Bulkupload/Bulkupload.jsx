import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from "react-router-dom";

import { read, utils } from 'xlsx';

import 'mapbox-gl/dist/mapbox-gl.css';
import './Bulkupload.css';

import { Pagination } from '@mui/material';

import PageNavigation from '../PageNavigation/PageNavigation.jsx';
import TableTitle from '../TableTitle/TableTitle.jsx';
import TableBody from '../TableBody/TableBody.jsx';
import createArrayTitles from '../../utils/createArrayTitles.js';
import addKeysToObjects from '../../utils/addKeysToObjects.js';
import createArrayBody from '../../utils/createArrayBody.js';
import Mapbox from '../Mapbox/Mapbox.jsx';

function Bulkupload() {
  const location = useLocation();

  const [selectedFile, setSelectedFile] = useState([]);
  const [tableTitles, setTableTitles] = useState([]);
  const [tableBody, setTableBody] = useState([]);
  const [viewState, setViewState] = useState({
    latitude: 43.2566700,
    longitude: 76.9286100,
    zoom: 11
  });
  const [ripData, setRipData] = useState([]);
  //Пагинация
  const [page, setPage] = useState(1);
  const [pageQuantity, setPageQuantity] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  //========

  const filePicker = useRef(null);

  //при загрузке файла, записываем в tableTitles массив заголовков, записываем в tableBody массив объектов после заголовков
  useEffect(() => {
    if (selectedFile.length > 0) {
      setTableTitles(createArrayTitles(selectedFile));
      setTableBody(createArrayBody(selectedFile));
    }
  }, [selectedFile]);

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

          setSelectedFile(addKeysToObjects(rows));
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

  function handleShowMarkers() {
    //при клике на кнопку собираем данные с файла selectedFile в стейт ripData
    if (selectedFile.length > 0) {
      const arr = selectedFile.slice(1);
      setRipData(arr);
      setViewState(prev => ({...prev, zoom: 3}));
    }
  }

  return (
    <div className="bulkUpload">
      <div className="bulkUpload__container">
        {/* есть якорная ссылка на элемент h2: */}
        <h2 className="bulkUpload__title" id="bulkUpload__title">RIP.kz</h2>
        <PageNavigation
          location={location}
        />
        <div className="bulkUpload__fileUpload-block">
          <button onClick={handlePickFile} className="bulkUpload__button">Выбрать файл</button>
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
        {
          (selectedFile.length>0) && (
            <>
              <table className="table">
                <thead>
                  <tr>
                    {
                      (tableTitles.length > 0) && tableTitles.sort().map((title, index) => {
                        return <TableTitle
                                key={index}
                                title={title[1]}
                              />
                      })
                    }
                  </tr>
                </thead>
                <tbody>
                  {
                    (tableBody.length > 0) && tableBody.map((body, index) => {
                      return <TableBody
                              key={index}
                              body={body}
                            />
                    })
                  }
                </tbody>
              </table>

              <button
                type="button"
                className="bulkUpload__button bulkUpload__button_type_margin"
                onClick={() => {
                  handleShowMarkers();
                  document.location.href = '#mapbox-map';
                }}
              >
                Показать на карте
              </button>
            </>
          )
        }
        <Mapbox
          viewState={viewState}
          setViewState={setViewState}
          ripData={ripData}
          location={location}
        />
      </div>
    </div>
  );
}

export default Bulkupload;