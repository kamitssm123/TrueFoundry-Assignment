import React from "react";
import themes from '../../theme/schema.json';
import './style.css';

const ThemeSwitcher = ({switchTheme, isLight}) => {

  return (
    <input
      id="themeSwitcher"
      className="ThemeToggle"
      type="checkbox"
      defaultChecked={isLight}
      onChange={switchTheme}
      style={{
        '--dark': themes.dark.colors.backgroundSecondary,
        '--darkHandle': themes.dark.colors.background,
        '--darkIcon': themes.dark.colors.text,
        '--light': themes.light.colors.backgroundSecondary,
        '--lightHandle': themes.light.colors.background,
        '--lightIcon': themes.light.colors.text
      }}
    />
  );
};

export default ThemeSwitcher;