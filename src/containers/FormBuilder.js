import React, { Component } from 'react';
import Dropdown from '../components/Dropdown.js';
import TextField from '../components/TextField.js';
import wrapField from '../components/FieldWrapper.js';

const fields = [{
  label: 'Text field',
  value: 'text',
  component: wrapField(TextField)
}, {
  label: 'Dropdown field',
  value: 'dropdown',
  component: wrapField(Dropdown)
}];

const test = [{
  label: 'test',
  value: 'test'
}];

class FormBuilder extends Component {
  constructor() {
    super();

    this.state = {
      fieldToAdd: 'text',
      fields: [],
      editing: false
    }

    this.handleChangeSelectField = this.handleChangeSelectField.bind(this);
    this.handleAddField = this.handleAddField.bind(this);
    this.handleEditField = this.handleEditField.bind(this);
    this.handleRemoveField = this.handleRemoveField.bind(this);
    this.handleEditLabel = this.handleEditLabel.bind(this);
    this.completeEditing = this.completeEditing.bind(this);
  }

  handleChangeSelectField(value) {
    this.setState({
      fieldToAdd: value
    });
  }

  handleAddField(e) {
    e.preventDefault();

    const selectedField = fields.find(field => {
      return field.value === this.state.fieldToAdd;
    });

    if (selectedField === void 0) {
      console.error('No selected field.');
      return;
    }

    this.setState({
      fields: this.state.fields.concat([{
        component: selectedField.component,
        label: 'My field'
      }])
    })
  }

  handleEditField(index) {
    this.setState({
      editing: index
    });
  }

  handleRemoveField(index) {
    if (window.confirm('Are you sure?')) {
      this.setState({
        editing: (this.state.editing === index) ? false : this.state.editing,
        fields: this.state.fields.filter((field, idx) => {
          return index !== idx;
        })
      });
    }
  }

  handleEditLabel(value) {
    let newFields = this.state.fields.concat([]);
    newFields[this.state.editing].label = value;

    this.setState({
      fields: newFields
    });
  }

  completeEditing(e) {
    e.preventDefault();

    this.setState({
      editing: false
    });
  }

  render() {
    return (
      <form className="form-builder row">
        <div className={this.state.editing === false ? 'col-12' : 'col-7'}>
          <div className="form-builder__addform">
            <Dropdown
              label='Select field'
              id='add-field-dropdown'
              items={fields}
              value={this.state.fieldToAdd}
              handleChange={this.handleChangeSelectField}
            />
            <button onClick={this.handleAddField} className="btn btn-primary btn-block">Add</button>
          </div>
          {this.state.fields.map((field, index) => {
            const Field = field.component;

            return (
              <Field
                editing={this.state.editing === index}
                key={index}
                index={index}
                label={field.label}
                id={`field-${index}`}
                items={test}
                handleEditField={this.handleEditField}
                handleRemoveField={this.handleRemoveField}
              />
            );
          })}
        </div>

        {this.state.editing !== false &&
          <div className="sidebar col-4 offset-1">
            <h3 className="sidebar__heading">Edit {this.state.fields[this.state.editing].label}</h3>
            <TextField
              label="Label"
              id="field-label"
              value={this.state.fields[this.state.editing].label}
              handleChange={this.handleEditLabel}
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

export default FormBuilder;
