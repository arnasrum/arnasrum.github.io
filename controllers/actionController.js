import { state } from "../state.js";
import { render } from "../render/render.js";
import {performGather} from "../logic/gather.js";
import {performHunt} from "../logic/hunt.js";
import {performRest} from "../logic/rest.js";
import {performSail} from "../logic/sail.js";

export function setUpActionHandlers() {
    document.getElementById("gather-button").addEventListener("click", () => {
        performGather(state);
        render(state);
    });
    document.getElementById("hunt-button").addEventListener("click", () => {
        performHunt(state);
        render(state);
    });
    document.getElementById("rest-button").addEventListener("click", () => {
        performRest();
        render(state);
    });
    document.getElementById("sail-button").addEventListener("click", () => {
        performSail();
        render(state);
        alert("You sail away!");
    });

}