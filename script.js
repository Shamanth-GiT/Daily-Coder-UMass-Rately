let ls = window.localStorage;

// DOM Extractions
let time = document.getElementById("current-time");
let date = document.getElementById("current-date");
let modal = document.getElementById("exampleModalToggle");
let modalButton = document.getElementById("modal-opener");
let refresh = document.getElementById("refresh");

let floor = document.getElementById("floor-input");
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

refresh.addEventListener("click", () => {
    window.location.reload();
});

floor.addEventListener("keyup", () => {
    ls["floor"] = JSON.stringify(floor.value);
});

description.addEventListener("keyup", () => {
    ls["description"] = JSON.stringify(description.value);
});
