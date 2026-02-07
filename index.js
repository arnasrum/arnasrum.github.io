import {setUpActionHandlers} from "./controllers/actionController.js";
import {state} from "./state.js";
import {render} from "./render/render.js";
import {setUpCraftingHandlers} from "./controllers/craftingController.js";

fetch("https://thoughtful-vagabond-fibre.glitch.me")
    .then((response) => response.json())
    .then((data) => {
        state.ui.availableTools = data;
        return data;
    })
    .then(tools => {
        document.getElementById("craft-item-select").innerHTML = "";
        tools.forEach((item) => {
            const option = document.createElement("option");
            option.value = item.id;
            option.textContent = item.title;
            document.getElementById("craft-item-select").appendChild(option);
        });
    })
    .then(() => state.ui.selectedItemId = state.ui.availableTools[0].id)
    .then(() => setUpActionHandlers())
    .then(() => setUpCraftingHandlers())
    .then(() => render(state))
    .catch((err) => console.error(err));
