import React from 'react';

import '../styles/StatusBarSub.css';
import { IStatusBarSub } from '../interfaces/interfaces';


const StatusBarSub: React.FC<IStatusBarSub[]> = ( props ) => {

  console.log( 'props bar sub: ', props );
  return (
    <div>
      Hello
    </div>
  );
};

export default StatusBarSub;