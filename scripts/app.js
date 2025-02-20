import express from 'express';

import bcrypt from 'bcryptjs';

import morgan from 'morgan';

import cors from 'cors';

import { pool } from './database.js';

import {getRow, getRows, addUser} from './database.js';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
}); 

app.get('/dashboard', async (req, res) => {
    const data = await getRows();
    res.send(data);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.post('/login', async (req, res) => {

    console.log('Login request received');

    const {username, password} = req.body;

    if(!username ||!password){
        return res.status(400).send('Por favor, preencha todos os campos!');
    }
    try {
        const [rows] = await pool.query('SELECT * FROM login_user WHERE username = ?', [username]);
        if(rows.length === 0){
            return res.status(400).send('Usuário não encontrado!');
        }
        const user = rows[0];  
        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword){
            return res.status(400).send('Senha inválida!');
        }
        
        res.send('Login realizado com sucesso!');

    } catch (error) {
        console.error("Erro ao fazer login, código de erro: ", error);
        res.status(501).send('Falha interna do servidor!');
    }
    });