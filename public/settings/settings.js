document.addEventListener("DOMContentLoaded", async () => {
  const workersList = document.getElementById("user-list");

  try {
    const response = await fetch("http://localhost:5000/trabalhadores");
    if (!response.ok) throw new Error("Erro ao buscar trabalhadores");

    const workers = await response.json();

    workers.forEach((worker) => {
      const li = document.createElement("a");
      li.textContent = worker.name;
      workersList.appendChild(li);
    });
  } catch (error) {
    console.error("Erro ao carregar trabalhadores:", error);
    workersList.innerHTML = "<p>Erro ao carregar a lista de trabalhadores</p>";
  }
});
//18:30, MORO 3 MINUTOS DAQ (DE BIKE), PIOR QUE VOU MESMO

document.addEventListener("DOMContentLoaded", function () {
    //declaraçáo de variáveis de criação de funcionários
    const popup = document.querySelector(".popup");
    const createWorkerBtn = document.querySelector(".create-worker");
    const closeButton = document.querySelector(".closebutton");

    //declaração de variáveis de atualização de funcionários
    const updatePopup = document.querySelector(".update-popup");
    const updateWorkerBtn = document.querySelector("#button-update-worker");
    const updateCloseButton = document.querySelector(".update-btn");

    //declaração de variáveis de remoção de funcionários
    const deletePopup = document.querySelector('.delete-popup');
    const deleteWorkerBtn = document.querySelector('.delete-btn');
    const deleteCloseIcon = document.querySelector('.delete-icon')


    // função para que, quando você clicar, a div do popup deixar de estar none e passar a ficar visível
    // atráves do display: block
    function togglePopup(element) {
        element.style.display = element.style.display === "block" ? "none" : "block";
    }

    //eventos de clique da parte de registro
    if (popup && createWorkerBtn && closeButton) {
        createWorkerBtn.addEventListener("click", () => togglePopup(popup));
        closeButton.addEventListener("click", () => togglePopup(popup));
    }

    //eventos de clique da parte de update (put)
    if (updatePopup && updateWorkerBtn && updateCloseButton) {
        updateWorkerBtn.addEventListener("click", () => togglePopup(updatePopup));
        updateCloseButton.addEventListener("click", () => togglePopup(updatePopup));
    }
    if (deletePopup && deleteWorkerBtn && deleteCloseIcon) {
        deleteWorkerBtn.addEventListener("click", () => togglePopup(deletePopup));
        deleteCloseIcon.addEventListener("click", () => togglePopup(deletePopup));
    }
    // REALYZE, ME CHAMA PRA SUA CASA, TO MORANDO EM ARADAS POR AGORA, PERTO DE ILHAVO
    // sure, pode deixar nigga

    // função para fechar o popup quando clicasse para fora do mesmo
    document.addEventListener("click", function (event) {
        if (popup.style.display === "block" && !popup.contains(event.target) && event.target !== createWorkerBtn) {
            popup.style.display = "none";
        }
        if (updatePopup.style.display === "block" && !updatePopup.contains(event.target) && event.target !== updateWorkerBtn) {
            updatePopup.style.display = "none";
        }
        if (deletePopup.style.display === "block" && !deletePopup.contains(event.target) && event.target !== deleteCloseIcon) {
            deletePopup.style.display = "none";
        }
    });

});


function addUserToDb() {
    document.querySelector('.update-worker').addEventListener('submit', async function (event){
        event.preventDefault();

        const id = document.getElementById('id').value;
        const name = document.getElementById('name').value;
        const password = document.getElementById('password').value;
        const message = document.getElementById('message-submit');

        if(!id || !name || !password){
            message.textContent = 'Erro, por favor insira todos os dados pedidos'
            message.style.color = 'red';
            return;
        }

        try{
            const response = await fetch("http://localhost:5000/trabalhadores", {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({id, name, password})
            }) //posso tentar inserir a url de registros também
            
            
            const result = await response.json();

            if(response.ok){
                message.textContent = 'Usuário atualizado com sucesso'
                message.style.color = 'green';
            }
            else{
                message.textContent = 'Erro ao atualizar o usuário'
                message.style.color = 'red';
            }
        }catch(error){
            console.error(error);
            message.textContent = 'Erro ao conectar-se com a base de dados'
            message.style.color = 'red';
        }

    })}
