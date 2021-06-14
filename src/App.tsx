import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from "./components/Header";
import Alert from "./components/Alert";

import { IInitialState } from "./interfaces/interfaces";

import './styles/App.css';


const initialState: IInitialState = {
  status: "Resolved",
  title: "Degraded performance on Binance Smart Chain due to BSC nodes",
  events: [
    {
      status: "Resolved",
      title: "The issue has been identified and a fix has been implemented.",
      date: new Date(),
    },
    {
      status: "Notice",
      title: "Partial Outage on BSC node.",
      date: new Date(),
    }
  ]
};

function App () {
  
  const [ alert, setAlert ] = useState(initialState)

  return (
    <div className="App">
      <Header />
      <Alert alert={alert}/>
      <Switch>
      </Switch>
    </div>
  );
}

export default App;
