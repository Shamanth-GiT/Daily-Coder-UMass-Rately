// DOM Extractions
let time = document.getElementById("current-time");
let date = document.getElementById("current-date");



// Setting the current date and time
setInterval(() => {
    let t = new Date();
    time.innerHTML = t.toLocaleTimeString();
}, 1000);
let d = new Date();
date.innerHTML = d.toLocaleDateString();

