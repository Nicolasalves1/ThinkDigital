let xhtml = new XMLHttpRequest();

let shifts = []; // Lista para armazenar os turnos

// Função para buscar os turnos da API
function fetchShifts() {
    return new Promise((resolve, reject) => {
        let shiftRequest = new XMLHttpRequest();
        shiftRequest.open("GET", "http://localhost:5000/trabalhadores", true);

        shiftRequest.onreadystatechange = function () {
            if (shiftRequest.readyState == 4 && shiftRequest.status == 200) {
                shifts = JSON.parse(shiftRequest.responseText);
                resolve(shifts);
            }
        };

        shiftRequest.onerror = () => reject("Erro ao buscar turnos");
        shiftRequest.onerror = console.log("se ferrou")
        shiftRequest.send();
    });
}

// Função para obter o turno atual baseado na hora do banco de dados
function getCurrentShift() {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes(); // Convertendo para minutos

    return shifts.find(shift => {
        const [startH, startM] = shift.shift_start.map(Number);//vai separar a hora entre :
        const [endH, endM] = shift.shift_end.map(Number);

        const startMinutes = startH * 60 + startM;
        const endMinutes = endH * 60 + endM;

        if (startMinutes <= endMinutes) {
            return currentTime >= startMinutes && currentTime <= endMinutes;
        } else {
            // Caso especial para turnos que atravessam a meia-noite (exemplo: 22:00 - 06:00)
            return currentTime >= startMinutes || currentTime <= endMinutes;
        }
    });
}

function fetchAndDisplayWorkers() {

    xhtml.open("GET", "http://localhost:5000/trabalhadores", true);
    
    xhtml.onreadystatechange = function() {
        
    
        if (xhtml.readyState == 4 && xhtml.status == 200) { //vai verificar se a requisição foi bem sucedida
            let users = JSON.parse(xhtml.responseText); //passando de array para texto normal
            let tableBody = document.getElementById('tabela-corpo'); 
    
            tableBody.innerHTML = ""; 
    
            users.forEach(user => {//criando rows de acordo com cada parametro que um user tem :D
                let row = document.createElement("tr");
    
                let idCell = document.createElement("th");
                idCell.textContent = user.id;
    
                let nameCell = document.createElement("td");
                nameCell.textContent = user.name;
    
                let turnoCell = document.createElement("td");
                turnoCell.textContent = user.shift_name;
                console.log(user);
    
                let equipeCell = document.createElement("td");
                equipeCell.textContent = user.team_name;
    
                row.appendChild(idCell);//append to child pra adicionar o que pegamos da base de dados para a row
                row.appendChild(nameCell);
                row.appendChild(turnoCell);
                row.appendChild(equipeCell);
    
                tableBody.appendChild(row); //vai inserir no corpo da tabela os valores do user que pegamos do json/base de dados
                
            });
    
            
        }
    };
    xhtml.send();
}

function currentClockTime(){
    let hours = document.getElementById('hrs');
    let min = document.getElementById('min');

    let currentTime = new Date();

    hours.innerHTML = (currentTime.getHours() < 10 ? "0":"") + currentTime.getHours();
    min.innerHTML = (currentTime.getMinutes() < 10 ? "0":"") + currentTime.getMinutes();

}    

fetchShifts().then(() => {
    currentClockTime();
    fetchAndDisplayWorkers();
});


setInterval( () =>{

    currentClockTime();

    fetchAndDisplayWorkers();

}, 60000);

currentClockTime();
fetchAndDisplayWorkers();

