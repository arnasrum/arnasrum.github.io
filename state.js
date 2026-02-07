import { RESOURCES } from "./config/resources.js";

export const state = {
    resources: {
        [RESOURCES.WOOD]: 20,
        [RESOURCES.VINE]: 10,
        [RESOURCES.FOOD]: 30,
        [RESOURCES.STONE]: 20,
        [RESOURCES.RAREFANG]: 0,
        [RESOURCES.OBSIDIAN]: 0
    },
    energy: 70,
    itemInventory: new Set(), // Set<number>
    activeEffects: new Set(), // Set<Effect>

    ui: {
        selectedItemId: null,
        availableTools: []
    }
}

export function hasResource(resource, amount) {
    return Object.entries(state.resources).some(([key, value]) => key === resource && value >= amount)
}

export function hasEnergy(amount) {
    return state.energy >= amount;
}

export function spendResource(resource, amount) {
    state.resources[resource] -= amount;
}

export function gainResource(resource, amount) {
    state.resources[resource] += amount;
}

export function spendEnergy(amount) {
    state.energy = Math.max(state.energy - amount, 0);
}

export function gainEnergy(amount) {
    state.energy = Math.min(state.energy + amount, 100);
}

