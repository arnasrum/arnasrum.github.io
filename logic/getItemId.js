
export function getItemById(itemId, availableItems) {
    return availableItems.filter(item => item.id === itemId)[0];
}