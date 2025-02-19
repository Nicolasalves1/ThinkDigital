import mysql from 'mysql2';
 // Load environment variables from.env file ESPERO QUE DÊ CERTO PQP KKKKKKKK. nao deu certo

const pool = mysql.createPool({
    host: '127.0.0.1',
    //using enviroment variables to secure sensitive information
    user:'root',
    password: 'admin',//tentei usar o dotenv mas nao deu certo, tenho que tentar dnv até conseguir usar um.env
    database: 'user_data'
}).promise();

async function getNotes(){ //Fetch all notes from the database
    const [rows] = await pool.query('SELECT * FROM login_data');// Get all notes from the database
    return rows; // return the fetched notes
}
const row = await getNotes(); //assign the function call to an object
console.log(row); // print the fetched notes to the console