import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import ControlPanel from '../ControlPanel/ControlPanel.jsx';
import Bulkupload from '../Bulkupload/Bulkupload.jsx';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <ControlPanel />
        </Route>

        <Route path="/bulkupload">
          <Bulkupload />
        </Route>
      </Switch>
      
    </>
  );
}

export default App;
