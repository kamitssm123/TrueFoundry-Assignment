import React, { useCallback, useContext, useEffect, useState } from "react";
import ThemeContext from "../../../theme/themeContext";
import { setFormField } from "../../../utils";
import InfoTooltip from "../InfoTooltip";
import './style.css';

const Select = ({data, setFormData, parentKey, setAdvancedFieldsPresent, setGroupAdvancedFieldsPresent}) => {

  const theme = useContext(ThemeContext);

  const [selectedValue, setSelectedValue] = useState(data.validate.defaultValue ?? '');

  const handleChange = useCallback((e) => {
    setSelectedValue(e.target.value);
  }, []);

  useEffect(() => {
    setFormData(prev => setFormField(prev, parentKey, selectedValue, data.jsonKey));
  }, [selectedValue, setFormData, parentKey, data]);

  useEffect(() => {
    if(!data.validate.required) {
      setAdvancedFieldsPresent(true);
      if(setGroupAdvancedFieldsPresent) {
        setGroupAdvancedFieldsPresent(true);
      }
    }
  }, [setAdvancedFieldsPresent, setGroupAdvancedFieldsPresent, data.validate.required]);

  return (
    <div className="select-container">
      <div className="select-label" style={{color: theme.colors.text}}>
        {data.label}
        {
          data.validate.required && <span style={{color: theme.colors.required, marginLeft: 4}}>*</span>
        }
        {
          data.description && <InfoTooltip label={data.label} description={data.description} />
        }
      </div>
      <select
        className="select-field"
        style={{backgroundColor: theme.colors.background, color: theme.colors.text, border: `1px solid ${theme.colors.inputBorder}`}}
        disabled={data.validate.immutable}
        value={selectedValue}
        onChange={handleChange}
      >
        {
          data.validate.options.map(option => {
            return (
              <option value={option.value} key={option.value}>{option.label}</option>
            );
          })
        }
      </select>
    </div>
  );
};

export default Select;