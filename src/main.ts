import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "his game";
//button img
const buttonEmoj = "😀";
document.title = gameName;
const button = document.createElement("button");
//setting button prop
button.innerHTML = buttonEmoj;
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
app.append(button);
