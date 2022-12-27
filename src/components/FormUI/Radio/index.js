import React, { useCallback, useContext, useEffect, useState } from "react";
import ThemeContext from "../../../theme/themeContext";
import { setFormField } from "../../../utils";
import InfoTooltip from "../InfoTooltip";
import './style.css';

const Radio = ({data, setFormData, parentKey, setAdvancedFieldsPresent, setGroupAdvancedFieldsPresent}) => {

  const theme = useContext(ThemeContext);

  const [selectedValue, setSelectedValue] = useState(data.validate.defaultValue ?? '');

  const handleChange = useCallback((value) => {
    if(data.validate.immutable) return;
    setSelectedValue(value)
  }, [data.validate.immutable]);

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
    <div>
      {
        data.level === 0 && (
          <div>
            <div className="radio-label" style={{color: theme.colors.text}}>
              {data.label}
              {
                data.validate.required && <span style={{color: theme.colors.required, marginLeft: 4}}>*</span>
              }
              {
                data.description && <InfoTooltip label={data.label} description={data.description} />
              }
            </div>
            <div style={{backgroundColor: theme.colors.divider, height: 2, margin: '6px 0 10px'}} />
          </div>
        )
      }
      <div className="options-wrapper">
        {
          data.validate.options.map(option => (
            <div
              key={option.value}
              className="option"
              style={{
                color: theme.colors.text,
                backgroundColor: theme.colors.background,
                border: selectedValue === option.value ? `1px solid ${theme.colors.selectedBorder}` : `1px solid ${theme.colors.inputBorder}`
              }}
              onClick={() => handleChange(option.value)}
            >{option.label}</div>
          ))
        }
      </div>
    </div>
  );
};

export default Radio;