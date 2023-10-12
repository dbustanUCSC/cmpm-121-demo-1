import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "his game";

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

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
app.append(smile);
app.append(value);
app.append(upgrade1Button);

let costForUpgrade1 = 10;
let growthRate = 0.0;

let lastTime = 0;

function tick(now: number) {
    const elapsed = now - lastTime;
    lastTime = now;
    counter += (growthRate * elapsed) / 1000;

    //here we take the time between two frames, then we add its difference to counter per frame.
    //through doing this we get 1 unit per second, working by converting milliseconds per difference of a frame and adding it
    if (counter > 0) {
        value.innerHTML = counter.toFixed(2) + " smiles...";
    }
    requestAnimationFrame(tick);
}

requestAnimationFrame(tick);

let upgrade1Emoj = "Please help... 🥸 \n costs: " + costForUpgrade1;
upgrade1Button.innerHTML = upgrade1Emoj;
upgrade1Button.addEventListener("mousedown", function () {
    if (counter >= costForUpgrade1) {
        upgrade1Purchase();
    }
});
function upgrade1Purchase() {
    costForUpgrade1 *= 1.15;
    counter -= costForUpgrade1;
    upgrade1Emoj = "Please help... 🥸 :). \n costs:" + costForUpgrade1;
    upgrade1Button.innerHTML = upgrade1Emoj;
    console.log(costForUpgrade1);
    growthRate += 0.1;
}
