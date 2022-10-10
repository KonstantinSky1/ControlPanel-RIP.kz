import React, { useState, useRef } from 'react';
import { useLocation } from "react-router-dom";

import './Goods.css';

import { useFormWithValidation } from '../../hooks/UseForm.js';

import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';
import PageNavigation from '../PageNavigation/PageNavigation.jsx';

function Goods() {
  const location = useLocation();

  const defaultData = {
    name: '',
    description: '',
    price: '',
    short_description: '',
    about_provider: ''
  };

  const errorInputStyle = {
    fontSize: '.8em',
    color: 'red'
  }

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation(defaultData);

  const filePicker = useRef(null);

  const [selectStatus, setSelectStatus] = useState('Ислам');
  const [availability, setAvailability] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(null);

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
    console.log(availability)
    console.log(selectedFiles)

    //Сбрасываем данные формы после сабмита:
    resetForm();
    setSelectStatus('Ислам');
    setAvailability(false);
    setSelectedFiles(null);
  }

  return (
    <div className="goods">
      <div className="goods__container">
        <h2 className="goods__title">Добавить товар</h2>
        <PageNavigation
          location={location}
        />
        <form
          onSubmit={handleSubmit}
          noValidate
          className="goods__form"
          name="goods-form"
          id="goods-form"
        >
          <div className="goods__form-inputs-block">
            <label className="goods__form-label">
              <span className="goods__form-label-span">Наименование<span className="color-red">*</span>:</span>
              <input
                className="goods__form-input"
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

            <div className="goods__form-label">
              <p className="goods__form-label-span">Категории:</p>
              <select value={selectStatus} onChange={(event) => {setSelectStatus(event.target.value)}}>
                <option value="Ислам">Ислам</option>
                <option value="Христианство">Христианство</option>
                <option value="Иудаизм">Иудаизм</option>
              </select>
            </div>

            <label className="goods__form-label">
              <span className="goods__form-label-span">Описание:</span>
              <textarea
                className="goods__form-input goods__form-textarea"
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

            <label className="goods__form-label">
              <span className="goods__form-label-span">Стоимость<span className="color-red">*</span>:</span>
              <input
                className="goods__form-input goods__form-input_type_number"
                onChange={handleChange}
                value={values.price}
                type="number"
                name="price"
                placeholder="Стоимость..."
                required
              />
              <ErrorMessage
                errorMessage={errors.price}
                style={errorInputStyle}
              />
            </label>

            <label className="goods__form-label">
              <span className="goods__form-label-span">Краткое описание:</span>
              <textarea
                className="goods__form-input goods__form-textarea"
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

            <label className="goods__form-label">
              <span className="goods__form-label-span">О поставщике:</span>
              <textarea
                className="goods__form-input goods__form-textarea"
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

            <label className="goods__form-label">
              <span className="goods__form-label-span goods__form-label-span_type_display">Наличие:</span>
              <input
                type="checkbox"
                name="availability"
                checked={availability}
                value={availability}
                onChange={(event) => {setAvailability(event.target.checked)}}
              />
            </label>

            <div className="goods__form-image-block">
              <button onClick={handlePickFile} className="goods__form-pickfile-button">Выбрать файл</button>
              <input
                className="goods__form-fileInput-hidden"
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
                            className="goods__form-image"
                            key={index}
                          />
                })
              }
            </div>
          </div>
          <div className="goods__form-submit-button-block">
            <button
              disabled={!isValid}
              className="goods__form-submit-button"
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

export default Goods;