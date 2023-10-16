import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
let gameName = "our game";

document.title = gameName;
const smile = document.createElement("button");
let smileEmoj = "😀 ";
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
    amountpurchased: number;
    description: string;
}

const availableItems: Item[] = [
    { name: "Help... 🥸", cost: 10, rate: 0.1, amountpurchased: 0, description: "help me." },
    {
        name: "is it time  🤡 ? ",
        cost: 100,
        rate: 2,
        amountpurchased: 0,
        description: "I don't know!",
    },
    {
        name: "Cmon! choose me :) ",
        cost: 1000,
        rate: 50,
        amountpurchased: 0,
        description: "You should.",
    },
    {
        name: "If you buy me you will regret it. ",
        cost: 10000,
        rate: 100,
        amountpurchased: 0,
        description: "I promise.",
    },
    {
        name: "The creator.",
        cost: 100000,
        rate: 1000,
        amountpurchased: 0,
        description: "The one and only.",
    },
];
const buttons: HTMLButtonElement[] = [];
//used to make buttons for each item, and assigning them the function
availableItems.forEach((item, index) => {
    //go through each element, creating a button associating to the item
    const itemButton = document.createElement("button");
    itemButton.addEventListener("mousedown", () => upgradePurchase(index));
    itemButton.innerHTML = `<strong>${item.name} costs: (${item.cost} smiles!)</strong> <br/> ${item.description}`;
    app.append(itemButton);
    buttons.push(itemButton);
});

let totalUpgrades = 0;
function upgradePurchase(index: number) {
    const item = availableItems[index];
    counter -= item.cost;
    item.cost *= 1.15;
    item.cost = Number(item.cost.toFixed(2));
    item.amountpurchased++;
    buttons[
        index
    ].innerHTML = `<strong>${item.name} costs: (${item.cost} smiles!)</strong> <br/> ${item.description}`;
    growthRate += item.rate;
    totalUpgrades++;
    if (index == 3) {
        buttons[0].innerHTML = `You regret it... costs: (${availableItems[0].cost} smiles)`;
        buttons[1].innerHTML = `You regret it... costs:  (${availableItems[1].cost} smiles)`;
        buttons[2].innerHTML = `You regret it... costs: (${availableItems[2].cost} smiles)`;
    }
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
    if (totalUpgrades >= 100 || availableItems[4].amountpurchased >= 1) {
        buttons[0].innerHTML = `I'm dying. (${availableItems[0].cost} demon smiles)`;
        buttons[1].innerHTML = `Keep going 👹 costs: ${availableItems[1].cost} smiles! smiles smiles smiles`;
        buttons[2].innerHTML = `I'm dying. (${availableItems[2].cost} demon smiles)`;
        buttons[3].innerHTML = `I'm dying. (${availableItems[3].cost} demon smiles)`;
        buttons[4].innerHTML = `I'm dying. (${availableItems[4].cost} demon smiles)`;
        smileEmoj = "👺";
        smile.innerHTML = smileEmoj;
        value.innerHTML =
            counter.toFixed(2) +
            " demon smiles..." +
            "<br/>" +
            growthRate.toFixed(2) +
            " per second";
    }
    if (counter > 10000) {
        gameName = "your game.";
        document.title = gameName;
        header.innerHTML = gameName;
    }
}

requestAnimationFrame(tick);
