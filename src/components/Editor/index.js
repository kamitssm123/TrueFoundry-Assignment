import React, { useCallback, useContext, useState } from "react";
import JSONEditor from "@monaco-editor/react";
import Loader from "../Loader";
import ThemeContext from "../../theme/themeContext";
import { isLight } from "../../theme/util";

const Editor = ({setIsEmpty, setIsValid, setJson}) => {
  const theme = useContext(ThemeContext);

  const [text, setText] = useState('');

  const validate = useCallback((value) => {
    let json = [];
    try {
      json = JSON.parse(value);
      if(Array.isArray(json) && json.length) {
        setIsValid(true);
        setJson(json);
      } else {
        setIsValid(false);
      }
    } catch {
      setIsValid(false);
    }
  }, [setIsValid, setJson]);

  const handleChange = useCallback((value) => {
    setText(value);
    if(value === '') {
      setIsEmpty(true);
      return;
    }
    setIsEmpty(false);
    validate(value);
  }, [setIsEmpty, validate]);

  return (
    <JSONEditor
      defaultLanguage='json'
      options={{
        scrollBeyondLastLine: false,
      }}
      loading={<Loader />}
      theme={isLight(theme) ? 'light' : 'vs-dark'}
      value={text}
      onChange={handleChange}
    />
  );
};

export default Editor;