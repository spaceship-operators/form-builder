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
      fields: []
    }

    this.handleChangeSelectField = this.handleChangeSelectField.bind(this);
    this.handleAddField = this.handleAddField.bind(this);
    this.handleEditField = this.handleEditField.bind(this);
    this.handleRemoveField = this.handleRemoveField.bind(this);
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
      console.error('No selected field');
      return;
    }

    this.setState({
      fields: this.state.fields.concat([selectedField.component])
    })
  }

  handleEditField(FormField) {
    console.log('Edit');
    console.log(FormField);
  }

  handleRemoveField(index) {
    if(window.confirm('Are you sure?')) {
      this.setState({
        fields: this.state.fields.filter((field, idx) => {
          return index !== idx;
        })
      });
    }
  }

  render() {
    return (
      <form className="form-builder">
        <Dropdown
          label='Select field'
          id='add-field-dropdown'
          items={fields}
          value={this.state.fieldToAdd}
          handleChange={this.handleChangeSelectField}
        />
        <button onClick={this.handleAddField}>Add</button>
        {this.state.fields.map((Field, index) => (
          <Field
            key={index}
            index={index}
            label='my field'
            id={`field-${index}`}
            items={test}
            handleEditField={this.handleEditField}
            handleRemoveField={this.handleRemoveField}
          />
        ))}
      </form>
    );
  }
}

export default FormBuilder;
