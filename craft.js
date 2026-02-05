// import {resources, itemInventory} from "./survivorState.js";

`
item: 
{
"id": number,
"title": string,
"description": string,
"requirements": string[],
"effect": string,
"img-url": string 
}
`

let availableTools = [];
let selectedItem = null;
let selectedItemCraftingCost = {};

const selectElement = document.getElementById("craft-item-select");
const craftButton = document.getElementById("craft-button");
selectElement.addEventListener("change", selectItem)
craftButton.addEventListener("click", handleCraftClick)

fetch("https://thoughtful-vagabond-fibre.glitch.me")
    .then((response) => response.json())
    .then((data) => {
        availableTools = data;
        return data;
    })
    .then(tools => {
        selectElement.innerHTML = "";
        tools.forEach((item) => {
            const option = document.createElement("option");
            option.value = item.id;
            option.textContent = item.title;
            selectElement.appendChild(option);
        });
    })
    .then(selectItem)
    .catch((err) => console.error(err));

function selectItem() {

    selectedItem = availableTools.filter((item) => item["id"] === Number(selectElement.value))[0];

    document.querySelector("#crafting-tool h3").innerText = selectedItem["title"];

    document.getElementById("crafting-description").innerText = selectedItem["description"];

    const ul = document.getElementById("crafting-requirements");
    ul.innerHTML = "";

    selectedItem["requirements"].forEach((requirement) => {
        const li = document.createElement("li");
        li.textContent = requirement;
        ul.appendChild(li);
    });

    document.getElementById("crafting-tool-image").src = selectedItem["img-url"];


    selectedItemCraftingCost = {};
    selectedItem["requirements"].forEach((requirement) => {
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

    const sufficientResourcesForCrafting = Object.entries(selectedItemCraftingCost).every(([key, value]) => {
        const survivorResource = resources?.[key] ?? 0;
        return survivorResource >= value;
    });

    craftButton.disabled = !sufficientResourcesForCrafting;
    //itemInventory.has(selectedItem) ? (craftButton.innerText = "Salvage") : (craftButton.innerText = "Craft");
    if(itemInventory.has(selectedItem)) {
        craftButton.innerText = "Salvage";
        craftButton.disabled = true;
    } else {
        craftButton.innerText = "Craft";
    }

}


function handleCraftClick() {

    const sufficientResources = Object.keys(selectedItemCraftingCost).every(key => resources[key] >= selectedItemCraftingCost[key]);
    if (!sufficientResources) return;

    Object.keys(selectedItemCraftingCost).forEach(key => resources[key] -= selectedItemCraftingCost[key]);
    itemInventory.add(selectedItem);

    itemInventory.forEach(item => activeEffects.add(item["effect"]));

    selectItem();
    updateSurvivorUI();
}