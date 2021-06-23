import React, { useState, useEffect } from 'react';

import { IStatusBarSubProps, TStatusBarSub } from '../interfaces/interfaces';

import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import '../styles/StatusBarSub.css';
import classNames from 'classnames';


const SUB = "status-sub__";

const StatusBarSub: React.FC<IStatusBarSubProps> = ( {subState, ...props} ) => {

  const [ sub, setSub ] = useState<TStatusBarSub[]>( [ {
    error: false,
    name: "loading"
  } ] );

  useEffect( () => {
    setSub( subState );
  }, [props])

  return (
    <div className={`${SUB}container`}>
      {
        sub.map(sub => {
          return (
            <div key={sub.name} className={`${SUB}bar`}>
              <div className={classNames( {
                'status-sub__content': true,
                'status-sub__content-ok': !sub.error,
                'status-sub__content-error': sub.error
              })}>
                <p>{sub.name}</p>
                {sub.error ? <ErrorOutlineIcon className={`${SUB}error-icon`} /> : <CheckCircleOutlineIcon className={`${SUB}check-icon`} />}
              </div>
            </div>
          )
        })
      }
    </div>
  );
};

export default StatusBarSub;