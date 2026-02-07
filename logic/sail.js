import {hasEnergy, spendEnergy} from "../state.js";
import {ACTION_COSTS} from "../config/actionCosts.js";


export function performSail() {
    if(!hasEnergy(ACTION_COSTS.SAIL_ENERGY)) return;
    spendEnergy(ACTION_COSTS.SAIL_ENERGY)
}