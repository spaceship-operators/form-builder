import Dropdown from '../components/Dropdown.js';
import TextField from '../components/TextField.js';
import RadioField from '../components/RadioField.js';
import CheckboxField from '../components/CheckboxField.js';
import wrapField from '../components/FieldWrapper.js';
import { arrayMove } from 'react-sortable-hoc';

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
  switch (action.type) {
    case 'CHANGE_SELECTED_FIELD':
      return {...state, fieldToAdd: action.value};

    case 'ADD_FIELD':
      const selectedField = state.addableFields.find(field => {
        return field.value === state.fieldToAdd;
      });
      const newField = Object.assign({}, selectedField);

      return {...state, fields: [...state.fields, newField], editing: state.fields.length};

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

    case 'REORDER_FIELD':
      let editing = (state.editing === false) ? false : state.editing;

      // Don't change anything if position hasn't changed
      if (action.oldIndex === action.newIndex) {
        return state;
      }

      if (action.oldIndex === state.editing) {
        editing = action.newIndex;
      }

      return {
        ...state,
        editing: editing,
        fields: arrayMove(state.fields, action.oldIndex, action.newIndex)
      }

    default:
      return state;
  }
}
