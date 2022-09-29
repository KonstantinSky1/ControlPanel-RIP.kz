import React, { useState, useEffect } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';
import './ControlPanel.css';

import { useFormWithValidation } from '../../hooks/UseForm.js';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';
import generateUniqId from '../../utils/generateUniqId.js';
import Map, { Marker, Popup } from 'react-map-gl';
import markerPic from '../../images/icons/iconMarker.png';

function ControlPanel() {
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
  const [selectedPost, setSelectedPost] = useState(null);
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
  const [drag, setDrag] = useState(false);
  const [file, setFile] = useState([]);
  console.log("🚀 ~ file: ControlPanel.jsx ~ line 58 ~ ControlPanel ~ file", file)

  useEffect(() => {
    const handleClosePopup = (event) => {
      if (event.key === "Escape") {
        setSelectedPost(null);
      }
    }

    window.addEventListener('keydown', handleClosePopup);

    return () => {
      window.removeEventListener('keydown', handleClosePopup);
    }
  }, []);

  function dragStartHandler(e) {
    e.preventDefault();

    setDrag(true);
  }

  function dragLeaveHandler(e) {
    e.preventDefault();

    setDrag(false);
  }

  function onDropHandler(e) {
    e.preventDefault();

    let file = [...e.dataTransfer.files];

    setFile([file[0]]);
    setDrag(false);
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

    let fileImage = file;
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
    // также можно отправлять на сервер все данные через formData

    setViewState({
      latitude: +cemetery_coordinates_latitude,
      longitude: +cemetery_coordinates_longitude
    });
    
    resetForm();
  }

  return (
    <div className="controlPanel">
      <div className="controlPanel__container">
        <h2 className="controlPanel__title">RIP.kz</h2>
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
                className="controlPanel__form-input"
                onChange={handleChange}
                value={values.burial_coordinates_latitude}
                type="text"
                name="burial_coordinates_latitude"
                placeholder="Введите в формате: ХХ.ХХХХХХХ"
                minLength="1"
                required
              />
              <ErrorMessage
                errorMessage={errors.burial_coordinates_latitude}
                style={errorInputStyle}
              />
            </label>

            <label className="controlPanel__form-label">
              <span className="controlPanel__form-label-span">Координаты кладбища долгота:</span>
              <input
                className="controlPanel__form-input"
                onChange={handleChange}
                value={values.burial_coordinates_longitude}
                type="text"
                name="burial_coordinates_longitude"
                placeholder="Введите в формате: ХХ.ХХХХХХХ"
                minLength="1"
                required
              />
              <ErrorMessage
                errorMessage={errors.burial_coordinates_longitude}
                style={errorInputStyle}
              />
            </label>

            <label className="controlPanel__form-label">
              <span className="controlPanel__form-label-span">Координаты захоронении широта:</span>
              <input
                className="controlPanel__form-input"
                onChange={handleChange}
                value={values.cemetery_coordinates_latitude}
                type="text"
                name="cemetery_coordinates_latitude"
                placeholder="Введите в формате: ХХ.ХХХХХХХ"
                minLength="1"
                required
              />
              <ErrorMessage
                errorMessage={errors.cemetery_coordinates_latitude}
                style={errorInputStyle}
              />
            </label>

            <label className="controlPanel__form-label">
              <span className="controlPanel__form-label-span">Координаты захоронении долгота:</span>
              <input
                className="controlPanel__form-input"
                onChange={handleChange}
                value={values.cemetery_coordinates_longitude}
                type="text"
                name="cemetery_coordinates_longitude"
                placeholder="Введите в формате: ХХ.ХХХХХХХ"
                minLength="1"
                required
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
              {
                (file.length === 0)
                ? (drag
                    ? <div
                        className="controlPanel__form-drop-area"
                        onDragStart={(e) => dragStartHandler(e)}
                        onDragLeave={(e) => dragLeaveHandler(e)}
                        onDragOver={(e) => dragStartHandler(e)}
                        onDrop={(e) => onDropHandler(e)}
                      >
                        Отпустите файл
                      </div>
                    : <div
                        className="controlPanel__form-drop-area"
                        onDragStart={(e) => dragStartHandler(e)}
                        onDragLeave={(e) => dragLeaveHandler(e)}
                        onDragOver={(e) => dragStartHandler(e)}
                      >
                        Перетащите файл, чтобы загрузить
                      </div>)
                : <div className="controlPanel__form-drop-area">
                    <img src={file[0]} alt="Фото" />
                  </div>
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

        <div className="mapbox-block">
          <Map
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            style={{width: '100%', height: '100vh'}}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken="pk.eyJ1Ijoia29uc3RhbnRpbnNreSIsImEiOiJjbDhiYW8zNDQwcDBjM3FuM3MwMXg3MDBqIn0.4WDqm5CpXmykKPm_b1W-LA"
            id="mapbox-map"
          >
            <Marker
              longitude={ripData.cemetery_coordinates_longitude}
              latitude={ripData.cemetery_coordinates_latitude}
              anchor="bottom"
            >
              <button
                onClick={(e) => setSelectedPost(ripData)}
                type="button"
                className="markerButton"
              >
                <img
                  src={markerPic}
                  alt="Marker Icon"
                />
              </button>
            </Marker>
            {
              selectedPost ? (
                <Popup
                  closeOnClick={false}
                  longitude={ripData.cemetery_coordinates_longitude}
                  latitude={ripData.cemetery_coordinates_latitude}
                  onClose={() => setSelectedPost(null)}
                >
                  <div className="popup">
                    <div className="popup__text-block">
                      <div className="popup__text-block-title">
                        <p>Имя:</p>
                        <p className="popup__text">{ripData.name}</p>
                      </div>
                      <div className="popup__text-block-title">
                        <p>Фамилия:</p>
                        <p className="popup__text">{ripData.surname}</p>
                      </div>
                      <div className="popup__text-block-title">
                        <p>Дата рождения:</p>
                        <p className="popup__text">{ripData.birthday}</p>
                      </div>
                      <div className="popup__text-block-title">
                        <p>Дата смерти:</p>
                        <p className="popup__text">{ripData.date_of_death}</p>
                      </div>
                      <p className="popup__small-text">id: {ripData.id}</p>
                    </div>
                    <button type="button" className="popup__button-route">Проложить маршрут</button>
                  </div>
                </Popup>
              ) : null
            }
          </Map>
          <a href="#controlPanel-form" className="link-up"></a>
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;
