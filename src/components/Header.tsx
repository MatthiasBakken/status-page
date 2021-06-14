import React from 'react';

import badgerLogo from '../assets/badger_logo.png';
import leftArrow from '../assets/arrow_back_black_24dp.svg';
import rssFeed from '../assets/rss_feed.svg';

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
          <a href="https://app.badger.finance/"><img src={leftArrow} alt="left arrow" /> Back to app</a>
        </span>
      </div>
      <button className={`${HEADER}sub-button`} onClick={() => subscribeHandler()} data-testid={`${HEADER}subscribe-button`}>
        <img src={rssFeed} alt="rss-feed-svg" className={`${HEADER}rss-feed-svg`}/>SUBSCRIBE TO ALL UPDATES
      </button>
    </div>
  )
}

export default Header;