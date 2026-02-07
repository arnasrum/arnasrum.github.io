import {state} from "../state.js";
import {render} from "../render/render.js";
import {craftItem} from "../logic/craftItem.js";


export function setUpCraftingHandlers() {
    document.getElementById("craft-button").addEventListener("click", () => {
        craftItem(state);
        render(state);
    })
    document.getElementById("craft-item-select").addEventListener("change", () => {
        state.ui.selectedItemId = Number(document.getElementById("craft-item-select").value);
        render(state);
    })


}