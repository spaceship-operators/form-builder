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
        this.props.handleEditField(this);
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
        <div className="fieldwrapper">
          <div className="fieldwrapper__controls">
            <button onClick={this.handleEditField} className="fieldwrapper__edit">
              Edit
            </button>
            <button onClick={this.handleRemoveField} className="fieldwrapper__remove">
              Remove
            </button>
          </div>
          <Field {...this.props} />
        </div>
      );
    }
  };
};

export default wrapField;
