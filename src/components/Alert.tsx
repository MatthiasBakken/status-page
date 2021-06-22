import React, { useState } from 'react';

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

const getTime = (date: Date): string => {
  const dateTime = date;
  const hours = dateTime.getUTCHours();
  const minutes = dateTime.getUTCMinutes();
  let time: string = `${hours}:${minutes}`;
  if ( minutes < 10 && hours < 10 ) {
    time = `0${hours}:0${minutes}`;
  } else if ( minutes < 10 ) {
    time = `${hours}:0${minutes}`;
  } else if ( hours < 10 ) {
    time = `0${hours}:${minutes}`;
  }
  return time;
}

const Alert: React.FC<IProps> = ( props ) => {

  const [ alert ] = useState( props.alert );

  const alertContainer = classNames( {
    'alert__container-notice': alert.status === 'Notice',
    'alert__container-resolved': alert.status === 'Resolved',
    'alert__container': true
  } );

  const statusTitleContainer = classNames( {
    'alert__status-title-container': true,
    'alert__status-title-container-resolved': alert.status === "Resolved",
    'alert__status-title-container-notice': alert.status === "Notice"
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
              const time = getTime( alertEvent.date );
              const date = alertEvent.date;
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