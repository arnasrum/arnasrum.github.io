`
item: 
{
"id": number,
"title": string,
"description": string,
"requirements": string[],
"effect": string,
"img-url": string 
}
`

let tools = [];
let selectedItem = null;

const selectElement = document.getElementById("craft-item-select");
selectElement.addEventListener("change", selectItem)

fetch("https://thoughtful-vagabond-fibre.glitch.me")
  .then((response) => response.json())
  .then((data) => {
    tools = data;

    selectElement.innerHTML = "";

    data.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = item.title;
      selectElement.appendChild(option);
    });
  })
  .then(() => console.log(tools))
  .catch((err) => console.error(err));

function selectItem() {

    selectedItem = tools.filter((item) => item["id"] === Number(selectElement.value))[0];

    console.log("selected item", selectedItem);

    document.getElementById("crafting-tool-info").hidden = false;

    document.querySelector("#crafting-tool h3").innerText = selectedItem["title"];

    document.getElementById("crafting-description").innerText = selectedItem["description"];

    const ul = document.getElementById("crafting-requirements");
    ul.innerHTML = "";

    selectedItem["requirements"].forEach((requirement) => {
        const li = document.createElement("li");
        li.textContent = requirement;
        ul.appendChild(li);
    });


    document.getElementById("crafting-tool-image").src = selectedItem["img-url"];

    //updateSurvivorUI();
}