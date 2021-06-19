import React, { useState } from 'react';

import classNames from "classnames";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import StatusBarSub from "./StatusBarSub";
import { IHealthCheckProps } from "../interfaces/interfaces";

import '../styles/StatusBarMain.css';
// /provider
// /contract - no subs for contract
// /api
// /subgraph



const STATUS = "status-bar__";

const StatusBarMain: React.FC<IHealthCheckProps> = ( props ) => {

  const [ statusSub, setStatusSub ] = useState( false );

  const [ statusData, setStatusData ] = useState( props );

  const toggleSubStatusBars = () => {
    setStatusSub( !statusSub );
  };

  return (
    <div className={classNames( {
      'status-bar__container': true
    } )}>
      <div className={classNames( {
        'status-bar__main': true
      } )}>
        <div className={`${STATUS}endpoint-main-container`}>
          <section>
            <h5>{statusData.name}</h5>
            <p onClick={toggleSubStatusBars} className={classNames( {
              'show-sub-status': statusSub
            } )}>{statusSub ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />} all endpoints</p>
          </section>
          {
            statusData.error ? <ErrorOutlineIcon className={`${STATUS}error-icon`} /> : <CheckCircleOutlineIcon className={`${STATUS}check-icon`} />
          }
        </div>
        <div className={classNames( {
          'status-bar__sub': statusSub,
          'status-bar__sub-hidden': !statusSub
        } )}>
          <StatusBarSub />
        </div>
      </div>
    </div>
  );
};

export default StatusBarMain;