import React, { useRef, useState } from 'react';
import { useLocation } from "react-router-dom";

import './Service.css';

import PageNavigation from '../PageNavigation/PageNavigation.jsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';
import { useFormWithValidation } from '../../hooks/UseForm.js';

function Service() {
  const location = useLocation();

  const defaultData = {
    name: '',
    description: '',
    short_description: '',
    about_provider: ''
  };

  const errorInputStyle = {
    fontSize: '.8em',
    color: 'red'
  }

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation(defaultData);

  const filePicker = useRef(null);

  const [selectedFiles, setSelectedFiles] = useState(null);
  const [selectStatus, setSelectStatus] = useState('Ислам');

  function handlePickFile(e) {
    e.preventDefault();
    filePicker.current.click();
  }

  function fileUploadHandleChange(e) {
    e.preventDefault();
    setSelectedFiles(e.target.files);
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log(values)
    console.log(selectStatus)
    console.log(selectedFiles)

    //Сбрасываем данные формы после сабмита:
    resetForm();
    setSelectStatus('Ислам');
    setSelectedFiles(null);
  }
  
  return (
    <div className="service">
      <div className="service__container">
        <h2 className="service__title">Добавить услугу</h2>
        <PageNavigation
          location={location}
        />
        <form
          onSubmit={handleSubmit}
          noValidate
          className="service__form"
          name="service-form"
          id="service-form"
        >
          <div className="service__form-inputs-block">
            <label className="service__form-label">
              <span className="service__form-label-span">Наименование<span className="color-red">*</span>:</span>
              <input
                className="service__form-input"
                onChange={handleChange}
                value={values.name}
                type="text"
                name="name"
                placeholder="Наименование..."
                required
              />
              <ErrorMessage
                errorMessage={errors.name}
                style={errorInputStyle}
              />
            </label>

            <div className="service__form-label">
              <p className="service__form-label-span">Категории:</p>
              <select value={selectStatus} onChange={(event) => {setSelectStatus(event.target.value)}}>
                <option value="Ислам">Ислам</option>
                <option value="Христианство">Христианство</option>
                <option value="Иудаизм">Иудаизм</option>
              </select>
            </div>

            <label className="service__form-label">
              <span className="service__form-label-span">Описание:</span>
              <textarea
                className="service__form-input service__form-textarea"
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

            <label className="service__form-label">
              <span className="service__form-label-span">Краткое описание:</span>
              <textarea
                className="service__form-input service__form-textarea"
                onChange={handleChange}
                value={values.short_description}
                type="text"
                name="short_description"
                placeholder="Краткое описание..."
              >
              </textarea>
              <ErrorMessage
                errorMessage={errors.short_description}
                style={errorInputStyle}
              />
            </label>

            <label className="service__form-label">
              <span className="service__form-label-span">О поставщике:</span>
              <textarea
                className="service__form-input service__form-textarea"
                onChange={handleChange}
                value={values.about_provider}
                type="text"
                name="about_provider"
                placeholder="О поставщике..."
              >
              </textarea>
              <ErrorMessage
                errorMessage={errors.about_provider}
                style={errorInputStyle}
              />
            </label>

            <div className="service__form-image-block">
              <button onClick={handlePickFile} className="service__form-pickfile-button">Выбрать файл</button>
              <input
                className="service__form-fileInput-hidden"
                ref={filePicker}
                type="file"
                onChange={fileUploadHandleChange}
                accept="image/*,.png,.jpg,.gif,.web"
                multiple
              />
              {
                (selectedFiles) &&
                  Array.from(selectedFiles).map((file, index) => {
                    return <img
                            src={URL.createObjectURL(file)}
                            alt="Картинка"
                            className="service__form-image"
                            key={index}
                          />
                })
              }
            </div>
          </div>
          <div className="service__form-submit-button-block">
            <button
              disabled={!isValid}
              className="service__form-submit-button"
              type="submit"
              style={!isValid ? {backgroundColor: '#b4b6b8', cursor: 'auto', opacity: '1'} : null}
            >
              Отправить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Service;