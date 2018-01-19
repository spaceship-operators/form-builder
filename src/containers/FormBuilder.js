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
      editing: null
    }

    this.handleChangeSelectField = this.handleChangeSelectField.bind(this);
    this.handleAddField = this.handleAddField.bind(this);
    this.handleEditField = this.handleEditField.bind(this);
    this.handleRemoveField = this.handleRemoveField.bind(this);
    this.handleEditLabel = this.handleEditLabel.bind(this);
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
        {this.state.fields.map((field, index) => {
          const Field = field.component;

          return (<Field
              label={this.state.fields[index].label}
              index={index}
              id={`field-${index}`}
              items={test}
              handleEditField={this.handleEditField}
              handleRemoveField={this.handleRemoveField}
            />);
        })}

        {this.state.editing !== null &&
          <div className="sidebar">
            <TextField
              label="Label"
              id="field-label"
              value={this.state.fields[this.state.editing].label}
              handleChange={this.handleEditLabel}
            />
          </div>
        }
      </form>
    );
  }
}

export default FormBuilder;
