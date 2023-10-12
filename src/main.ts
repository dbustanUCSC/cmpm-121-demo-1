import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "our game";

document.title = gameName;
const smile = document.createElement("button");
const smileEmoj = "😀";
smile.innerHTML = smileEmoj;
const value = document.createElement("div");

let counter: number = 0;
value.innerHTML = "No smiles...";
smile.addEventListener("mousedown", function () {
    counter++;
});

const upgrade1Button = document.createElement("button");
const upgrade2Button = document.createElement("button");
const upgrade3Button = document.createElement("button");

const buttonContainer = document.createElement("div");
buttonContainer.classList.add("button-container");

buttonContainer.appendChild(upgrade1Button);
buttonContainer.appendChild(upgrade2Button);
buttonContainer.appendChild(upgrade3Button);

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
app.append(smile);
app.append(value);
app.append(upgrade1Button);
app.append(upgrade2Button);
app.append(upgrade3Button);

let costForUpgrade1 = 10;
let costForUpgrade2 = 100;
let costForUpgrade3 = 1000;
let growthRate = 0.0;

let lastTime = 0;

function tick(now: number) {
    const elapsed = now - lastTime;
    lastTime = now;
    counter += (growthRate * elapsed) / 1000;

    //here we take the time between two frames, then we add its difference to counter per frame.
    //through doing this we get 1 unit per second, working by converting milliseconds per difference of a frame and adding it
    checkCounterLogic();
    requestAnimationFrame(tick);
}
function checkCounterLogic() {
    if (counter > 0) {
        value.innerHTML = counter.toFixed(2) + " smiles...";
    }
    upgrade1Button.disabled = counter < costForUpgrade1;
    upgrade2Button.disabled = counter < costForUpgrade2;
    upgrade3Button.disabled = counter < costForUpgrade3;
}
requestAnimationFrame(tick);

let upgrade1Emoj = " 🥸 " + "<br/> costs: " + costForUpgrade1 + " smiles!";
upgrade1Button.innerHTML = upgrade1Emoj;
upgrade1Button.addEventListener("mousedown", function () {
    upgrade1Purchase();
});
let upgrade2Emoji = "is it time  🤡 " + "<br/> costs: " + costForUpgrade2 + " smiles!";
upgrade2Button.innerHTML = upgrade2Emoji;

upgrade2Button.addEventListener("mousedown", function () {
    upgrade2Purchase();
});

upgrade3Button.addEventListener("mousedown", function () {
    upgrade3Purchase();
});

let upgrade3Emoji = "Cmon!.. choose me :)" + "<br/> costs: " + costForUpgrade3 + " smiles!";
upgrade3Button.innerHTML = upgrade3Emoji;
let upgrade1Counter: number = 0;
function upgrade1Purchase() {
    counter -= costForUpgrade1;
    upgrade1Counter++;
    costForUpgrade1 *= 1.15;
    costForUpgrade1 = Number(costForUpgrade1.toFixed(2));
    if (upgrade1Counter > 1) {
        upgrade1Emoj = "you are a fool. 🤕 " + "<br/> costs: " + costForUpgrade1 + " smiles";
    } else {
        upgrade1Emoj = "Help... 🥸" + "<br/> costs: " + costForUpgrade1 + " smiles?";
    }

    upgrade1Button.innerHTML = upgrade1Emoj;
    growthRate += 0.1;
}

function upgrade2Purchase() {
    counter -= costForUpgrade2;
    costForUpgrade2 *= 1.15;
    let upgrade2Counter: number = 0;
    upgrade2Counter++;

    costForUpgrade2 = Number(costForUpgrade2.toFixed(2));
    if (upgrade2Counter > 4) {
        upgrade2Emoji = "STOP. Why do this to us?" + "<br/> costs: " + costForUpgrade2 + " smiles.";
    } else {
        upgrade2Emoji =
            "I don't know if this is right. 😬😬 " +
            "<br/> costs: " +
            costForUpgrade2 +
            " smiles..";
    }
    upgrade2Button.innerHTML = upgrade2Emoji;
    growthRate += 2;
}

function upgrade3Purchase() {
    let upgrade3Counter: number = 0;
    upgrade3Counter++;
    console.debug(upgrade3Counter);
    counter -= costForUpgrade3;
    costForUpgrade3 *= 1.15;
    costForUpgrade3 = Number(costForUpgrade3.toFixed(2));
    upgrade3Emoji = "HELP!!!! 🎃" + "<br/> costs: " + costForUpgrade3 + " smiles.";
}
