import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { setEditing, reorderField, removeField } from '../actions/actions.js';

class SortableFieldList extends Component {
  constructor() {
    super();
    this.handleRemoveField = this.handleRemoveField.bind(this);
  }

  handleRemoveField(internalId) {
    if (window.confirm('Are you sure?')) { // eslint-disable-line no-alert
      this.props.removeField(internalId);
    }
  }

  render() {
    const SortableItem = SortableElement(({ field }) => {
      const Field = field.component;

      return (
        <Field
          editing={this.props.editing === field.internalId}
          id={field.internalId}
          internalId={field.internalId}
          {...field}
          handleEditField={this.props.setEditing}
          handleRemoveField={this.handleRemoveField}
        />
      );
    });

    const SortableList = SortableContainer(({ items }) => (
      <div className="field-list">
        {items.map((field, index) => (
          <SortableItem key={field.internalId} index={index} field={field} />
        ))}
      </div>
    ));

    return (<SortableList
      helperClass="fieldwrapper--dragging"
      items={this.props.fields}
      onSortEnd={this.props.reorderField}
    />);
  }
}

SortableFieldList.propTypes = {
  removeField: PropTypes.func.isRequired,
  editing: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]).isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape).isRequired,
  reorderField: PropTypes.func.isRequired,
  setEditing: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { fields, editing } = state;

  return {
    fields,
    editing,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  reorderField,
  setEditing,
  removeField,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SortableFieldList);
