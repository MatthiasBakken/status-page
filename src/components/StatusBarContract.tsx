import React, { useState, useEffect } from 'react';

import classNames from "classnames";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import StatusBarSub from "./StatusBarSub";
import { IContractProps,  TStatusBarSub } from "../interfaces/interfaces";

import '../styles/StatusBarMain.css';


const STATUS = "status-bar__";

const StatusBarContract: React.FC<IContractProps> = ( props ) => {

  const [ statusSub, setStatusSub ] = useState( false );

  const [ subState, setSubState ] = useState<TStatusBarSub[]>( [
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

  const toggleSubStatusBars = () => {
    setStatusSub( !statusSub );
  };

  return (
    <div className={classNames( {
      'status-bar__container': true,
      'status-bar__container-error': contract.error,
      'status-bar__container-ok': !contract.error,
      'status-bar__container-bottom': true
    } )}>
      <div className={classNames( {
        'status-bar__main': true
      } )}>
        <div className={`${STATUS}endpoint-main-container`}>
          <section>
            <h5>Contracts</h5>
            <p onClick={toggleSubStatusBars} className={classNames( {
              'show-sub-status': statusSub
            } )}>{statusSub ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />} all contracts</p>
          </section>
          {
            contract?.error ? <ErrorOutlineIcon className={`${STATUS}error-icon`} /> : <CheckCircleOutlineIcon className={`${STATUS}check-icon`} />
          }
        </div>
        <div className={classNames( {
          'status-bar__sub': statusSub,
          'status-bar__sub-hidden': !statusSub
        } )}>
          <StatusBarSub subState={subState} />
        </div>
      </div>
    </div>
  );
};

export default StatusBarContract;