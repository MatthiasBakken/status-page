import React, { useState, useEffect } from 'react';

import classNames from "classnames";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import StatusBarSub from "./StatusBarSub";
import { IApiHealthProps } from '../interfaces/interfaces';

import '../styles/StatusBarMain.css';


const STATUS = "status-bar__";

const StatusBarApi: React.FC<IApiHealthProps> = ( props ) => {

  const [ statusSub, setStatusSub ] = useState( false );

  const [ subState, setSubState ] = useState( [
    {
      error: false,
      name: ""
    }
  ] );

  const {api} = props;

  console.log( 'props api', props )
  
  useEffect( () => {
    let tempArr: { error: boolean; name: string;}[] = [];
    props.api.results.forEach( res => {
      tempArr.push( {
        error: res.isError,
        name: res.name
      } );
    } );
    setSubState( tempArr );
  }, [props.api])

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
            <h5>API</h5>
            <p onClick={toggleSubStatusBars} className={classNames( {
              'show-sub-status': statusSub
            } )}>{statusSub ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />} all endpoints</p>
          </section>
          {
            api?.error ? <ErrorOutlineIcon className={`${STATUS}error-icon`} /> : <CheckCircleOutlineIcon className={`${STATUS}check-icon`} />
          }
        </div>
        <div className={classNames( {
          'status-bar__sub': statusSub,
          'status-bar__sub-hidden': !statusSub
        } )}>
          <StatusBarSub {...subState}/>
        </div>
      </div>
    </div>
  );
};

export default StatusBarApi;