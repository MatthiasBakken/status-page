import React from 'react';

import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';

import '../styles/ExperienceIssue.css';


const ExperienceIssue = () => {

  return (
    <div className="experience__container">
      <a href="#"><HelpOutlineOutlinedIcon style={{fontSize: "12px", marginRight: "2.5px" }}/>{` Experiencing an Issue?`}</a>
    </div>
  )
}

export default ExperienceIssue;