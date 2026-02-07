import {gainResource, hasEnergy, spendEnergy} from "../state.js";
import {ACTION_COSTS} from "../config/actionCosts.js";
import {getRandomInt} from "../utils/getRandomInt.js";
import {RESOURCES} from "../config/resources.js";
import {actionMultiplier} from "./effects.js";

export function performGather(state) {
    if(!hasEnergy(ACTION_COSTS.GATHER_ENERGY)) return;

    spendEnergy(ACTION_COSTS.GATHER_ENERGY);
    gainResource(RESOURCES.VINE, getRandomInt(1, 10))
    gainResource(RESOURCES.FOOD, getRandomInt(1, 10))
    gainResource(RESOURCES.WOOD, getRandomInt(1, 10) * actionMultiplier(state, "gather"))
    gainResource(RESOURCES.STONE, getRandomInt(1, 5))

    if(getRandomInt(1, 100) <= 10) gainResource(RESOURCES.OBSIDIAN, 1)
}