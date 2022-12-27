import React, { useContext } from "react";
import ThemeContext from "../../theme/themeContext";
import './style.css';

const Loader = () => {
  const theme = useContext(ThemeContext);
  return <div className="loader" style={{borderTop: `5px solid ${theme.colors.text}`}}></div>
};

export default Loader;