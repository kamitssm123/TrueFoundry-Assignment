import React, {useCallback, useContext, useEffect, useState} from 'react';
import ThemeContext from '../theme/themeContext';
import themes from '../theme/schema.json';
import { isLight } from '../theme/util';

import './style.css';
import Editor from '../components/Editor';
import ThemeSwitcher from '../components/ThemeSwitcher';
import FormUI from '../components/FormUI';

import { AiOutlineFile, AiOutlineFileExclamation } from 'react-icons/ai';
import ErrorBoundary from '../components/ErrorBoundary';

const App = () => {
  const [theme, setTheme] = useState(themes.light);

  const [isDeviceWidthSmall, setIsDeviceWidthSmall] = useState(false);

  const [json, setJson] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if(window.innerWidth <= 800) {
      setIsDeviceWidthSmall(true);
    } else {
      setIsDeviceWidthSmall(false);
    }
  }, []);

  const switchTheme = useCallback(() => {
    if(isLight(theme)) {
      setTheme(themes.dark);
    } else {
      setTheme(themes.light);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      <div className='header-wrapper' style={{backgroundColor: theme.colors.background}}>
        <div className='header'>
          <div className='title' style={{color: theme.colors.text}}>UI Renderer</div>
          <ThemeSwitcher switchTheme={switchTheme} isLight={isLight(theme)} />
        </div>
      </div>
      <ErrorBoundary>
        <div className='body'>
          <div className='editor-wrapper' style={isDeviceWidthSmall ? {borderBottom: `1px solid ${theme.colors.border}`} : {borderRight: `1px solid ${theme.colors.border}`}}>
            <Editor
              setIsEmpty={setIsEmpty}
              setIsValid={setIsValid}
              setJson={setJson}
            />
          </div>
          <div className='ui-wrapper' style={isDeviceWidthSmall ? {borderTop: `1px solid ${theme.colors.border}`, backgroundColor: theme.colors.background} : {borderLeft: `1px solid ${theme.colors.border}`, backgroundColor: theme.colors.background}}>
            {
              isEmpty ? <EmptyUI /> :
              !isValid ? <InvalidUI /> :
              <FormUI data={json} />
            }
          </div>
        </div>
      </ErrorBoundary>
    </ThemeContext.Provider>
  );
};

export default App;

const EmptyUI = () => {

  const theme = useContext(ThemeContext);

  return (
    <div className='ui-text-wrapper'>
      <AiOutlineFile size={50} color={theme.colors.text} />
      <div className='ui-text' style={{color: theme.colors.text}}>Enter a valid JSON UI-schema to generate the corresponding form</div>
    </div>
  );
};

const InvalidUI = () => {
  
  const theme = useContext(ThemeContext);

  return (
    <div className='ui-text-wrapper'>
      <AiOutlineFileExclamation size={50} color={theme.colors.error} />
      <div className='ui-text' style={{color: theme.colors.text}}>The entered JSON is not a valid UI-schema</div>
    </div>
  );
};