import mysql from 'mysql2';
 // Load environment variables from.env file ESPERO QUE DÊ CERTO PQP KKKKKKKK. nao deu certo
import dotenv from 'dotenv';

dotenv.config(); // Load the environment variables
const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    //using enviroment variables to secure sensitive information
    user:process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,//tentei usar o dotenv mas nao deu certo, tenho que tentar dnv até conseguir usar um.env
    database: process.env.DATABASE_DB
}).promise();

async function getNotes(){ //Fetch all notes from the database
    const [rows] = await pool.query('SELECT * FROM login_user');// Get all notes from the database
    return rows; // return the fetched notes
}

async function getNote(id){
    const rows = await pool.query(`
        SELECT * FROM login_user
        WHERE id = ?`, [id]);// Get a note by id from the database
    return rows; // return the fetched note
    //if I return rows as a normal object, it'll print out the array of objects instead of the object itself
    //on the other hand, if I return rows[0], it'll print out the object itself
}

async function addUser(username, password){
    const [result] = await pool.query(`INSERT INTO login_user (username, password)
                      VALUES (?,?)`, 
                      [username, password]);
    const id = result.insertId; //increment id in the database
    return getNote(id)// Return the inserted user
}
const note = await getNotes(); //assign the function call to an object
//const result = await addUSer('Diogo', '1234'); // Call the adduser function
//console.log(result); // print the fetched users to the console
console.log(note); // print the fetched user to the console