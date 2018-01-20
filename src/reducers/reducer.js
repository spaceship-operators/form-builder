import React from 'react';
import Dropdown from '../components/Dropdown.js';
import TextField from '../components/TextField.js';
import RadioField from '../components/RadioField.js';
import CheckboxField from '../components/CheckboxField.js';
import wrapField from '../components/FieldWrapper.js';
import { arrayMove } from 'react-sortable-hoc';

const initialState = {
  fieldTypes:[
    { 
      label: 'Text Field', 
      value: 'text', 
      default: {
        label: 'Text field label',
        component: wrapField(TextField) 
      }
    },
    { 
      label: 'Dropdown', 
      value: 'dropdown', 
      default: {
        label: 'Dropdown field label',
        component: wrapField(Dropdown) 
      }
    },
    { 
      label: 'Radio Group', 
      value: 'radio', 
      default: {
        label: 'Radio group label',
        component: wrapField(RadioField) 
      }
    },
    { 
      label: 'Checkbox Group', 
      value: 'checkbox', 
      default: {
        label: 'Checkbox group label',
        component: wrapField(CheckboxField)
      }
    }
  ],
  selectedFieldType: 'text',
  fields: [],
  editing: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_SELECTED_FIELD':
      return {...state, selectedFieldType: action.value};

    case 'ADD_FIELD':
      const selectedField = state.fieldTypes.find(field => {
        return field.value === state.selectedFieldType;
      });
      const newField = Object.assign({}, selectedField.default);

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
