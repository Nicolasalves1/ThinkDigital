let xhtml = new XMLHttpRequest();

function getShiftByTime(){
    const hour = new Date().getHours();
    const minutes = new Date().getMinutes();

    if(hour >= 0 && hour <= 8) return 1; //Turno da noite
    if(hour >= 8 && hour <= 16){
        if(minutes > 0)return 2;
    }//turno da tarde
    return 3; //turno da noite 
}

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

let hours = document.getElementById('hrs');
let min = document.getElementById('min');


setInterval( () =>{

    let currentTime = new Date();

    hours.innerHTML = (currentTime.getHours() < 10 ? "0":"") + currentTime.getHours();
    min.innerHTML = (currentTime.getMinutes() < 10 ? "0":"") + currentTime.getMinutes();

    let dataInicio = "00:00:00"; 
    let dataFim = "16:00:00";

    

}, 100);

xhtml.open("GET", "http://localhost:5000/trabalhadores", true);
xhtml.send();
