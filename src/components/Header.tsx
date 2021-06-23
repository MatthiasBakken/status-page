import React from 'react';

import badgerLogo from '../assets/badger_logo.png';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// import RssFeedIcon from '@material-ui/icons/RssFeed';

import '../styles/Header.css';


const HEADER = "header__";

const Header = () => {

  const subscribeHandler = () :void => {
    alert("This feature is coming soon")
  }

  return (
    <div className={`${HEADER}container`} data-testid={`${HEADER}container`}>
      <div className={`${HEADER}page-title`} data-testid={`${HEADER}page-title-container`}>
        <img src={badgerLogo} alt="badger-logo" className={`${HEADER}badger-logo`} data-testid={`${HEADER}badger-logo`} />
        <span className={`${HEADER}badger-status`} data-testid={`${HEADER}badger-title-link-container`}>
          <h1>Badger Status</h1>
          <a href="https://app.badger.finance/"><ArrowBackIcon className={`${HEADER}arrow-back`} /> Back to app</a>
        </span>
      </div>
      {/* <button className={`${HEADER}sub-button`} onClick={() => subscribeHandler()} data-testid={`${HEADER}subscribe-button`}>
        <RssFeedIcon className={`${HEADER}rss-feed-svg`}/> SUBSCRIBE TO ALL UPDATES
      </button> */}
    </div>
  )
}

export default Header;