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
import api from '../../utils/Api.js';

function Bulkupload() {
  const location = useLocation();

  const filePicker = useRef(null);

  const [selectedFile, setSelectedFile] = useState([]);
  const [tableTitles, setTableTitles] = useState([]);
  const [tableBody, setTableBody] = useState([]);
  const [viewState, setViewState] = useState({
    latitude: 43.2566700,
    longitude: 76.9286100,
    zoom: 11
  });
  const [ripData, setRipData] = useState([]);
  const [ripSubmitData, setRipSubmitData] = useState([]);
  const [fileName, setfileName] = useState('');
  const [resetState, setResetState] = useState(false);
  const [disableSubmitButton, setDisableSubmitButton] = useState(false);

  //Пагинация
  const [page, setPage] = useState(1);
  const [pageQuantity, setPageQuantity] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const itemsPerPage = 10; // количество строк в таблице на каждой странице

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(tableBody.slice(itemOffset, endOffset));
    setPageQuantity(Math.ceil(tableBody.length / itemsPerPage));
  }, [tableBody, itemsPerPage, itemOffset]);

  function handleChangePage(num) {
    const newOffset = ((num-1) * itemsPerPage) % tableBody.length;

    setItemOffset(newOffset);
  }

  // Сброс файла
  useEffect(() => {
    if (resetState) {
      setSelectedFile([]);
      setTableTitles([]);
      setTableBody([]);
      setRipData([]);
      setRipSubmitData([]);
      setResetState(false);
      setfileName('');
      setPage(1);
      setPageQuantity(0);
      setItemOffset(0);
      setCurrentItems([]);
    }
  }, [resetState]);

  //при загрузке файла, записываем в tableTitles объект с индексом 0, и записываем в tableBody остальные объекты начиная с индекса 1
  useEffect(() => {
    if (selectedFile.length > 0) {
      setTableTitles(createArrayTitles(selectedFile));
      setTableBody(createArrayBody(selectedFile));
      setRipSubmitData(selectedFile.slice(1));
    }
  }, [selectedFile]);

  function handleImport(event) { //на onChange инпута получаем данные с файла Excel
    const files = event.target.files;

    if (files.length) {
      const file = files[0];
      setfileName(file.name); //название файла записываем в стейт fileName
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
  
 // показать маркеры на карте
  function handleShowMarkers() {
    //при клике на кнопку собираем данные (заголовок исключаем) с файла selectedFile в стейт ripData
    if (selectedFile.length > 0) {
      const arr = selectedFile.slice(1);
      setRipData(arr);
      setViewState(prev => ({...prev, zoom: 3}));
    }
  }

  function handleReset() {
    setResetState(true);
  }

  function bulkupload(submitData) {
     //блокируем кнопку сабмита
    setDisableSubmitButton(true);

    return api.postExcelData(submitData)
      .then(res => console.log(res))
      .catch(err => console.log(err))
      .finally(() => setDisableSubmitButton(false));
  }

   // отправка данных на сервер
  function handleSubmit(e) {
    e.preventDefault();

    bulkupload(ripSubmitData);
    handleReset();
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
          <button onClick={handleReset} className="bulkUpload__button bulkUpload__button_type_left-margin">Сбросить</button>
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
        {/* Таблица с пагинацией: */}
        {
          (selectedFile.length>0) && (
            <>
              <p>Название файла: <span className="filename">{fileName}</span></p>
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
                    // currentItems - это slice от tableBody для Пагинации
                    (currentItems.length > 0) && currentItems.map((body, index) => {
                      return <TableBody
                              key={index}
                              body={body}
                            />
                    })
                  }
                </tbody>
              </table>
              {/* Пагинация */}
              {
                !!pageQuantity && (
                  <Pagination
                    count={pageQuantity}
                    page={page}
                    size="small"
                    sx={{
                      marginX: 'auto',
                      marginY: 2,
                      width: 'fit-content'
                    }}
                    onChange={(_, num) => {
                      handleChangePage(num)
                      setPage(num)}}
                  />
                )
              }

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
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={disableSubmitButton}
                className="bulkUpload__button bulkUpload__button_type_left-margin"
              >
                Отправить на сервер
              </button>
            </>
          )
        }
        {/* Карта MapBox: */}
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