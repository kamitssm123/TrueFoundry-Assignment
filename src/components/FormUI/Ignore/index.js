import React, { useContext, useEffect, useMemo, useState } from "react";
import ThemeContext from "../../../theme/themeContext";
import { compare, deleteFormField } from "../../../utils";
import InfoTooltip from "../InfoTooltip";
import './style.css';

const Ignore = ({data, mapper, parentKey, formData, setGroupAdvancedFieldsPresent, showGroupAdvancedFields}) => {

  const theme = useContext(ThemeContext);

  const [isEnabled, setIsEnabled] = useState(false);

  const evaluate = useMemo(() => ({
    '==': (a, b) => a === b,
    '>=': (a, b) => a >= b,
    '<=': (a, b) => a <= b,
    '<' : (a, b) => a < b,
    '>': (a, b) => a > b
  }), []);

  const action = useMemo(() => ({
    enable: () => setIsEnabled(true),
    disable: () => {
      setIsEnabled(false);
      deleteFormField(formData, parentKey, data.jsonKey);
    }
  }), [data.jsonKey, formData, parentKey]);

  useEffect(() => {
    const keysArr = data.conditions[0].jsonKey.split('.');
    let field = formData;
    for(let i = 0; i < keysArr.length; i++) {
      if(field[keysArr[i]]) {
        field = field[keysArr[i]];
      } else {
        field[keysArr[i]] = {};
        field = field[keysArr[i]];
      }
    }
    if(evaluate[data.conditions[0].op](field, data.conditions[0].value)) {
      action[data.conditions[0].action]();
    } else {
      action.disable();
    }
  }, [data.conditions, formData, evaluate, action]);

  useEffect(() => {
    if(!isEnabled && setGroupAdvancedFieldsPresent) {
      setGroupAdvancedFieldsPresent(false);
    }
  }, [isEnabled, setGroupAdvancedFieldsPresent])

  return isEnabled ? (
    <div>
      {
        data.level === 0 && (
          <div>
            <div className="ignore-label" style={{color: theme.colors.text}}>
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
      <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
        {
          data.subParameters.sort(compare).map((elem, index) => mapper(elem, index, true, parentKey === '' ? data.jsonKey : parentKey + '|' + data.jsonKey, setGroupAdvancedFieldsPresent, showGroupAdvancedFields))
        }
      </div>
    </div>
  ) : null;
};

export default Ignore;