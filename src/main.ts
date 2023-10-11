import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "his game";
let counter: number = 0;
const buttonEmoj = "😀";
document.title = gameName;
const button = document.createElement("button");
const value = document.createElement("div");
button.innerHTML = buttonEmoj;
value.innerHTML = counter.toString() + " smiles...";

button.addEventListener("mousedown", function () {
    increment();
});
function increment() {
    counter++;
    value.innerHTML = counter.toString() + " smiles...";
}
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
app.append(button);
app.append(value);
