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
        let cr = await this.avgCrowd();
        let response = await fetch(`/all`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
          });
        let json = await response.json();
        
        const recent = json.slice(-10).reverse();
        let html1 = `<h1>Status Reports - Average Crowd: ${cr} </h1>`;
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
            element.innerHTML = `The gym is not busy. The average crowd level is ${cr}.`;
        }
        else if(cr >=4 && cr<6){
            element.innerHTML = `The gym is moderately busy. The average crowd level is ${cr}.`;
        }
        else if(cr>=6 && cr<8){
            element.innerHTML = `The gym is busy. The average crowd level is ${cr}.`;
        }
        else{
            element.innerHTML = `The gym is extremely busy. The average crowd level is ${cr}.`;
        }
    }

    async renderWithTitle(element){
        let cr = await this.avgCrowd();
        
        let response = await fetch(`/all`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
          });

        let response2 = await fetch('/responses', {
            method: 'GET',
        });
        let json2 = await response2.json();
        let json = await response.json();
        let num = json2["count"];
        const recent = json.slice(-10);

        let html1 = `<h1>Status Reports - Average Crowd: ${cr} </h1>`;
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

    async renderDescriptions(element) {
        element.innerHTML = '';
        const response = await fetch('/all/descriptions', {
            method: 'GET',
        }); 
        const head = document.createElement('h1');
        head.innerText = 'Comments: ';
        element.appendChild(head);
        const json = await response.json();
        console.log(json);
        Array.from(json, x => {
            const div = document.createElement('div');
            div.classList.add('desc-item');
            div.innerText = x;
            element.appendChild(div);
        });
        
    }
}

const statboard = new StatusBoard();

export { statboard };