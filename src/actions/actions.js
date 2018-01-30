export const changeSelectedField = value => ({type: 'CHANGE_SELECTED_FIELD', value});
export const addField = fieldType => ({type: 'ADD_FIELD', fieldType});
export const setEditing = index => ({type: 'SET_EDITING', index});
export const updateField = (fieldId, fieldProps) => ({type: 'UPDATE_FIELD', fieldId, fieldProps});
export const removeField = index => ({type: 'REMOVE_FIELD', index});
export const reorderField = ({oldIndex, newIndex}) => ({type: 'REORDER_FIELD', oldIndex, newIndex});
