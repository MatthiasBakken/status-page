import React from 'react';

import '../styles/BadgerUptime.css';


const UPTIME = "badger-uptime__";

const BadgerUptime = () => {

  return (
    <div className={`${UPTIME}container`}>
      <div className={`${UPTIME}upper-content`}>
        <h3 className={`${UPTIME}title`}>Badger Uptime</h3>
        <p className={`${UPTIME}description`}>Status, incident and maintenance information for Badger</p>
      </div>
      <div className={`${UPTIME}status-container`}>
        Status Bars go Here
      </div>
    </div>
  );
};

export default BadgerUptime;