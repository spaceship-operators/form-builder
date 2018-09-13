import React from 'react';
import PropTypes from 'prop-types';

const wrapField = Field => class extends React.Component {
  static get propTypes() {
    return {
      handleRemoveField: PropTypes.func.isRequired,
      handleEditField: PropTypes.func.isRequired,
      internalId: PropTypes.string.isRequired,
      editing: PropTypes.bool.isRequired,
    };
  }

  constructor(props) {
    super(props);

    this.handleEditField = this.handleEditField.bind(this);
    this.handleRemoveField = this.handleRemoveField.bind(this);
  }

  handleEditField(e) {
    e.preventDefault();

    if (this.props.handleEditField) {
      this.props.handleEditField(this.props.internalId);
    }
  }

  handleRemoveField(e) {
    e.preventDefault();

    if (this.props.handleRemoveField) {
      this.props.handleRemoveField(this.props.internalId);
    }
  }

  render() {
    return (
      <div className={`fieldwrapper form-group${this.props.editing ? ' fieldwrapper--editing' : ''}`}>
        <Field {...this.props} />
        <div className="fieldwrapper__controls text-right clearfix">
          {!this.props.editing &&
          <button onClick={this.handleEditField} className="fieldwrapper__edit btn btn-info">
                Edit
          </button>
            }
          <button onClick={this.handleRemoveField} className="fieldwrapper__remove btn btn-danger">
              Remove
          </button>
        </div>
      </div>
    );
  }
};

export default wrapField;
