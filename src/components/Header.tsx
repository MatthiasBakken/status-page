import React from 'react';

import badgerLogo from '../assets/badger_logo.png';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import '../styles/Header.css';


const HEADER = "header__";

const Header = () => {

  return (
    <div className={`${HEADER}container`} data-testid={`${HEADER}container`}>
      <div className={`${HEADER}page-title`} data-testid={`${HEADER}page-title-container`}>
        <img src={badgerLogo} alt="badger-logo" className={`${HEADER}badger-logo`} data-testid={`${HEADER}badger-logo`} />
        <span className={`${HEADER}badger-status`} data-testid={`${HEADER}badger-title-link-container`}>
          <h1>Badger Status</h1>
          <a href="https://app.badger.finance/"><ArrowBackIcon className={`${HEADER}arrow-back`} /> Back to app</a>
        </span>
      </div>
    </div>
  )
}

export default Header;