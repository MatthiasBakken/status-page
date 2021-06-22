import React from 'react';

import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';

import '../styles/ExperienceIssue.css';


const ExperienceIssue = () => {

  const issueHandler = () => {
    alert('Feature coming soon!')
  }

  return (
    <div className="experience__container">
      <a href="#" onClick={issueHandler}><HelpOutlineOutlinedIcon style={{fontSize: "12px", marginRight: "2.5px" }}/>{` Experiencing an Issue?`}</a>
    </div>
  )
}

export default ExperienceIssue;