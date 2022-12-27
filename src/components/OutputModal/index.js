import React, { useContext } from "react";
import ThemeContext from "../../theme/themeContext";
import JSONEditor from "@monaco-editor/react";
import './style.css';
import Loader from "../Loader";
import { isLight } from "../../theme/util";

const OutputModal = ({data, showModal, setShowModal}) => {

  const theme = useContext(ThemeContext);

  return (
    <div className="output-modal" style={{display: showModal ? 'flex' : 'none'}}>
      <div className="output-modal-content" style={{backgroundColor: theme.colors.backgroundSecondary}}>
        <div className="output-modal-header">
          <div style={{color: theme.colors.text}}>Form Data</div>
          <span style={{color: theme.colors.text}} className="output-modal-close" onClick={() => setShowModal(false)}>&times;</span>
        </div>
        <div style={{flex: 1}}>
          <JSONEditor
            defaultLanguage='json'
            options={{
              scrollBeyondLastLine: false,
              readOnly: true
            }}
            loading={<Loader />}
            theme={isLight(theme) ? 'light' : 'vs-dark'}
            value={data}
          />
        </div>
      </div>
    </div>
  );
};

export default OutputModal;