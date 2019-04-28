import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeSelectedField, addField, setEditing, updateField, removeField, addInitialFields } from '../actions/actions.js';
import EditForm from '../components/EditForm.js';
import FieldList from './FieldList.js';

class FormBuilder extends Component {
  constructor() {
    super();

    this.handleChangeSelectField = this.handleChangeSelectField.bind(this);
    this.handleAddField = this.handleAddField.bind(this);
  }

  componentDidMount() {
    this.props.initialFields && this.props.addInitialFields(this.props.initialFields);
  }

  handleChangeSelectField({ target: { value } }) {
    this.props.changeSelectedField(value);
  }

  handleAddField(e) {
    e.preventDefault();

    this.props.addField();
  }

  handleSubmit(e) {
    e.preventDefault();
  }
  
  render() {
    let editForm;
    if (this.props.editing !== false) {
      const editingField = this.props.fields.find((f) => {
        return f.internalId === this.props.editing;
      });

      if (editingField !== undefined) {
        const EditFormComponent = editingField.editForm !== undefined
          ? editingField.editForm
          : EditForm;

        editForm = (
          <div className="sidebar col-4 offset-1">
            <EditFormComponent field={editingField} key={this.props.editing} setEditing={this.props.setEditing} updateField={this.props.updateField} />
          </div>
        );
      }
    }

    return (
      <form className="form-builder row" onSubmit={this.handleSubmit}>
        <div className={this.props.editing === false ? 'col-12' : 'col-7'}>
          <div className="form-builder__addform">
            <div className="form-group">
              <label htmlFor="fieldType">Select field:</label>
              <select name="fieldType" 
                id="fieldType" 
                onChange={this.handleChangeSelectField}
                defaultValue={this.props.selectedFieldType}
                className="form-control">
                { this.props.fieldTypes.map(({ label, value }) => (
                  <option value={value} 
                    key={value}
                    >
                    {label}
                    </option>
                )) }
              </select>
            </div>

            <div className="form-group">
              <button onClick={this.handleAddField} className="btn btn-primary btn-block">Add</button>
            </div>
          </div>

          <FieldList fields={this.props.fields} />
        </div>

        {editForm}
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
  updateField,
  removeField,
  addInitialFields,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FormBuilder);
