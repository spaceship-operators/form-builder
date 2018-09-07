import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setEditing, reorderField, removeField, addFieldAfter } from '../actions/actions.js';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';

class SortableFieldList extends Component {
  constructor() {
    super();
    this.handleRemoveField = this.handleRemoveField.bind(this);
  }

  handleRemoveField(internalId) {
    if (window.confirm('Are you sure?')) {
      this.props.removeField(internalId);
    }
  }

  render() {
    const SortableItem = SortableElement(({field, index}) => {
      const Field = field.component;

      return (
        <Field
          editing={this.props.editing === field.internalId}
          id={field.internalId}
          internalId={field.internalId}
          {...field}
          handleEditField={this.props.setEditing}
          handleRemoveField={this.handleRemoveField}
          handleInlineAdd={this.props.addFieldAfter}
        />
      );
    });

    const SortableList = SortableContainer(({items, index}) => {
      return (
        <div className="field-list">
          {items.map((field, index) => (
            <SortableItem key={field.internalId} index={index} field={field} />
          ))}
        </div>
      );
    });

    return <SortableList helperClass="fieldwrapper--dragging" items={this.props.fields} onSortEnd={this.props.reorderField} />;
  }
}

const mapStateToProps = state => {
  const { fields, editing } = state;

  return {
    fields,
    editing
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  reorderField,
  setEditing,
  removeField,
  addFieldAfter,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SortableFieldList);
