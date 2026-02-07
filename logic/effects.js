

export function actionMultiplier(state, action) {

    if(action === "gather") {
        if(state.activeEffects.has("quadruple_wood"))
            return 4;
        else if (state.activeEffects.has("double_wood"))
            return 2;
        else
            return 1;
    }
    if(action === "hunt") {
        if(state.activeEffects.has("quadruple_hunt"))
            return 4;
        else if (state.activeEffects.has("double_hunt"))
            return 2;
        else
            return 1;
    }
}