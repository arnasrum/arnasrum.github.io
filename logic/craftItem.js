import {craftingCost} from "./craftingCost.js";
import {getItemById} from "./getItemId.js";


export function craftItem(state) {

    const selectedItem = getItemById(state.ui.selectedItemId, state.ui.availableTools);

    const selectedItemCraftingCost = craftingCost(state);

    const sufficientResources = Object.keys(selectedItemCraftingCost).every(key => state.resources[key] >= selectedItemCraftingCost[key]);
    if (!sufficientResources) return;

    Object.keys(selectedItemCraftingCost).forEach(key => state.resources[key] -= selectedItemCraftingCost[key]);
    state.itemInventory.add(selectedItem.id);

    state.activeEffects.add(selectedItem.effect);

}