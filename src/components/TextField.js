import React from 'react';
import PropTypes from 'prop-types';

export default class TextField extends React.Component {
  constructor(props) {
    super();

    this.state = {
      value: props.value,
    };

    // Bind functions
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Triggered upon input change, updates component state
   * @param {Object} Dom event for input change
   */
  handleChange({ target: { value } }) {
    this.setState({
      value,
    });
  }

  render() {
    return (
      <label htmlFor={this.props.id} className="field field--text">
        {this.props.label}:
        <input
          className="field__input"
          type="text"
          id={this.props.id}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </label>
    );
  }
}

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string
};

TextField.defaultProps = {
  value: '',
};
