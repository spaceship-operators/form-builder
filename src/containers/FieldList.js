import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setEditing, reorderField, removeField } from '../actions/actions.js';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

class SortableFieldList extends Component {
  constructor() {
    super();
    this.handleRemoveField = this.handleRemoveField.bind(this);
  }

  handleRemoveField(index) {
    if (window.confirm('Are you sure?')) {
      this.props.removeField(index);
    }
  }

  render() {
    const SortableItem = SortableElement(({field, itemIndex}) => {
      const Field = field.component;

      return (
        <Field
          editing={this.props.editing === itemIndex}
          index={itemIndex}
          id={`field-${itemIndex}`}
          {...field}
          handleEditField={this.props.setEditing}
          handleRemoveField={this.handleRemoveField}
        />
      );
    });

    const SortableList = SortableContainer(({items}) => {
      return (
        <div className="field-list">
          {items.map((field, index) => (
            <SortableItem key={`item-${index}`} index={index} itemIndex={index} field={field} />
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
  removeField
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SortableFieldList);
