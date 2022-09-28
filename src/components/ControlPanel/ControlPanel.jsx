import React from 'react';

import './ControlPanel.css';

import { useFormWithValidation } from '../../hooks/UseForm.js';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';

function ControlPanel() {
  const defaultData = { // сейчас все vulues инпутов это строки. Надо ли менять ?
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

  const { values, handleChange, errors, isValid } = useFormWithValidation(defaultData);

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

    console.log(name,
      surname,
      birthday,
      description,
      cause_of_death,
      date_of_death,
      burial_coordinates_latitude,
      burial_coordinates_longitude,
      cemetery_coordinates_latitude,
      cemetery_coordinates_longitude,
      cemetry_description);
  }

  return (
    <div className="controlPanel">
      <div className="controlPanel__container">
        <h2 className="controlPanel__title">RIP.kz</h2>
        <form
          onSubmit={handleSubmit}
          noValidate
          className="controlPanel__form"
          name="controlPanel-form"
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
                minLength="1"
                required
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
                minLength="1"
                required
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
                minLength="1"
                required
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
                minLength="1"
                required
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
                minLength="1"
                required
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
                minLength="1"
                required
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
                minLength="1"
                required
              >
              </textarea>
              <ErrorMessage
                errorMessage={errors.cemetry_description}
                style={errorInputStyle}
              />
            </label>
          </div>

          <div className="controlPanel__form-submit-button-block">
            <button
              disabled={!isValid}
              className="controlPanel__form-submit-button"
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

export default ControlPanel;
