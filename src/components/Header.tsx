import React from 'react';

import badgerLogo from '../assets/badger_logo.png';
import leftArrow from '../assets/west_black_24dp.svg';

import '../styles/Header.css';


const HEADER = "header__";

const Header = () => {

  const subscribeHandler = () :void => {
    alert("This feature is coming soon")
  }

  return (
    <div className={`${HEADER}container`}>
      <div className={`${HEADER}page-title`}>
        <img src={badgerLogo} alt="badger-logo" style={{ height: "50px", width: "50px" }} />
        <span className={`${HEADER}badger-status`}>
          <h1>Badger Status</h1>
          <a href="https://app.badger.finance/"><img src={leftArrow} alt="left arrow" /> Back to app</a>
        </span>
      </div>
      <button className={`${HEADER}sub-button`} onClick={() => subscribeHandler()}>
        <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 24 24" width="16px" fill="#000000" className={`${HEADER}rss-feed-svg`}>
          <path d="M0 0h24v24H0V0z" fill="none" /><circle cx="6.18" cy="17.82" r="2.18" />
          <path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z" />
        </svg>SUBSCRIBE TO ALL UPDATES
      </button>
    </div>
  )
}

export default Header;