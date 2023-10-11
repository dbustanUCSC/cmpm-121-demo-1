import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "his game";
let counter: number = 1;
const buttonEmoj = "😀";
document.title = gameName;
const button = document.createElement("button");
const value = document.createElement("div");
button.innerHTML = buttonEmoj;
value.innerHTML = counter.toString() + " smiles...";

button.addEventListener("mousedown", function () {
    increment();
});
let t0 = 0;
let t1;
let elapsed;
function increment() {
    t1 = performance.now();
    elapsed = t1 - t0;
    value.innerHTML = counter.toString() + " smiles...";
    //we know this is continously calling the same function, thus incrementing it
    //however we need a way to
    t0 = performance.now();
    requestAnimationFrame(increment);
}
//setInterval(increment, 100);
requestAnimationFrame(increment);
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
app.append(button);
app.append(value);
