import React, { useState, useEffect } from 'react';

import classNames from "classnames";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import StatusBarSub from "./StatusBarSub";
import { ISubgraphProps } from "../interfaces/interfaces";

import '../styles/StatusBarMain.css';


const STATUS = "status-bar__";

const StatusBarSubgraph: React.FC<ISubgraphProps> = ( props ) => {

  const [ statusSub, setStatusSub ] = useState( false );

  const [ subState, setSubState ] = useState( [
    {
      error: false,
      name: ""
    }
  ] );

  const { subgraph } = props;

  console.log( 'props subgraph', props )
  
  useEffect( () => {
    let tempArr: { error: boolean; name: string;}[] = [];
    props.subgraph.results.forEach( res => {
      tempArr.push( {
        error: res.isError,
        name: res.subgraph.name
      } );
    } );
    setSubState( tempArr );
  }, [ props.subgraph ] );

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
            <h5>Subgraphs</h5>
            <p onClick={toggleSubStatusBars} className={classNames( {
              'show-sub-status': statusSub
            } )}>{statusSub ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />} all subgraphs</p>
          </section>
          {
            subgraph?.error ? <ErrorOutlineIcon className={`${STATUS}error-icon`} /> : <CheckCircleOutlineIcon className={`${STATUS}check-icon`} />
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

export default StatusBarSubgraph;