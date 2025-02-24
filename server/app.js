import express from 'express';

import bcrypt from 'bcryptjs';

import morgan from 'morgan';

import cors from 'cors';

import path from 'path'

import url from 'url'

import { pool } from '../server/database.js';

import {getRow, getRows, addUser} from '../server/database.js';

const app = express();
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, './public');
app.use(express.static(publicDir));
app.use(express.static('public'));

console.log(__filename, __dirname); //nome arquivo e nome da pasta


app.use(morgan('dev'));
app.use(cors()); //estabilização de IP 'dar deny em certos url'
app.use(express.json());
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
}); 

app.get('/', (req, res) => {   
    res.send("Servidor está rodando");
    res.sendFile(path.resolve('public/index.html'))
})

app.post('/', async (req, res) => {
    console.log('Login request received');
    console.log(req);

    const {username, password} = req.body;
    
    if (!username || !password) { // caso seja null os campos do login
        console.log("Erro de preenchimento");
        return res.status(400).send('Por favor, preencha todos os campos!');
    } 

    console.log('Dados recebidos:', { username, password }); // Pega os dados e mostra no console pra verificar

    try {
        const [rows] = await pool.query('SELECT * FROM login WHERE username = ? AND password = ?', [username, password]);
        if (rows.length === 0) {                            
            console.log("Credencias inválidas para o usuário:", username);
            return res.status(400).send('Usuário ou senha inválidos.');
        }

        // const user = rows[0]; // Aqui você pega o primeiro usuário encontrado
        // if (user.password !== password) {
        //     console.log('Senha inválida!');
        //     return res.status(400).send('Senha inválida!');
        // }
        res.send('Login realizado com sucesso!');
    } catch (error) {
        console.error("Erro ao fazer login, código de erro: ", error);
        res.status(501).send('Falha interna do servidor!');
    }
});
// app.get('/users', async (req, res) => {
//     try {
//         const [rows] = await pool.query('SELECT * FROM login_user');  
//         res.json(rows);
//     } catch (error) {
//         console.error("Erro ao recuperar usuários:", error);
//         res.status(500).send('Erro ao recuperar usuários');
//     }
// }); 

app.get('/trabalhadores', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT name FROM workers');
        res.json(rows);
    } catch (error) {
        console.error('Erro ao buscar trabalhadores:', error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});