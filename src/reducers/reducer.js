import Dropdown from '../components/Dropdown.js';
import TextField from '../components/TextField.js';
import RadioField from '../components/RadioField.js';
import CheckboxField from '../components/CheckboxField.js';
import wrapField from '../components/FieldWrapper.js';

const initialState = {
  addableFields: [{
    label: 'Text field',
    value: 'text',
    component: wrapField(TextField)
  }, {
    label: 'Dropdown field',
    value: 'dropdown',
    items: [
      { label: 'Test 1', value: 'test1' },
      { label: 'Test 2', value: 'test2' },
      { label: 'Test 3', value: 'test3' },
    ],
    component: wrapField(Dropdown)
  }, {
    label: 'Radio field',
    value: 'radio',
    items: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
    component: wrapField(RadioField)
  }, {
    label: 'Checkbox Field',
    value: 'checkbox',
    items: [
      { label: 'English', value: 'english' },
      { label: 'French', value: 'french' },
      { label: 'Spanish', value: 'spanish' },
      { label: 'Others', value: 'others' },
    ],
    component: wrapField(CheckboxField)
  }],
  fieldToAdd: 'text',
  fields: [],
  editing: false
}

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case 'CHANGE_SELECTED_FIELD':
      return {...state, fieldToAdd: action.value};

    case 'ADD_FIELD':
      const selectedField = state.addableFields.find(field => {
        return field.value === state.fieldToAdd;
      });
      const newField = Object.assign({}, selectedField);

      return {...state, fields: [...state.fields, newField]};

    case 'SET_EDITING':
      return {...state, editing: action.index};

    case 'CHANGE_FIELD_LABEL':
      let fields = state.fields.concat([]);
      fields[state.editing].label = action.value;

      return {...state, fields};

    case 'REMOVE_FIELD':

      return {
        ...state,
        editing: (state.editing === action.index) ? false : state.editing,
        fields: state.fields.filter((field, idx) => {
          return action.index !== idx;
        })
      };

    default:
      return state;
  }
}
