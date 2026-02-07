import {gainResource, hasEnergy, spendEnergy} from "../state.js";
import {ACTION_COSTS} from "../config/actionCosts.js";
import {getRandomInt} from "../utils/getRandomInt.js";
import {RESOURCES} from "../config/resources.js";
import {actionMultiplier} from "./effects.js";

export function performHunt(state) {
    if(!hasEnergy(ACTION_COSTS.HUNT_ENERGY)) return;
    spendEnergy(ACTION_COSTS.HUNT_ENERGY)

    gainResource(RESOURCES.FOOD, getRandomInt(1, 20) * actionMultiplier(state, "hunt"))

    if(getRandomInt(1, 100) <= 10) gainResource(RESOURCES.RAREFANG, 1)
}