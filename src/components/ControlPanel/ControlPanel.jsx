import React, { useState, useRef } from 'react';
import { useLocation } from "react-router-dom";

import './ControlPanel.css';

import { useFormWithValidation } from '../../hooks/UseForm.js';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';
import generateUniqId from '../../utils/generateUniqId.js';
import PageNavigation from '../PageNavigation/PageNavigation.jsx';
import Mapbox from '../Mapbox/Mapbox.jsx';

function ControlPanel() {
  const regExCoordinates = "^[0-9-+.]*$";
  // const regExCoordinatesLongitude = "^[\-\+]?(0(\.\d{1,10})?|([1-9](\d)?)(\.\d{1,10})?|1[0-7]\d{1}(\.\d{1,10})?|180\.0{1,10})$";
  // const regExCoordinatesLatitude = "^[\-\+]?((0|([1-8]\d?))(\.\d{1,10})?|90(\.0{1,10})?)$";

  const location = useLocation();

  const defaultData = {
    name: '',
    surname: '',
    birthday: '',
    description: '',
    cause_of_death: '',
    date_of_death: '',
    burial_coordinates_latitude: '',
    burial_coordinates_longitude: '',
    cemetery_coordinates_latitude: '',
    cemetery_coordinates_longitude: '',
    cemetry_description: ''
  };

  const errorInputStyle = {
    fontSize: '.8em',
    color: 'red'
  }

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation(defaultData);

  const [uniqId, setUniqId] = useState(0);
  const [viewState, setViewState] = useState({
    latitude: 43.2566700,
    longitude: 76.9286100,
    zoom: 11
  });
  const [ripData, setRipData] = useState({
    name: '',
    surname: '',
    birthday: '',
    description: '',
    cause_of_death: '',
    date_of_death: '',
    burial_coordinates_latitude: 0,
    burial_coordinates_longitude: 0,
    cemetery_coordinates_latitude: 0,
    cemetery_coordinates_longitude: 0,
    cemetry_description: '',
    id: 0,
    file: []
  });
  const [selectedFile, setSelectedFile] = useState(null);

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

  function handleSubmit(event) {
    event.preventDefault();

    const {
      name,
      surname,
      birthday,
      description,
      cause_of_death,
      date_of_death,
      burial_coordinates_latitude,
      burial_coordinates_longitude,
      cemetery_coordinates_latitude,
      cemetery_coordinates_longitude,
      cemetry_description
    } = values;

    let fileImage = selectedFile;
    let id = generateUniqId();
    // добавить проверку: Если есть такой id в общей базе, то запустить функцию еще раз ?

    setUniqId(id);
    setRipData({
      name,
      surname,
      birthday,
      description,
      cause_of_death,
      date_of_death,
      burial_coordinates_latitude: +burial_coordinates_latitude,
      burial_coordinates_longitude: +burial_coordinates_longitude,
      cemetery_coordinates_latitude: +cemetery_coordinates_latitude,
      cemetery_coordinates_longitude: +cemetery_coordinates_longitude,
      cemetry_description,
      id,
      fileImage
    });
    // нужно отправлять на сервер все данные через formData!
    // т.к. файл не отправляется через JSON

    let formData = new FormData();
    // formData.append('fileImage', fileImage); //брать все данные с ripData

    setViewState({
      latitude: +cemetery_coordinates_latitude,
      longitude: +cemetery_coordinates_longitude
    });

    resetForm();
    setSelectedFile(null);
  }

  return (
    <div className="controlPanel">
      <div className="controlPanel__container">
        <h2 className="controlPanel__title">RIP.kz</h2>
        <PageNavigation
          location={location}
        />
        <form
          onSubmit={handleSubmit}
          noValidate
          className="controlPanel__form controlPanel__form_margin"
          name="controlPanel-form"
          id="controlPanel-form"
        >
          <div className="controlPanel__form-inputs-block">
            <label className="controlPanel__form-label">
              <span className="controlPanel__form-label-span">Имя:</span>
              <input
                className="controlPanel__form-input"
                onChange={handleChange}
                value={values.name}
                type="text"
                name="name"
                placeholder="Имя..."
              />
              <ErrorMessage
                errorMessage={errors.name}
                style={errorInputStyle}
              />
            </label>

            <label className="controlPanel__form-label">
              <span className="controlPanel__form-label-span">Фамилия:</span>
              <input
                className="controlPanel__form-input"
                onChange={handleChange}
                value={values.surname}
                type="text"
                name="surname"
                placeholder="Фамилия..."
              />
              <ErrorMessage
                errorMessage={errors.surname}
                style={errorInputStyle}
              />
            </label>

            <label className="controlPanel__form-label">
              <span className="controlPanel__form-label-span">Дата рождения:</span>
              <input
                className="controlPanel__form-input"
                onChange={handleChange}
                value={values.birthday}
                type="date"
                name="birthday"
                placeholder="Дата рождения..."
              />
              <ErrorMessage
                errorMessage={errors.birthday}
                style={errorInputStyle}
              />
            </label>

            <label className="controlPanel__form-label">
              <span className="controlPanel__form-label-span">Описание:</span>
              <textarea
                className="controlPanel__form-input controlPanel__form-textarea"
                onChange={handleChange}
                value={values.description}
                type="text"
                name="description"
                placeholder="Описание..."
              >
              </textarea>
              <ErrorMessage
                errorMessage={errors.description}
                style={errorInputStyle}
              />
            </label>

            <label className="controlPanel__form-label">
              <span className="controlPanel__form-label-span">Причина смерти:</span>
              <textarea
                className="controlPanel__form-input controlPanel__form-textarea"
                onChange={handleChange}
                value={values.cause_of_death}
                type="text"
                name="cause_of_death"
                placeholder="Причина смерти..."
              >
              </textarea>
              <ErrorMessage
                errorMessage={errors.cause_of_death}
                style={errorInputStyle}
              />
            </label>

            <label className="controlPanel__form-label">
              <span className="controlPanel__form-label-span">Дата смерти:</span>
              <input
                className="controlPanel__form-input"
                onChange={handleChange}
                value={values.date_of_death}
                type="date"
                name="date_of_death"
                placeholder="Дата смерти..."
              />
              <ErrorMessage
                errorMessage={errors.date_of_death}
                style={errorInputStyle}
              />
            </label>

            <label className="controlPanel__form-label">
              <span className="controlPanel__form-label-span">Координаты кладбища широта:</span>
              <input
                className="controlPanel__form-input input-small-text"
                onChange={handleChange}
                value={values.burial_coordinates_latitude}
                type="text"
                name="burial_coordinates_latitude"
                placeholder="Введите в формате: ХХ.ХХХХХХХ (например: 43.2566700)"
                minLength="1"
                required
                pattern={regExCoordinates}
              />
              <ErrorMessage
                errorMessage={errors.burial_coordinates_latitude}
                style={errorInputStyle}
              />
            </label>

            <label className="controlPanel__form-label">
              <span className="controlPanel__form-label-span">Координаты кладбища долгота:</span>
              <input
                className="controlPanel__form-input input-small-text"
                onChange={handleChange}
                value={values.burial_coordinates_longitude}
                type="text"
                name="burial_coordinates_longitude"
                placeholder="Введите в формате: ХХ.ХХХХХХХ (например: 76.9286100)"
                minLength="1"
                required
                pattern={regExCoordinates}
              />
              <ErrorMessage
                errorMessage={errors.burial_coordinates_longitude}
                style={errorInputStyle}
              />
            </label>

            <label className="controlPanel__form-label">
              <span className="controlPanel__form-label-span">Координаты захоронения широта:</span>
              <input
                className="controlPanel__form-input input-small-text"
                onChange={handleChange}
                value={values.cemetery_coordinates_latitude}
                type="text"
                name="cemetery_coordinates_latitude"
                placeholder="Введите в формате: ХХ.ХХХХХХХ (например: 43.2566700)"
                minLength="1"
                required
                pattern={regExCoordinates}
              />
              <ErrorMessage
                errorMessage={errors.cemetery_coordinates_latitude}
                style={errorInputStyle}
              />
            </label>

            <label className="controlPanel__form-label">
              <span className="controlPanel__form-label-span">Координаты захоронения долгота:</span>
              <input
                className="controlPanel__form-input input-small-text"
                onChange={handleChange}
                value={values.cemetery_coordinates_longitude}
                type="text"
                name="cemetery_coordinates_longitude"
                placeholder="Введите в формате: ХХ.ХХХХХХХ (например: 76.9286100)"
                minLength="1"
                required
                pattern={regExCoordinates}
              />
              <ErrorMessage
                errorMessage={errors.cemetery_coordinates_longitude}
                style={errorInputStyle}
              />
            </label>

            <label className="controlPanel__form-label">
              <span className="controlPanel__form-label-span">Описание для захоронения:</span>
              <textarea
                className="controlPanel__form-input controlPanel__form-textarea"
                onChange={handleChange}
                value={values.cemetry_description}
                type="text"
                name="cemetry_description"
                placeholder="Описание для захоронения..."
              >
              </textarea>
              <ErrorMessage
                errorMessage={errors.cemetry_description}
                style={errorInputStyle}
              />
            </label>

            <div className="controlPanel__form-image-block">
              <button onClick={handlePickFile} className="controlPanel__form-pickfile-button">Выбрать файл</button>
              <input
                className="controlPanel__form-fileInput-hidden"
                ref={filePicker}
                type="file"
                onChange={fileUploadHandleChange}
                accept="image/*,.png,.jpg,.gif,.web"
              />

              {
                selectedFile && <img src={URL.createObjectURL(selectedFile)} alt="Фото" className="controlPanel__form-image"/>
              }
            </div>
          </div>
          <div className="controlPanel__form-submit-button-block">
            <button
              onClick={() => {document.location.href = '#mapbox-map'}}
              disabled={!isValid}
              className="controlPanel__form-submit-button"
              type="submit"
              style={!isValid ? {backgroundColor: '#b4b6b8', cursor: 'auto', opacity: '1'} : null}
            >
              Отправить
            </button>
          </div>
        </form>

        {
          !!uniqId && (<p className="controlPanel__uniqId-text">Ваш уникальный id: <span className="controlPanel__uniqId-number">{uniqId}</span></p>)
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

export default ControlPanel;