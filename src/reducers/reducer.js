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

        return {...state, fields: [...state.fields, newField], editing: state.fields.length};
      })();

    case 'SET_EDITING':
      return {...state, editing: action.index};

    case 'CHANGE_FIELD_LABEL':
      return (() => {
        let fields = state.fields.concat([]);
        fields[state.editing].label = action.value;

        return {...state, fields};
      })();

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
        let editing = state.editing;
      
        if (state.editing !== false && action.index < state.editing) {
          editing = state.editing - 1;
        } else if (state.editing !== false && action.index === state.editing) {
          editing = false;
        }
        
        return {
          ...state,
          editing: editing,
          fields: state.fields.filter((field, idx) => {
            return action.index !== idx;
          })
        };
      })();

    case 'REORDER_FIELD':
      return (() => {
        let editing = state.editing;

        // Don't change anything if position hasn't changed
        if (action.oldIndex === action.newIndex) {
          return state;
        }

        if (editing !== false && action.oldIndex === editing) {
          editing = action.newIndex;
        }

        return {
          ...state,
          editing: editing,
          fields: arrayMove(state.fields, action.oldIndex, action.newIndex)
        }
      })();

    default:
      return state;
  }
}
