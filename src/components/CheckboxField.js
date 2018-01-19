import React from 'react';
import PropTypes from 'prop-types';

export default class CheckboxField extends React.Component {
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
      <fieldset className="form-group">
        <legend>{this.props.label}</legend>
        {this.props.items.map(({ label, value }) => (
          <div className="form-check" key={value}>
            <label className="field field--checkbox form-check-label">
              <input type="checkbox" className="form-check-input" name={this.props.id} value={value} key={value} />
              {label}
            </label>
          </div>
        ))}
      </fieldset>
    );
  }
}

CheckboxField.propTypes = {
  id: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func
};

CheckboxField.defaultProps = {
  value: '',
  items: [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no'},
  ]
};
