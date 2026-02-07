import {getSelectedItem} from "./getSelectedItem.js";

export function craftingCost(state) {

    const selectedItem = getSelectedItem(state);
    const selectedItemCraftingCost = {};
    selectedItem.requirements.forEach((requirement) => {
        const match = requirement.match(/^(\d+)\s+(.+)$/);
        if (!match) return;

        const amount = Number(match[1]);
        const itemLabel = match[2].trim();

        const resourceKey = itemLabel
            .toLowerCase()
            .split(/\s+/)
            .map((w, i) => (i === 0 ? w : w[0] + w.slice(1)))
            .join("");

        selectedItemCraftingCost[resourceKey] = amount;
    });
    return selectedItemCraftingCost;

}