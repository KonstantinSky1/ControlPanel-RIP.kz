import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';

import ControlPanel from '../ControlPanel/ControlPanel.jsx';
import Bulkupload from '../Bulkupload/Bulkupload.jsx';
import Goods from '../Goods/Goods.jsx';
import Service from '../Service/Service.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ControlPanel />} />
        <Route path="/bulkupload" element={<Bulkupload />} />
        <Route path="/goods" element={<Goods />} />
        <Route path="/service" element={<Service />} />
      </Routes>
    </>
  );
}

export default App;
