import React from 'react';
import PropTypes from 'prop-types';

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

  changeFieldLabel({ target: { value } }) {
    this.props.updateField(
      this.props.field.internalId,
      { label: value }
    );
  }

  render() {
    return (
      <div>
        <h3 className="sidebar__heading">Edit {this.props.field.label}</h3>

        <div className="form-group">
          <label htmlFor="label">Label</label>
          <input type="text"
            name="label"
            id="label"
            className="form-control"
            onChange={this.changeFieldLabel} />
        </div>

        <div className="form-group">
          <button className="btn btn-success"
            onClick={this.completeEditing}>
            Done
          </button>
        </div>

      </div>
    );
  }
}

EditForm.propTypes = {
  field: PropTypes.object.isRequired,
  setEditing: PropTypes.func.isRequired,
  updateField: PropTypes.func.isRequired,
};
