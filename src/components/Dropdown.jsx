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
    this.props.handleChange(value);
  }

  render() {
    return (
      <div className="form-group">
        <label htmlFor={this.props.id} className="field field--dropdown">
          {this.props.label}
        </label>
        <select
          id={this.props.id}
          onChange={this.handleChange}
          className="field__input form-control"
        >
          {this.props.items.map(({ label, value }) => (
            <option value={value} key={value} >{label}</option>
          ))}
        </select>
      </div>
    );
  }
}

Dropdown.propTypes = {
  id: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
  label: PropTypes.string,
  handleChange: PropTypes.func,
};

Dropdown.defaultProps = {
  handleChange: () => {},
  label: 'Dropdown Label',
  items: [
    { label: 'Option 1', value: 'option1' },
  ],
};
