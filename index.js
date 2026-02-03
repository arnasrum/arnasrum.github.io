
const GATHER_ENERGY_COST = 10;
const HUNT_ENERGY_COST = 20;
const REST_FOOD_COST = 10;

let gatherWoodMultiplier = 1;
let stoneMultiplier = 1;
let huntFoodMultiplier = 1;

const resources = { wood: 20, vines: 10, food: 30, stone: 20 };
const craftedItems= [];
let energy = 70;

document.getElementById("sail-button").disabled = true;

function getRandomInt(min, max) {
  return Math.max(min, Math.floor(Math.random() * (max + 1)));
}

function handleGatherClick() {
  energy -= GATHER_ENERGY_COST;
  resources.wood += getRandomInt(1, 10);
  resources.food += getRandomInt(1, 10);
  resources.wood += getRandomInt(1, 10) * gatherWoodMultiplier;
  resources.stone += getRandomInt(1, 5);
  updateSurvivorUI();
}

function handleHuntClick() {
  energy -= HUNT_ENERGY_COST;
  resources.food += getRandomInt(1, 20) * huntFoodMultiplier;
  updateSurvivorUI();
}

function handleRestClick() {
  energy += getRandomInt(1, 20);
  energy = Math.min(energy, 100);
  resources.food -= 10;
  updateSurvivorUI();
}

function handleSailClick() {
  energy -= 40;
  updateSurvivorUI();
  alert("You sail away!");
}


function updateSurvivorUI() {

  document.getElementById("gather-button").disabled = energy < GATHER_ENERGY_COST;
  document.getElementById("hunt-button").disabled = energy < HUNT_ENERGY_COST;
  document.getElementById("rest-button").disabled = resources.food < REST_FOOD_COST || energy >= 100;
  document.getElementById("sail-button").disabled = resources.food < REST_FOOD_COST;

  document.getElementById("energy-bar").textContent = `${energy}%`;

  Object.entries(resources).forEach(([key, value]) => {
    document.getElementById(key).textContent = value.toString();
  });


  const craftedList = document.getElementById("inventory-list");

  craftedList.innerHTML = "";

  // Fix this
  Object.entries(craftedItems).forEach(([itemName]) => {
    const li = document.createElement("li");
    li.textContent = `${itemName}`;
    craftedList.appendChild(li);
  });
}


document.getElementById("gather-button").addEventListener("click", handleGatherClick);
document.getElementById("hunt-button").addEventListener("click", handleHuntClick);
document.getElementById("rest-button").addEventListener("click", handleRestClick);
document.getElementById("sail-button").addEventListener("click", handleSailClick);


updateSurvivorUI();
