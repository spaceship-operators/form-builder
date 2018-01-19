import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeSelectedField, addField, setEditing, changeFieldLabel, removeField } from '../actions/actions.js';
import Dropdown from '../components/Dropdown.js';
import TextField from '../components/TextField.js';

class FormBuilder extends Component {
  constructor() {
    super();

    this.handleChangeSelectField = this.handleChangeSelectField.bind(this);
    this.handleAddField = this.handleAddField.bind(this);
    this.handleRemoveField = this.handleRemoveField.bind(this);
    this.completeEditing = this.completeEditing.bind(this);
  }

  handleChangeSelectField(value) {
    this.props.changeSelectedField(value);
  }

  handleAddField(e) {
    e.preventDefault();

    this.props.addField();
  }

  handleRemoveField(index) {
    if (window.confirm('Are you sure?')) {
      this.props.removeField(index);
    }
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
              items={this.props.addableFields}
              value={this.props.fieldToAdd}
              handleChange={this.handleChangeSelectField}
            />
            <button onClick={this.handleAddField} className="btn btn-primary btn-block">Add</button>
          </div>
          {this.props.fields.map((field, index) => {
            const Field = field.component;

            return (
              <Field
                editing={this.props.editing === index}
                key={index}
                index={index}
                id={`field-${index}`}
                {...field}
                handleEditField={this.props.setEditing}
                handleRemoveField={this.handleRemoveField}
              />
            );
          })}
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
  const { fieldToAdd, addableFields, fields, editing } = state;

  return {
    fieldToAdd,
    addableFields,
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
