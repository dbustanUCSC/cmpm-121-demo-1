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
    nameafterbutton3: string;
    nameafterswitchup: string;
    cost: number;
    rate: number;
    amountpurchased: number;
    description: string;
}

const availableItems: Item[] = [
    {
        name: "Help... 🥸",
        nameafterbutton3: "You regret it...",
        nameafterswitchup: "I'm dying. ",
        cost: 10,
        rate: 0.1,
        amountpurchased: 0,
        description: "help me.",
    },
    {
        name: "is it time  🤡 ? ",
        nameafterbutton3: "You regret it...",
        nameafterswitchup: "Keep going 👹 ",
        cost: 100,
        rate: 2,
        amountpurchased: 0,
        description: "I don't know!",
    },
    {
        name: "Cmon! choose me :) ",
        nameafterbutton3: "You regret it...",
        nameafterswitchup: "I'm dying. ",
        cost: 1000,
        rate: 50,
        amountpurchased: 0,
        description: "You should.",
    },
    {
        name: "If you buy me you will regret it. ",
        nameafterbutton3: "If you buy me you will regret it.",
        nameafterswitchup: "I'm dying. ",
        cost: 10000,
        rate: 100,
        amountpurchased: 0,
        description: "I promise.",
    },
    {
        name: "The creator.",
        nameafterbutton3: "The creator",
        nameafterswitchup: "I'm dying. ",
        cost: 100000,
        rate: 1000000,
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
    buttons[index].innerHTML = `<strong>${item.name} costs: (${item.cost} smiles!)</strong> <br/> ${item.description}`;
    growthRate += item.rate;
    totalUpgrades++;
    //special case
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
        textChanges(index);
    });

    requestAnimationFrame(tick);
}
function textChanges(indexCheck: number) {
    if (counter > 0) {
        value.innerHTML = counter.toFixed(2) + " smiles..." + "<br/>";
    }
    if (totalUpgrades > 0) {
        value.innerHTML = counter.toFixed(2) + " smiles" + "<br/>" + growthRate.toFixed(2) + " per second.";
    }
    if (totalUpgrades >= 100 || availableItems[4].amountpurchased >= 1) {
        availableItems.forEach((item, index) => {
            if (index == 1) {
                buttons[index].innerHTML = `${item.nameafterswitchup} ${item.cost} smiles! smiles smiles smiles`;
            } else {
                buttons[index].innerHTML = `${item.nameafterswitchup} (${item.cost} demon smiles)`;
            }
        });
        smileEmoj = "👺";
        smile.innerHTML = smileEmoj;
        value.innerHTML = counter.toFixed(2) + " demon smiles..." + "<br/>" + growthRate.toFixed(2) + " per second";
    }
    if (indexCheck == 3 && availableItems[3].amountpurchased >= 1) {
        for (let i = 0; i < availableItems.length - 1; i++) {
            let item: Item = availableItems[i];
            buttons[i].innerHTML = `${item.nameafterbutton3} costs: (${item.cost} smiles)`;
        }
    }
    if (counter > 10000) {
        gameName = "your game.";
        document.title = gameName;
        header.innerHTML = gameName;
    }
}

requestAnimationFrame(tick);
