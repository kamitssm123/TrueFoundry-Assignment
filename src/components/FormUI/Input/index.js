import React, { useCallback, useContext, useEffect, useState } from "react";
import ThemeContext from "../../../theme/themeContext";
import './style.css';
import InfoTooltip from "../InfoTooltip";
import { eventBus, setFormField } from "../../../utils";
import { MdOutlineErrorOutline } from 'react-icons/md';

const Input = ({data, setFormData, parentKey, setAdvancedFieldsPresent, setGroupAdvancedFieldsPresent}) => {
  const theme = useContext(ThemeContext);

  const [value, setValue] = useState('');
  const [hasError, setHasError] = useState(false);

  const validate = useCallback((val) => {
    if(data.validate.required && val === '') {
      setHasError(true);
    } else {
      if(data.validate.pattern && !val.match(data.validate.pattern)) {
        setHasError(true);
      } else {
        setHasError(false);
      }
    }
  }, [data.validate]);

  const handleChange = useCallback((e) => {
    validate(e.target.value);
    setValue(e.target.value);
  }, [validate]);

  useEffect(() => {
    setFormData(prev => setFormField(prev, parentKey, value, data.jsonKey));
  }, [value, setFormData, parentKey, data]);

  useEffect(() => {
    if(!data.validate.required) {
      setAdvancedFieldsPresent(true);
      if(setGroupAdvancedFieldsPresent) {
        setGroupAdvancedFieldsPresent(true);
      }
    }
  }, [setAdvancedFieldsPresent, setGroupAdvancedFieldsPresent, data.validate.required]);

  useEffect(() => {
    eventBus.on('formSubmit', () => {
      validate(value);
    });

    return () => {
      eventBus.remove('formSubmit');
    }
  })

  return (
    <div className="input-container">
      <div className="input-label" style={{color: theme.colors.text}}>
        {data.label}
        {
          data.validate.required && <span style={{color: theme.colors.required, marginLeft: 4}}>*</span>
        }
        {
          data.description && <InfoTooltip label={data.label} description={data.description} />
        }
        <div style={{flex: 1}} />
        {
          hasError && <MdOutlineErrorOutline color={theme.colors.error} size={18} className="input-error" />
        }
      </div>
      <input
        type="text"
        className="input-field"
        style={{backgroundColor: theme.colors.background, color: theme.colors.text, border: `1px solid ${theme.colors.inputBorder}`}}
        placeholder={data.placeholder}
        disabled={data.validate.immutable}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;