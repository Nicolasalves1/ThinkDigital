import mysql from 'mysql2';

import dotenv from 'dotenv';
require('dotenv').config();  // Load environment variables from.env file

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,//using enviroment variables to secure sensitive information
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

async function getNotes(){ // Fetch all notes from the database
    const [rows] = await pool.query('SELECT * FROM login_data');// Get all notes from the database
    return rows; // return the fetched notes
}
const row = await getNotes(); //assign the function call to an object
