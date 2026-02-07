
export function getSelectedItem(state) {
    return state.ui.availableTools.filter(item => item.id === state.ui.selectedItemId)[0];
}