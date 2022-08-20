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
        return data;
    }

    async render(element){
        
        let response = await fetch(`/all`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
          });
        let json = await response.json();
        
        const recent = json.slice(-10);
        let html1='';
        html1 += '<table> <tr> <th>Time</th> <th>Date</th> <th>Floor</th> <th>Crowd</th> <tr>';
        Array.from(recent, x => {
        html1 += `
            <tr>
            <td>${x.time}</td>
            <td>${x.date}</td>
            <td>${x.floor}</td>
            <td>${x.crowd}</td>
            </tr>
        `;
        });
        html1 += '</table>';
        element.innerHTML = html1;
    }

    async showMessage(element){
        let cr = await this.avgCrowd();

        if(cr < 4){
            element.innerHTML = 'The gym is not busy.'
        }
        if(cr >=4 && cr<6){
            element.innerHTML = 'The gym is moderately busy.'
        }
        if(cr>=6 && cr<8){
            element.innerHTML = 'The gym is busy.'
        }
        else{
            element.innerHTML = 'The gym is extremely busy'
        }
    }

    async renderWithTitle(element){
        let cr = await this.avgCrowd();
        
        let response = await fetch(`/all`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
          });
        let json = await response.json();
        
        const recent = json.slice(-10);

        let html1 = `<h1>Status Reports - Average Crowd: ${cr}</h1>`;
        html1 += '<table> <tr> <th>Time</th> <th>Date</th> <th>Floor</th> <th>Crowd</th> <tr>';
        Array.from(recent, x => {
        html1 += `
            <tr>
            <td>${x.time}</td>
            <td>${x.date}</td>
            <td>${x.floor}</td>
            <td>${x.crowd}</td>
            </tr>
        `;
        });
        html1 += '</table>';
        element.innerHTML = html1;
    }
}

const statboard = new StatusBoard();

export { statboard };