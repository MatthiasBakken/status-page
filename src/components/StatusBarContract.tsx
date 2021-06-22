import React, { useState, useEffect } from 'react';

import classNames from "classnames";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import StatusBarSub from "./StatusBarSub";
import { IContractProps } from "../interfaces/interfaces";

import '../styles/StatusBarMain.css';


const STATUS = "status-bar__";

const StatusBarContract: React.FC<IContractProps> = ( props ) => {

  const [ statusSub, setStatusSub ] = useState( false );

  const [ subState, setSubState ] = useState( [
    {
      error: false,
      name: ""
    }
  ] );

  const { contract } = props;

  useEffect( () => {
    let tempArr: { error: boolean; name: string; }[] = [];
    props.contract.results[ 0 ].contractResults.forEach( res => {
      tempArr.push( {
        error: res.error.isError,
        name: res.name
      } );
    } );
    if ( props.contract.results[ 1 ] ) {
      props.contract.results[ 1 ].contractResults.forEach( res => {
      tempArr.push( {
        error: res.error.isError,
        name: res.name
      } );
    } );
    }
    setSubState( tempArr );
  }, [ props.contract ] );

  console.log('props contract', props)

  const toggleSubStatusBars = () => {
    setStatusSub( !statusSub );
  };

  return (
    <div className={`${STATUS}container ${STATUS}container-bottom`}>
      <div className={classNames( {
        'status-bar__main': true
      } )}>
        <div className={`${STATUS}endpoint-main-container`}>
          <section>
            <h5>Contracts</h5>
            <p onClick={toggleSubStatusBars} className={classNames( {
              'show-sub-status': statusSub
            } )}>{statusSub ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />} all endpoints</p>
          </section>
          {
            contract?.error ? <ErrorOutlineIcon className={`${STATUS}error-icon`} /> : <CheckCircleOutlineIcon className={`${STATUS}check-icon`} />
          }
        </div>
        <div className={classNames( {
          'status-bar__sub': statusSub,
          'status-bar__sub-hidden': !statusSub
        } )}>
          <StatusBarSub {...subState} />
        </div>
      </div>
    </div>
  );
};

export default StatusBarContract;