import React, { useEffect, useState } from 'react';

import classNames from 'classnames';

import { IInitialState } from "../interfaces/interfaces";

import '../styles/Alert.css';


interface IProps {
  alert: IInitialState;
}

interface IAlertEvents {
  id: string;
  status: string;
  title: string;
  description: string;
  date: Date;
}

const ALERT = "alert__";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const Alert: React.FC<IProps> = ( props ) => {
  console.log( props );

  const [ alert, setAlert ] = useState( props.alert );

  const alertContainer = classNames( {
    'alert__container-notice': alert.status === 'Notice',
    'alert__container-resolved': alert.status === 'Resolved',
    'alert__container': true
  } );

  const statusTitleContainer = classNames( {
    'alert__status-title-container': true,
    'alert__status-title-container-resolved': alert.status === "Resolved",
    'alert__status-title-container-notice': alert.events[ 0 ].status === "Notice"
  } );

  return (
    <div className={alertContainer} >
      <div className={`${ALERT}content`}>
        <span className={statusTitleContainer}>
          <p>{`${alert.status}`}</p>
          <h4>{`${alert.title}`}</h4>
        </span>
        <div className={`${ALERT}events-container`}>
          {
            alert.events.map( ( alertEvent: IAlertEvents ): JSX.Element => {
              const date = alertEvent.date;
              const hours = date.getUTCHours();
              const minutes = date.getUTCMinutes();
              let time: string = `${hours}:${minutes}`;
              if ( minutes < 10 && hours < 10 ) {
                time = `0${hours}:0${minutes}`;
              } else if ( minutes < 10 ) {
                time = `${hours}:0${minutes}`;
              } else if ( hours < 10 ) {
                time = `0${hours}:${minutes}`;
              }
              return (
                <div
                  key={alertEvent.id}
                  className={
                    classNames( {
                      'alert__event': true,
                      'alert__event-resolved': alertEvent.status === "Resolved",
                      'alert__event-notice': alertEvent.status === "Notice"
                    } )}>
                  <p>{alertEvent.description}</p>
                  <p>{`${months[ date.getUTCMonth() ]} ${date.getUTCDate()}, ${date.getUTCFullYear()} @ ${time} UTC`}</p>
                </div>
              );
            }
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Alert;