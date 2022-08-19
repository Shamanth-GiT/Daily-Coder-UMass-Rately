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

// Setting the current date and time
setInterval(() => {
    let t = new Date();
    time.innerHTML = t.toLocaleTimeString();
}, 1000);
let d = new Date();
date.innerHTML = d.toLocaleDateString();

window.onload=function(){
    modalButton.click();
};

modalButton.style.visibility = 'hidden';


// floor.addEventListener("keyup", () => {
//     ls["floor"] = JSON.stringify(floor.value);
// });

// description.addEventListener("keyup", () => {
//     ls["description"] = JSON.stringify(description.value);
// });

currCrowd.addEventListener("click", () => {
    statboard.render(boardElem);
});

submit.addEventListener("click", () => {
    let ts = new Date();
    statboard.saveStatus(ts.toLocaleTimeString(), ts.toLocaleDateString(), floor.value , crowd.value, JSON.stringify(description.value));
    boardElem.innerHTML = '';
    statboard.render(boardElem);
});