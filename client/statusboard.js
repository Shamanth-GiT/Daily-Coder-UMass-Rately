class StatusBoard {
    constructor() {
        this.board = [];
    }

    async saveStatus (time, date, floor, crowd, desc){
        let obj = {time: time, date: date, floor: floor, crowd: crowd, description: desc};
        this.board.push(obj);

        const response = await fetch(`/status?time=${time}&date=${date}&floor=${floor}&crowd=${crowd}&description=${desc}`, {
            method: 'POST'
        });

        const data = await response.json();

        return data;
    }


    async avgCrowd(){
        const response = await fetch(`/crowd`, {
            method: 'GET'
        });

        const data = await response.json();
        console.log(data[0].avg);
        return data[0];
    }

    async render(element){
        // let cr = Number(this.avgCrowd()[0].avg);
        
        let response = await fetch(`/all`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
          });
        let json = await response.json();

        let html1 = `<h1>Status Reports</h1>`;
        html1 += '<table style = "width: 100%; z-index: 1" border = 1>';
        Array.from(json, x => {
        html1 += `
            <tr>
            <td>${x.time}</td>
            <td>${x.date}</td>
            <td>${x.floor}</td>
            <td>${x.crowd}</td>
            <td>${x.desc}</td>
            </tr>
        `;
        });
        html1 += '</table>';
        element.innerHTML = html1;
    }
}

const statboard = new StatusBoard();

export { statboard };