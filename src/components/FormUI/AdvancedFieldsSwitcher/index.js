import React, { useCallback, useContext } from "react";
import ThemeContext from "../../../theme/themeContext";
import './style.css';

const AdvancedFieldsSwitcher = ({checked, setChecked}) => {

  const theme = useContext(ThemeContext);

  const handleChange = useCallback((e) => {
    setChecked(e.target.checked);
  }, [setChecked]);

  return (
    <div className="switcher-wrapper">
      <div className="switcher-text" style={{color: theme.colors.text}}>{checked ? 'Hide' : 'Show'} advanced fields</div>
      <input
        id="switcher"
        className="advanced-fields-switcher"
        type="checkbox"
        style={{'--checked': theme.colors.text, '--handle': theme.colors.background, outline: `1px solid ${theme.colors.inputBorder}`}}
        onChange={handleChange}
        value={checked}
      />
    </div>
  );
};

export default AdvancedFieldsSwitcher;