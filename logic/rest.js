import {gainEnergy, hasResource, spendResource} from "../state.js";
import {RESOURCES} from "../config/resources.js";
import {ACTION_COSTS} from "../config/actionCosts.js";
import {getRandomInt} from "../utils/getRandomInt.js";


export function performRest() {
    if(!hasResource(RESOURCES.FOOD, ACTION_COSTS.REST_FOOD)) return;
    spendResource(RESOURCES.FOOD, ACTION_COSTS.REST_FOOD)
    gainEnergy(getRandomInt(1, 20))
}