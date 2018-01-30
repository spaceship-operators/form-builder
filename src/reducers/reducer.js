import Dropdown from '../components/Dropdown.js';
import TextField from '../components/TextField.js';
import RadioField from '../components/RadioField.js';
import CheckboxField from '../components/CheckboxField.js';
import EditForm from '../components/EditForm.js';
import wrapField from '../components/FieldWrapper.js';
import { arrayMove } from 'react-sortable-hoc';

const initialState = {
  fieldTypes:[
    { 
      label: 'Text Field', 
      value: 'text', 
      default: {
        label: 'Text field label',
        component: wrapField(TextField),
        editForm: EditForm,
      }
    },
    { 
      label: 'Dropdown', 
      value: 'dropdown', 
      default: {
        label: 'Dropdown field label',
        component: wrapField(Dropdown),
        editForm: EditForm,
      }
    },
    { 
      label: 'Radio Group', 
      value: 'radio', 
      default: {
        label: 'Radio group label',
        component: wrapField(RadioField),
        editForm: EditForm,
      }
    },
    { 
      label: 'Checkbox Group', 
      value: 'checkbox', 
      default: {
        label: 'Checkbox group label',
        component: wrapField(CheckboxField),
        editForm: EditForm,
      }
    }
  ],
  selectedFieldType: 'text',
  fields: [],
  editing: false
}

const guid = () => {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  const parts = [
    s4() + s4(), 
    s4(), 
    s4(), 
    s4(), 
    s4() + s4() + s4()
  ];

  return parts.join('-');
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_SELECTED_FIELD':
      return {...state, selectedFieldType: action.value};

    case 'ADD_FIELD':
      return (() => {
        const selectedField = state.fieldTypes.find(field => {
          return field.value === state.selectedFieldType;
        });

        const newField = Object.assign({}, selectedField.default);
        newField.internalId = guid();

        return {...state, fields: [...state.fields, newField], editing: newField.internalId};
      })();

    case 'SET_EDITING':
      return {...state, editing: action.internalId};

    case 'UPDATE_FIELD':
      return (() => {
        let fields = state.fields.concat([]);

        let field = fields.find((f) => {
          return f.internalId === action.fieldId;  
        });

        if (field === undefined) {
          return state;
        }

        field = Object.assign(field, action.fieldProps);

        return {...state, fields}; 
      })();

    case 'REMOVE_FIELD':
      return (() => {
        const fields = state.fields.concat([]);
        const editing = state.editing === action.internalId ? false : state.editing;
        return {
          ...state,
          editing,
          fields: fields.filter(field => {
            return action.internalId !== field.internalId;
          })
        };
      })();

    case 'REORDER_FIELD':
      return (() => {
        // Don't change anything if position hasn't changed
        if (action.oldIndex === action.newIndex) {
          return state;
        }

        return {
          ...state,
          fields: arrayMove(state.fields, action.oldIndex, action.newIndex)
        }
      })();

    default:
      return state;
  }
}
