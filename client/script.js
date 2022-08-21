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
    await statboard.renderDescriptions(descBoard);
};

modalButton.style.visibility = 'hidden';


currCrowd.addEventListener("click", async () => {
    await statboard.showMessage(document.getElementById("message"));
});

submit.addEventListener("click", async () => {
    if(floor.value >= 0 && crowd.value >= 0 && description.value.length > 0){
        let ts = new Date();
        console.log(description.value);
        await statboard.saveStatus(ts.toLocaleTimeString(), ts.toLocaleDateString(), floor.value , crowd.value, description.value);
        boardElem.innerHTML = '';
        await statboard.render(boardElem);
        await statboard.renderDescriptions(descBoard);
        await statboard.showMessage(document.getElementById("message"));
    }
});

continual2.addEventListener("click", async () => {
    let ts = new Date();
    console.log(floorLev.value);
    await statboard.saveStatus(ts.toLocaleTimeString(), ts.toLocaleDateString(), floorLev.value , crowdLev.value, '');
    await statboard.render(boardElem);
});