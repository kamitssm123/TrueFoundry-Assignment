import React, { useContext, useState } from "react";
import ThemeContext from "../../../theme/themeContext";
import { compare } from "../../../utils";
import AdvancedFieldsSwitcher from "../AdvancedFieldsSwitcher";
import InfoTooltip from "../InfoTooltip";
import './style.css';

const Group = ({data, mapper, parentKey}) => {

  const theme = useContext(ThemeContext);

  const [groupAdvancedFieldsPresent, setGroupAdvancedFieldsPresent] = useState(false);
  const [showGroupAdvancedFields, setShowGroupAdvancedFields] = useState(false);

  return (
    <div>
      <div>
        <div className="group-label" style={{color: theme.colors.text}}>
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
      <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
        {
          data.subParameters.sort(compare).map((elem, index) => mapper(elem, index, true, parentKey === '' ? data.jsonKey : parentKey + '|' + data.jsonKey, setGroupAdvancedFieldsPresent, showGroupAdvancedFields))
        }
        {
          groupAdvancedFieldsPresent && <AdvancedFieldsSwitcher checked={showGroupAdvancedFields} setChecked={setShowGroupAdvancedFields} />
        }
      </div>
    </div>
  );
};

export default Group;