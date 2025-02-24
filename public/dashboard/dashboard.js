document.addEventListener('DOMContentLoaded', async () => {
    const workersList = document.getElementById('user-list');

    try {
        const response = await fetch('http://localhost:5000/trabalhadores');
        if (!response.ok) throw new Error('Erro ao buscar trabalhadores');

        const workers = await response.json();

        workers.forEach(worker => {
            const li = document.createElement('a');
            li.textContent = worker.name;
            workersList.appendChild(li);
        });

    } catch (error) {
        console.error('Erro ao carregar trabalhadores:', error);
        workersList.innerHTML = '<p>Erro ao carregar a lista de trabalhadores</p>';
    }
});
