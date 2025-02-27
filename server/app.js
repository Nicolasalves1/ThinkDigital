import express from 'express';

//import bcrypt from 'bcryptjs'; biblioteca para criptografar 

import morgan from 'morgan';

import cors from 'cors';

import path from 'path'

import url from 'url'

import { deleteWorker, pool } from '../server/database.js';

import {addUser} from '../server/database.js';

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


//login do usuário
app.post('/', async (req, res) => {
    console.log('Login request received');
    console.log(req);

    const {username, password} = req.body; //request para o body do html
    
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


//post para dar registro de usuário na base de dados
app.post('/trabalhadores', async (req, res) =>{
    console.log("Attempt of registration received");

    const {name, password} = req.body;

    try{
        addUser(name, password);
            if(!name || !password){
                console.log('Forneça um nome de usuário!');
                res.sendStatus(400).send('Erro');
                return error;
            }
            console.log('Registro concuído com sucesso!');
            res.send('Usuário registrado com sucesso');
    } 
    catch(error){
        console.log('Erro no cadastro', error)
        return res.sendStatus(500).send('Erro ao cadastrar usuário');
    }
})


//método para atualizar um user na base de dados
app.put('/trabalhadores', async (req, res) => {
    const {name, password } = req.body;

    if (!name || !password) { //forma mais fácil de verificar se o utilizador não inseriu nada nos campos
        return res.status(400).json({ message: 'Por favor, forneça nome e senha.' });
    }

    try {
        const [result] = await pool.query(
            'UPDATE workers SET name = ?, password = ?',
            [name, password]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Trabalhador não encontrado.' });
        }

        res.json({ message: 'Trabalhador atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar trabalhador:', error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
});


//método para deletar um user de acordo com o id dele
app.delete('/trabalhadores', async (req, res) =>{
    const {id} = req.body;

    try{
        await deleteWorker(id);
        res.json({message: 'Trabalhador removido com sucesso!'});
    }catch(error){
        console.log('Um erro ocorreu na tentativa de deletar o usuário, por favor, tente mais tarde');
        res.sendStatus(501).json({message: 'Erro encontrado', error});
    }
})


//método para fazer a interligação entre as tabelas
app.get('/trabalhadores', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT * FROM line INNER JOIN shifts ON shifts.id = line.id
            INNER JOIN teams ON teams.id = shifts.id
            INNER JOIN workers ON workers.id = teams.id; 
            `);
        res.json(rows);
    } catch (error) {
        console.error('Erro ao buscar trabalhadores:', error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

app.get('/trabalhadores/turnos', async (req, res) =>{
    try {
        const [shiftrows] = await pool.query(`
            SELECT * FROM shifts WHERE shift_name = ?
            `);

        res.json(shiftrows);
    } catch(error){
        console.error('Erro ao buscar trabalhadores:', error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
})


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});