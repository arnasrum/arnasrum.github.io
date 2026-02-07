import {craftingCost} from "./craftingCost.js";
import {getSelectedItem} from "./getSelectedItem.js";


export function craftItem(state) {

    const selectedItem = getSelectedItem(state);

    const selectedItemCraftingCost = craftingCost(state);

    const sufficientResources = Object.keys(selectedItemCraftingCost).every(key => state.resources[key] >= selectedItemCraftingCost[key]);
    if (!sufficientResources) return;

    Object.keys(selectedItemCraftingCost).forEach(key => state.resources[key] -= selectedItemCraftingCost[key]);
    state.itemInventory.add(selectedItem.id);

    state.activeEffects.add(selectedItem.effect);

}