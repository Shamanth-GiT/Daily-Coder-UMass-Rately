import { statboard } from './statusboard.js'

let ls = window.localStorage;

// DOM Extractions
let time = document.getElementById("current-time");
let date = document.getElementById("current-date");
let modal = document.getElementById("exampleModalToggle");
let modalButton = document.getElementById("modal-opener");
let submit = document.getElementById("submit");
const currCrowd = document.getElementById("curr-crowd");
const boardElem = document.getElementById("data-reports");
let floor = document.getElementById("floor-input");
let crowd = document.getElementById("crowd-input");
let description = document.getElementById("description");
let floorLev = document.getElementById("floorLev");
let crowdLev = document.getElementById("crowdLev");
const continual1 = document.getElementById("continual_1");
const continual2 = document.getElementById("continual_2");
const descBoard = document.getElementById("desc-reports");
// Setting the current date and time
setInterval(() => {
    let t = new Date();
    time.innerHTML = t.toLocaleTimeString();
}, 1000);
let d = new Date();
date.innerHTML = d.toLocaleDateString();

window.onload= async function (){
    modalButton.click();
    await statboard.render(boardElem);
};

modalButton.style.visibility = 'hidden';


currCrowd.addEventListener("click", async () => {
    await statboard.renderWithTitle(boardElem);
    await statboard.renderDescriptions(descBoard);
});

submit.addEventListener("click", async () => {
    let ts = new Date();
    console.log(description.value);
    await statboard.saveStatus(ts.toLocaleTimeString(), ts.toLocaleDateString(), floor.value , crowd.value, description.value);
    boardElem.innerHTML = '';
    await statboard.render(boardElem);
});

continual2.addEventListener("click", async () => {
    let ts = new Date();
    console.log(floorLev.value);
    await statboard.saveStatus(ts.toLocaleTimeString(), ts.toLocaleDateString(), floorLev.value , crowdLev.value, '');
    await statboard.render(boardElem);
});
await statboard.showMessage(document.getElementById("message"));