import React from 'react';

import './ControlPanel.css';

import { useFormWithValidation } from '../../hooks/UseForm.js';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';

function ControlPanel() {
  const defaultData = {
    name: '',
    surname: '',
    birthday: '',
    description: '',
    causeofdeath: ''
  };

  const errorInputStyle = {
    fontSize: '.8em',
    color: 'red'
  }

  const { values, handleChange, errors } = useFormWithValidation(defaultData);
  console.log("🚀 ~ file: ControlPanel.jsx ~ line 21 ~ ControlPanel ~ values", values)

  return (
    <div className="controlPanel">
      <div className="controlPanel__container">
        <form
          noValidate
          className="controlPanel__form"
          name="controlPanel-form"
        >
          <label className="controlPanel__form-label">
            <span className="controlPanel__form-label-span">Имя:</span>
            <input
              className="controlPanel__form-input"
              onChange={handleChange}
              value={values.name}
              type="text"
              name="name"
              placeholder="Введите имя..."
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
              placeholder="Введите фамилию..."
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
              placeholder="Введите дату рождения..."
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
              type="еуче"
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

        </form>
      </div>
      
    </div>
  );
}

export default ControlPanel;
