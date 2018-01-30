import React from 'react';

const wrapField = (Field) => {

  return class extends React.Component {
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
        <div className={"fieldwrapper form-group" + (this.props.editing ? ' fieldwrapper--editing' : '')}>
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
};

export default wrapField;
