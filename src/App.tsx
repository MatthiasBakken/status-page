import React from 'react';

import Header from "./components/Header";
import BadgerUptime from './components/BadgerUptime';

import './styles/App.css';


function App () {

  return (
    <div className="App">
      <Header />
      <BadgerUptime />
    </div>
  );
}

export default App;
