export const changeSelectedField = value => ({type: 'CHANGE_SELECTED_FIELD', value});
export const addField = fieldType => ({type: 'ADD_FIELD', fieldType});
export const addFieldAfter = internalId => ({type: 'ADD_FIELD_AFTER', internalId});
export const setEditing = internalId => ({type: 'SET_EDITING', internalId});
export const updateField = (fieldId, fieldProps) => ({type: 'UPDATE_FIELD', fieldId, fieldProps});
export const removeField = internalId => ({type: 'REMOVE_FIELD', internalId});
export const reorderField = ({oldIndex, newIndex}) => ({type: 'REORDER_FIELD', oldIndex, newIndex});
