import {ACTION_COSTS} from "../config/actionCosts.js";
import {craftingCost} from "../logic/craftingCost.js";
import {getItemById} from "../logic/getItemId.js";


export function render(state) {

    document.getElementById("gather-button").disabled = state.energy < ACTION_COSTS.GATHER_ENERGY;
    document.getElementById("hunt-button").disabled = state.energy < ACTION_COSTS.HUNT_ENERGY;
    document.getElementById("rest-button").disabled = state.resources.food < ACTION_COSTS.REST_FOOD || state.energy >= 100;

    const boat = [...state.itemInventory].some(id => id === 5);
    document.getElementById("sail-button").disabled = (state.energy < ACTION_COSTS.SAIL_ENERGY || !boat);

    document.getElementById("energy-bar").textContent = `${state.energy}%`;

    Object.entries(state.resources).forEach(([key, value]) => {
        document.getElementById(key).textContent = value.toString();
    });

    const selectedItem = getItemById(state.ui.selectedItemId, state.ui.availableTools);

    document.getElementById("crafting-tool-title").innerText = selectedItem.title;

    document.getElementById("crafting-description").innerText = selectedItem.description;

    const ul = document.getElementById("crafting-requirements");
    ul.innerHTML = "";

    selectedItem.requirements.forEach((requirement) => {
        const li = document.createElement("li");
        li.textContent = requirement;
        ul.appendChild(li);
    });

    document.getElementById("crafting-tool-image").src = selectedItem["img-url"];


    const craftedList = document.getElementById("inventory-list");

    craftedList.innerHTML = "";

    state.itemInventory.forEach((itemId) => {
        const li = document.createElement("li");
        li.innerText = `${getItemById(itemId, state.ui.availableTools).title}`;
        craftedList.appendChild(li);
    });

    if(state.energy < ACTION_COSTS.HUNT_ENERGY && state.energy < ACTION_COSTS.GATHER_ENERGY && state.resources.food < ACTION_COSTS.REST_FOOD) {
        alert("You are too tired to do anything! You died :(");
    }

    const sufficientResourcesForCrafting = Object.entries(craftingCost(state)).every(([key, value]) => {
        const survivorResource = state.resources?.[key] ?? 0;
        return survivorResource >= value;
    });

    const craftButton = document.getElementById("craft-button");
    craftButton.disabled = !sufficientResourcesForCrafting;
    if(state.itemInventory.has(state.ui.selectedItemId)) {
        craftButton.innerText = "Salvage";
        craftButton.disabled = true;
    } else {
        craftButton.innerText = "Craft";
    }

}