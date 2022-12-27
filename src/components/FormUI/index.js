import React, { useCallback, useContext, useEffect, useState } from "react";
import ThemeContext from "../../theme/themeContext";
import Input from "./Input";
import Radio from "./Radio";
import Select from "./Select";
import Switch from "./Switch";
import Group from "./Group";
import Ignore from "./Ignore";
import './style.css';
import { compare, eventBus } from "../../utils";
import AdvancedFieldsSwitcher from "./AdvancedFieldsSwitcher";
import OutputModal from "../OutputModal";

const FormUI = ({data}) => {

  const theme = useContext(ThemeContext);

  const [formData, setFormData] = useState({});

  const [advancedFieldsPresent, setAdvancedFieldsPresent] = useState(false);
  const [showAdvancedFields, setShowAdvancedFields] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const mapper = (elem, index, isNested, parentKey, setGroupAdvancedFieldsPresent, showGroupAdvancedFields) => {
    return !isNested ? (
      <div
        key={elem.jsonKey}
        className="field-group"
        style={{backgroundColor: theme.colors.backgroundSecondary, marginTop: index === 0 && !isNested ? 20 : 10, display: (!showAdvancedFields && !showGroupAdvancedFields) && !elem.validate.required ? 'none' : null}}
      >
        {elementSelector(elem, parentKey, setGroupAdvancedFieldsPresent, showGroupAdvancedFields)}
      </div>
    ) : (
      <div key={elem.jsonKey} className='hide-if-empty' style={{display: (!showAdvancedFields && !showGroupAdvancedFields) && !elem.validate.required ? 'none' : null}}>
        {elementSelector(elem, parentKey, setGroupAdvancedFieldsPresent, showGroupAdvancedFields)}
      </div>
    );
  };

  const elementSelector = (data, parentKey, setGroupAdvancedFieldsPresent, showGroupAdvancedFields) => {
    switch (data.uiType) {
      case 'Input':
        return <Input data={data} setFormData={setFormData} parentKey={parentKey} setAdvancedFieldsPresent={setAdvancedFieldsPresent} setGroupAdvancedFieldsPresent={setGroupAdvancedFieldsPresent} />;
      case 'Select':
        return <Select data={data} setFormData={setFormData} parentKey={parentKey} setAdvancedFieldsPresent={setAdvancedFieldsPresent} setGroupAdvancedFieldsPresent={setGroupAdvancedFieldsPresent} />;
      case 'Radio':
        return <Radio data={data} setFormData={setFormData} parentKey={parentKey} setAdvancedFieldsPresent={setAdvancedFieldsPresent} setGroupAdvancedFieldsPresent={setGroupAdvancedFieldsPresent} />;
      case 'Switch':
        return <Switch data={data} setFormData={setFormData} parentKey={parentKey} setAdvancedFieldsPresent={setAdvancedFieldsPresent} setGroupAdvancedFieldsPresent={setGroupAdvancedFieldsPresent} />;
      case 'Group':
        return <Group data={data} parentKey={parentKey} mapper={mapper} />;
      case 'Ignore':
        return <Ignore data={data} parentKey={parentKey} mapper={mapper} formData={formData} setGroupAdvancedFieldsPresent={setGroupAdvancedFieldsPresent} showGroupAdvancedFields={showGroupAdvancedFields} />;
      default:
        return null;
    }
  };

  const handleSubmit = useCallback(() => {
    eventBus.dispatch('formSubmit');
    setTimeout(() => {
      if(document.getElementsByClassName('input-error').length === 0) {
        setShowModal(true);
      }
    }, 0);
    
  }, []);

  useEffect(() => {
    setFormData(prev => {
      const prevData = JSON.parse(JSON.stringify(prev));
      const keys = data.reduce((previous, current) => {
        previous.push(current.jsonKey);
        return previous;
      }, []);
      for(const property in prevData) {
        if(!keys.includes(property)) {
          delete prevData[property];
        }
      }
      return prevData;
    });
  }, [data]);

  return (
    <div className="form-wrapper">
      {
        data.sort(compare).map((elem, index) => mapper(elem, index, false, '', null, false))
      }
      <div style={{backgroundColor: theme.colors.divider, height: 2, margin: '0 20px 10px'}} />
      <div className="form-footer-wrapper">
        {
          advancedFieldsPresent && <AdvancedFieldsSwitcher checked={showAdvancedFields} setChecked={setShowAdvancedFields} />
        }
        <div style={{flex: 1}} />
        <div className="cancel-button" style={{backgroundColor: theme.colors.backgroundSecondary, color: theme.colors.text, border: `1px solid ${theme.colors.inputBorder}`}}>Cancel</div>
        <div className="submit-button" style={{backgroundColor: theme.colors.submitBackground, color: theme.colors.submitText, border: `1px solid ${theme.colors.submitBorder}`}} onClick={handleSubmit}>Submit</div>
      </div>
      <OutputModal data={JSON.stringify(formData, null, 4)} showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default FormUI;