import React from 'react';
import PropTypes from 'prop-types';
import TextField from '../components/TextField.js';

export default class EditForm extends React.Component {
  constructor(props) {
    super(props);

    // Bind functions
    this.completeEditing = this.completeEditing.bind(this);
    this.changeFieldLabel = this.changeFieldLabel.bind(this);
  }

  completeEditing(e) {
    this.props.setEditing(false);
  }

  changeFieldLabel(value) {
    this.props.changeFieldLabel(value);
  }

  render() {
    return (
      <div>
        <h3 className="sidebar__heading">Edit {this.props.field.label}</h3>
        <TextField
          label="Label"
          id="field-label"
          value={this.props.field.label}
          handleChange={this.changeFieldLabel}
        />
        <button className="btn btn-success" onClick={this.completeEditing}>
          Done
        </button>
      </div>
    );
  }
}

EditForm.propTypes = {
  field: PropTypes.object.isRequired,
  setEditing: PropTypes.func.isRequired,
  changeFieldLabel: PropTypes.func.isRequired,
};
