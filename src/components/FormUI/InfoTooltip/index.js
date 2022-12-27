import React, { useContext } from "react";
import { BsInfoCircleFill } from 'react-icons/bs'
import ThemeContext from "../../../theme/themeContext";

import './style.css';

const InfoTooltip = ({label, description}) => {

  const theme = useContext(ThemeContext);

  return (
    <div className="info-icon">
      <BsInfoCircleFill size={12} color={theme.colors.info} />
      <div className="tooltip-container" style={{backgroundColor: theme.colors.background, color: theme.colors.text}}>
        <div>{label}</div>
        <div style={{backgroundColor: theme.colors.backgroundSecondary, height: 2, margin: '2px 0'}} />
        <div style={{color: theme.colors.info}}>{description}</div>
      </div>
    </div>
  );
};

export default InfoTooltip;