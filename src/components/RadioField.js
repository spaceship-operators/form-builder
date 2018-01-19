import React from 'react';
import PropTypes from 'prop-types';

export default class RadioField extends React.Component {
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
        <legend className="form-label">{this.props.label}</legend>
        {this.props.items.map(({ label, value }) => (
          <div className="form-check" key={value}>
            <label className="field field--radio form-check-label">
              <input type="radio" className="form-check-input" name={this.props.id} value={value} />
              {label}
            </label>
          </div>
        ))}
      </fieldset>
    );
  }
}

RadioField.propTypes = {
  id: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func
};

RadioField.defaultProps = {
  value: '',
  items: [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no'},
  ]
};
