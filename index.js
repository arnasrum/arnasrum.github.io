
const resources = {"wood": 20, "vines": 10, "food": 30, "stone": 20, "energy": 70}
let energy = 70;

function updateSurvivorUI() {
    for (const [key, value] of Object.entries(resources)) {
        document.getElementById(key).textContent = value.toString();
    }
}

updateSurvivorUI();
