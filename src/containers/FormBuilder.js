import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeSelectedField, addField, setEditing, changeFieldLabel, removeField } from '../actions/actions.js';
import Dropdown from '../components/Dropdown.js';
import TextField from '../components/TextField.js';
import RadioField from '../components/RadioField.js';
import CheckboxField from '../components/CheckboxField.js';
import FieldList from './FieldList.js';
import wrapField from '../components/FieldWrapper.js';

class FormBuilder extends Component {
  constructor() {
    super();

    this.handleChangeSelectField = this.handleChangeSelectField.bind(this);
    this.handleAddField = this.handleAddField.bind(this);
    this.completeEditing = this.completeEditing.bind(this);
  }

  handleChangeSelectField(value) {
    this.props.changeSelectedField(value);
  }

  handleAddField(e) {
    e.preventDefault();

    this.props.addField();
  }

  completeEditing(e) {
    e.preventDefault();

    this.props.setEditing(false);
  }

  render() {
    return (
      <form className="form-builder row">
        <div className={this.props.editing === false ? 'col-12' : 'col-7'}>
          <div className="form-builder__addform">
            <Dropdown
              label='Select field:'
              id='add-field-dropdown'
              items={this.props.fieldTypes}
              value={this.props.selectedFieldType}
              handleChange={this.handleChangeSelectField}
            />
            <button onClick={this.handleAddField} className="btn btn-primary btn-block">Add</button>
          </div>
          <FieldList fields={this.props.fields} />
        </div>

        {this.props.editing !== false &&
          <div className="sidebar col-4 offset-1">
            <h3 className="sidebar__heading">Edit {this.props.fields[this.props.editing].label}</h3>
            <TextField
              label="Label"
              id="field-label"
              value={this.props.fields[this.props.editing].label}
              handleChange={this.props.changeFieldLabel}
            />
            <button className="btn btn-success" onClick={this.completeEditing}>
              Done
            </button>
          </div>
        }
      </form>
    );
  }
}

const mapStateToProps = state => {
  const { fieldTypes, selectedFieldType, fields, editing } = state;

  return {
    fieldTypes,
    selectedFieldType,
    fields,
    editing
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  changeSelectedField,
  addField,
  setEditing,
  changeFieldLabel,
  removeField
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FormBuilder);
