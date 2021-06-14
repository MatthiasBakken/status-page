import React, { useEffect, useState } from 'react';

import { IInitialState } from "../interfaces/interfaces";

import '../styles/Alert.css';


interface IProps {
  alert: IInitialState;
}

const Alert: React.FC<IProps> = (props) => {
  console.log( props );

  return (
    <div>
      Hello from Alert
    </div>
  )
}

export default Alert;