import React from 'react';

import classNames from "classnames";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import { IHealthCheckProps } from "../interfaces/interfaces";

import '../styles/StatusBarMain.css';


const STATUS = "status-bar__";

const StatusBarMain: React.FC<IHealthCheckProps> = ( props ) => {

  const { name, provider, api, subgraph, contract } = props;

  return (
    <div className={classNames( {
      'status-bar__container': true,
      'status-bar__container-top': true,
      'status-bar__container-error': provider?.error && api?.error && subgraph?.error && contract?.error,
      'status-bar__container-ok': !(provider?.error && api?.error && subgraph?.error && contract?.error)
    }) }>
      <div className={classNames( {
        'status-bar__main': true
      } )}>
        <div className={`${STATUS}endpoint-main-container`}>
          <section>
            <h5>{name}</h5>
          </section>
          {
            provider?.error && api?.error && subgraph?.error && contract?.error ? <ErrorOutlineIcon className={`${STATUS}error-icon`} /> : <CheckCircleOutlineIcon className={`${STATUS}check-icon`} />
          }
        </div>
        <div className={classNames( {
          'status-bar__sub': false,
          'status-bar__sub-hidden': true
        } )}>
        </div>
      </div>
    </div>
  );
};

export default StatusBarMain;