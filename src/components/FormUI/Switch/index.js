import React, { useCallback, useContext, useEffect, useState } from "react";
import './style.css';

import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';
import ThemeContext from "../../../theme/themeContext";
import InfoTooltip from "../InfoTooltip";
import { setFormField } from "../../../utils";

const Switch = ({data, setFormData, parentKey, setAdvancedFieldsPresent, setGroupAdvancedFieldsPresent}) => {

  const theme = useContext(ThemeContext);

  const [value, setValue] = useState(data.validate.defaultValue ?? false);

  const handleClick = useCallback(() => {
    if(data.validate.immutable) return;
    setValue(prev => !prev);
  }, [data.validate.immutable]);

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

  return (
    <div className="switch-container" onClick={handleClick}>
      {
        value ? <MdCheckBox color={theme.colors.text} /> : <MdCheckBoxOutlineBlank color={theme.colors.text} />
      }
      <div style={{color: theme.colors.text, fontSize: 'smaller'}}>{data.label}</div>
      {
        data.description && <InfoTooltip label={data.label} description={data.description} />
      }
    </div>
  );
};

export default Switch;