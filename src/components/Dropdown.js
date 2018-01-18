import React from 'react';
import PropTypes from 'prop-types';

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    // Bind functions
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Triggered upon dropdown change, updates component state
   * @param {Object} Dom event for dropdown change
   */
  handleChange({ target: { value } }) {
    this.setState({
      selectedItem: value,
    });

    if (this.props.handleChange) {
      this.props.handleChange(value);
    }
  }

  render() {
    return (
      <label htmlFor={this.props.id} className="field field--dropdown">
        {this.props.label}:
        <select id={this.props.id} onChange={this.handleChange} className="field__input" >
          {this.props.items.map(({ label, value }) => (
            <option value={value} key={value} >{label}</option>
          ))}
        </select>
      </label>
    );
  }
}

Dropdown.propTypes = {
  id: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func
};

Dropdown.defaultProps = {
  value: '',
};
