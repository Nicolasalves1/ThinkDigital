document.getElementById('login-form').addEventListener('submit', async function (event){
    event.preventDefault();


    const username = document.getElementById('InputUser').value.trim();
    const password = document.getElementById('InputPassword').value.trim();

    console.log('Iniciando seção com: ', username, password);

    try {
        const response = await fetch('http://localhost:5000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });

        console.log('Resposta do servidor: ', response)

        if(!response.ok){
            const errorData = await response.json().catch(() => ({message: "Erro desconhecido"}))
            console.log('Erro no servidor', errorData)
            document.getElementById('message').textContent = 'Falha na requisição';
            document.getElementById('message').style.color = 'red';
            throw new Error('Falha na requisição');
        }

        const data = await response.json().catch(() => ({success: true, message: "O server deu a louca"})); 
        console.log('Resposta do servidor:', data);

        if(data.success) {
            document.getElementById('message').textContent = 'Login efetuado com sucesso!';
            document.getElementById('message').style.color = 'green';
            await delayLoop(1.5);
            localStorage.setItem('username', username);
            document.location.href = '/public/dashboard/dashboard.html';
            console.log('Login efetuado com sucesso!');
        } else {
            document.getElementById('message').textContent = data.message || "Erro desconhecido";
            document.getElementById('message').style.color ='red';
            console.log('Falha na tentativa de login:', error.message || "Erro aleatório");
        }
        
    }catch (error) {
        document.getElementById('message').textContent = 'Um erro ocorreu na tentativa de login.';
        document.getElementById('message').style.color ='red';
        console.log('Erro:', error.message);
    }
});

async function delayLoop(tempo) { 
    while (tempo > 0) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Atraso de 500ms (0,5 segundos)
        tempo--;
    }
}



