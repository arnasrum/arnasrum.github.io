
const GATHER_ENERGY_COST = 10;
const HUNT_ENERGY_COST = 20;
const REST_FOOD_COST = 10;
const SAIL_ENERGY_COST = 40;

let gatherWoodMultiplier = 1;
let huntFoodMultiplier = 1;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function handleGatherClick() {
    if(energy < GATHER_ENERGY_COST) return;
    energy -= GATHER_ENERGY_COST;
    resources.vine += getRandomInt(1, 10);
    resources.food += getRandomInt(1, 10);
    resources.wood += getRandomInt(1, 10) * gatherWoodMultiplier;
    resources.stone += getRandomInt(1, 5);
    if(getRandomInt(1, 100) <= 10)
        resources.obsidian += 1;
    updateSurvivorUI();
}

function handleHuntClick() {
    if(resources.food < HUNT_ENERGY_COST) return;
    energy -= HUNT_ENERGY_COST;
    resources.food += getRandomInt(1, 20) * huntFoodMultiplier;
    if(getRandomInt(1, 100) <= 10)
        resources.rarefang += 1;
    updateSurvivorUI();
}

function handleRestClick() {
    if(resources.food < REST_FOOD_COST) return;
    energy += getRandomInt(1, 20);
    energy = Math.min(energy, 100);
    resources.food -= REST_FOOD_COST;
    updateSurvivorUI();
}

function handleSailClick() {
    if(energy < SAIL_ENERGY_COST) return;
    energy -= 40;
    updateSurvivorUI();
    alert("You sail away!");
}


function updateSurvivorUI() {

    document.getElementById("gather-button").disabled = energy < GATHER_ENERGY_COST;
    document.getElementById("hunt-button").disabled = energy < HUNT_ENERGY_COST;
    document.getElementById("rest-button").disabled = resources.food < REST_FOOD_COST || energy >= 100;

    const boat = [...itemInventory].map(item => item.id).some(id => id === 5);
    document.getElementById("sail-button").disabled = (energy < SAIL_ENERGY_COST || !boat);

    document.getElementById("energy-bar").textContent = `${energy}%`;

    Object.entries(resources).forEach(([key, value]) => {
        document.getElementById(key).textContent = value.toString();
    });


    const craftedList = document.getElementById("inventory-list");

    craftedList.innerHTML = "";

    itemInventory.forEach((item) => {
        const li = document.createElement("li");
        li.innerText = `${item.title}`;
        craftedList.appendChild(li);
    });

    itemInventory.forEach((item) => {
        activeEffects.add(item["effect"]);
    })

    if(activeEffects.has("double_wood")) gatherWoodMultiplier = 2;
    if(activeEffects.has("quadruple_wood")) gatherWoodMultiplier = 4;
    if(activeEffects.has("double_hunt")) huntFoodMultiplier = 2;
    if(activeEffects.has("quadruple_hunt")) huntFoodMultiplier = 4;

}

document.getElementById("gather-button").addEventListener("click", handleGatherClick);
document.getElementById("hunt-button").addEventListener("click", handleHuntClick);
document.getElementById("rest-button").addEventListener("click", handleRestClick);
document.getElementById("sail-button").addEventListener("click", handleSailClick);


updateSurvivorUI();
