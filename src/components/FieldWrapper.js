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
        this.props.handleEditField(this.props.index);
      }
    }

    handleRemoveField(e) {
      e.preventDefault();

      if (this.props.handleRemoveField) {
        this.props.handleRemoveField(this.props.index);
      }
    }

    render() {
      return (
        <div className={"fieldwrapper form-group" + (this.props.editing ? ' fieldwrapper--editing' : '')}>
          <Field {...this.props} />
          <div className="fieldwrapper__controls text-right clearfix">
            <button onClick={this.handleEditField} className="fieldwrapper__edit btn btn-outline-primary">
              Edit
            </button>
            <button onClick={this.handleRemoveField} className="fieldwrapper__remove btn btn-outline-danger">
              Remove
            </button>
          </div>
        </div>
      );
    }
  };
};

export default wrapField;
