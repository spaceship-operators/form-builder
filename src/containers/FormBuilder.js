import React, { Component } from 'react';
import Dropdown from '../components/Dropdown.js';
import TextField from '../components/TextField.js';

const fields = [{
  label: 'Text field',
  value: 'text',
  component: TextField
}, {
  label: 'Dropdown field',
  value: 'dropdown',
  component: Dropdown
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
          <div className="form-builder__field">
            <Field
              key={index}
              label='my field'
              id={`field-${index}`}
              items={test}
            />
          </div>
        ))}
      </form>
    );
  }
}

export default FormBuilder;
