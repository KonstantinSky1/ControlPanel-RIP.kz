import React from 'react';
import { Link } from "react-router-dom";

import './PageNavigation.css';

function PageNavigation({ location }) {
  return (
      <div className="page-navigation">
        <Link to="/conrolpanel" className={`page-navigation__link ${location.pathname === '/conrolpanel' && "disabled-navigation-link"}`}>
          <span className="register__linkText">Загрузить одну</span>
        </Link>
        <p className="page-navigation__slash">/</p>
        <Link to="/bulkupload" className={`page-navigation__link ${location.pathname === '/bulkupload' && "disabled-navigation-link"}`}>
          <span className="register__linkText">Загрузить много</span>
        </Link>
      </div>
  );
}

export default PageNavigation;