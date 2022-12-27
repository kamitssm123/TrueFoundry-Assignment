export const compare = (a, b) => a.sort - b.sort;

export const setFormField = (prev, parentKey, value, jsonKey) => {
  let prevData = JSON.parse(JSON.stringify(prev));
  if(parentKey === '') {
    prevData[jsonKey] = value;
  } else {
    const parentKeyArr = parentKey.split('|');
    let field = prevData;
    for(let i = 0; i < parentKeyArr.length; i++) {
      if(field[parentKeyArr[i]]) {
        field = field[parentKeyArr[i]];
      } else {
        field[parentKeyArr[i]] = {};
        field = field[parentKeyArr[i]];
      }
    }
    field[jsonKey] = value;
  }
  return prevData;
};

export const deleteFormField = (formData, parentKey, jsonKey) => {
  if(parentKey === '') {
    delete formData[jsonKey];
  } else {
    const parentKeyArr = parentKey.split('|');
    let field = formData;
    for(let i = 0; i < parentKeyArr.length; i++) {
      field = field[parentKeyArr[i]];
    }
    delete field[jsonKey];
  }
}

export const eventBus = {
  on(event, callback) {
    document.addEventListener(event, (e) => callback(e.detail));
  },

  dispatch(event, data) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },

  remove(event, callback) {
    document.removeEventListener(event, callback);
  },
}