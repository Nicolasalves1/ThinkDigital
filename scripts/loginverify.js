document.getElementById('login-form').addEventListener('submit', async function (event){
    event.preventDefault();


    const username = document.getElementById('InputUser').value;
    const password = document.getElementById('InputPassword').value;

    try {
        const response = await fetch('http://127.0.0.1:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });

        if(!response.ok){
            document.getElementById('message').textContent = 'Falha na requisição';
            document.getElementById('message').style.color = 'red';
            throw new Error('Falha na requisição');
        }

        const data = await response.json();

        if(data.success) {
            document.getElementById('message').textContent = 'Login efetuado com sucesso!';
            document.getElementById('message').style.color = 'green';
            localStorage.setItem('username', username);
            document.location.href = '/dashboard.html';
            console.log('Login efetuado com sucesso!');
        } else {
            document.getElementById('message').textContent = data.message;
            document.getElementById('message').style.color ='red';
            console.log('Falha na tentativa de login:', error.message);
        }
        
    }catch (error) {
        document.getElementById('message').textContent = 'Um erro ocorreu na tentativa de login.';
        document.getElementById('message').style.color ='red';
        console.log('Erro:', error.message);
    }
});
