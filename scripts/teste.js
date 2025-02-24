const teste = document.getElementById('teste');

teste.addEventListener('click', async function() {
    try{
        const response = await fetch('http://127.0.0.1:3000/register', {
            method: 'GET',
        });
        const data = await response.json();
        console.log(data);
    }
    catch(erro){
        console.log(erro);
    }
});