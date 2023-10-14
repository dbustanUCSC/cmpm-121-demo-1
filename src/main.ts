import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "our game";

document.title = gameName;
const smile = document.createElement("button");
let smileEmoj = "😀";
smile.innerHTML = smileEmoj;
const value = document.createElement("div");

let counter: number = 0;
value.innerHTML = "No smiles...";
smile.addEventListener("mousedown", function () {
    counter++;
});

const header = document.createElement("h1");
header.innerHTML = gameName;

app.append(header);
app.append(smile);
app.append(value);

interface Item {
    name: string;
    cost: number;
    rate: number;
}

const availableItems: Item[] = [
    { name: "Help... 🥸 costs:", cost: 10, rate: 0.1 },
    { name: "is it time  🤡 ? costs:", cost: 100, rate: 2 },
    { name: "Cmon! choose me :) costs:", cost: 1000, rate: 50 },
];
const buttons: HTMLButtonElement[] = [];
availableItems.forEach((item, index) => {
    //go through each element, creating a button associating to the item
    const itemButton = document.createElement("button");
    //adding an eventlistener to deal with purchases, passing index inorder to find item prices
    itemButton.addEventListener("mousedown", () => upgradePurchase(index));
    itemButton.innerHTML = `${item.name} (${item.cost} smiles!)`;
    app.append(itemButton);
    //hopefully this works
    buttons.push(itemButton);
});

let totalUpgrades = 0;
function upgradePurchase(index: number) {
    const item = availableItems[index];
    counter -= item.cost;
    item.cost *= 1.15;
    item.cost = Number(item.cost.toFixed(2));
    buttons[index].innerHTML = `${item.name} (${item.cost} smiles!)`;
    growthRate += item.rate;
    totalUpgrades++;
}

let growthRate = 0.0;

let lastTime = 0;

function tick(now: number) {
    const elapsed = now - lastTime;
    lastTime = now;
    //takes care of growth rate multiplier (factoring time elapsed by growth rate so in each frame the amount added to counter is larger. essentially a multiplier to a timer)
    counter += (growthRate * elapsed) / 1000;

    //here we take the time between two frames, then we add its difference to counter per frame.
    //through doing this we get 1 unit per second, working by converting milliseconds per difference of a frame and adding it
    availableItems.forEach((item, index) => {
        if (counter < item.cost) {
            buttons[index].disabled = true;
        } else {
            buttons[index].disabled = false;
        }
    });
    textChanges();
    requestAnimationFrame(tick);
}
function textChanges() {
    if (counter > 0) {
        value.innerHTML = counter.toFixed(2) + " smiles..." + "<br/>";
    }
    if (totalUpgrades > 0) {
        value.innerHTML =
            counter.toFixed(2) + " smiles" + "<br/>" + growthRate.toFixed(2) + " per second.";
    }
    if (totalUpgrades >= 3) {
        buttons[0].innerHTML = `YOU ARE Destroying me: (${availableItems[0].cost} smiles. smiles. smiles)`;
    }
    if (totalUpgrades >= 5) {
        buttons[1].innerHTML = `Keep going 👹 costs: (${availableItems[1].cost} smiles! smiles smiles smiles)`;
    }
    if (totalUpgrades >= 50) {
        buttons[0].innerHTML = `I'm dying. (${availableItems[0].cost} demon smiles)`;
        buttons[1].innerHTML = `Keep going 👹 costs: ${availableItems[1].cost} smiles! smiles smiles smiles`;
        buttons[2].innerHTML = `I'm dying. (${availableItems[2].cost} demon smiles)`;
        smileEmoj = "👺";
        smile.innerHTML = smileEmoj;
        value.innerHTML = counter.toFixed(2) + " demon smiles..." + "<br/>";
    }
}

requestAnimationFrame(tick);
