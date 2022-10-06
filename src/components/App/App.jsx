import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';

import ControlPanel from '../ControlPanel/ControlPanel.jsx';
import Bulkupload from '../Bulkupload/Bulkupload.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ControlPanel />} />
        <Route path="/bulkupload" element={<Bulkupload />} />
      </Routes>
    </>
  );
}

export default App;
