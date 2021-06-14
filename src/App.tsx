import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from "./components/Header";
import Alert from "./components/Alert";

import { IInitialState } from "./interfaces/interfaces";

import './styles/App.css';


const initialState: IInitialState = {
  id: "sdlkj3-sldfie-2489cs8-3sdfiK",
  status: "Resolved",
  title: "Degraded performance on Binance Smart Chain due to BSC nodes",
  description: "The issue has been identified and a fix has been implemented.",
  events: [
    {
      id: "sdlkj3-sldfie-2489cs8-3sdf3K",
      status: "Resolved",
      title: "Degraded performance on Binance Smart Chain due to BSC nodes.",
      description: "The issue has been identified and a fix has been implemented.",
      date: new Date(),
    },
    {
      id: "sdlkj3-sldfie-2429cs8-3sPfiK",
      status: "Notice",
      title: "Degraded performance on Binance Smart Chain due to BSC nodes.",
      description: "We encountered an issue",
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
