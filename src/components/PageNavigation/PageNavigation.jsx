import React from 'react';
import { Link } from "react-router-dom";

import './PageNavigation.css';

function PageNavigation({ location }) {
  return (
      <div className="page-navigation">
        <Link to="/" className={`page-navigation__link ${location.pathname === '/' && "disabled-navigation-link"}`}>
          <span className="register__linkText">Загрузить одну</span>
        </Link>
        <p className="page-navigation__slash">/</p>
        <Link to="/bulkupload" className={`page-navigation__link ${location.pathname === '/bulkupload' && "disabled-navigation-link"}`}>
          <span className="register__linkText">Загрузить много</span>
        </Link>
        <p className="page-navigation__slash">/</p>
        <Link to="/goods" className={`page-navigation__link ${location.pathname === '/goods' && "disabled-navigation-link"}`}>
          <span className="register__linkText">Добавить товар</span>
        </Link>
        <p className="page-navigation__slash">/</p>
        <Link to="/service" className={`page-navigation__link ${location.pathname === '/service' && "disabled-navigation-link"}`}>
          <span className="register__linkText">Добавить услугу</span>
        </Link>
      </div>
  );
}

export default PageNavigation;