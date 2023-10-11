import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "his game";
let counter: number = 1;
let displayCounter: number;
const buttonEmoj = "😀";
document.title = gameName;
const button = document.createElement("button");
const value = document.createElement("div");
button.innerHTML = buttonEmoj;
value.innerHTML = counter.toString() + " smiles...";

button.addEventListener("mousedown", function () {
    counter++;
});
let t0 = 0;
let t1;
let elapsed;
function increment() {
    t1 = performance.now();
    elapsed = t1 - t0;
    //converts it to 0.01 seconds (rather, converts it to the unit of seconds)
    elapsed *= 1 / 1000;
    //adds 0.01 seconds to counter
    counter += elapsed;
    displayCounter = Math.floor(counter);
    //here we take the time between two frames, then we add its difference to counter per frame.
    //through doing this we get 1 unit per second, working by converting milliseconds per difference and adding it
    value.innerHTML = displayCounter.toString() + " smiles...";
    t0 = performance.now();
    requestAnimationFrame(increment);
}
requestAnimationFrame(increment);
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
app.append(button);
app.append(value);
