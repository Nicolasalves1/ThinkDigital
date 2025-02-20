import mysql from "mysql2";
// Load environment variables from.env file ESPERO QUE DÊ CERTO PQP KKKKKKKK. nao deu certo
import dotenv from "dotenv";


dotenv.config(); // Load the environment variables
const pool = mysql
  .createPool({
    host: process.env.DATABASE_HOST,
    //using enviroment variables to secure sensitive information
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD, //tentei usar o dotenv mas nao deu certo, tenho que tentar dnv até conseguir usar um.env
    database: process.env.DATABASE_DB,
  })
  .promise();

export { pool }; // Export the pool object

export async function getRows() {
  //Fetch all rows from the database
  const rows = await pool.query("SELECT * FROM login_user"); // Get all rows from the database
  return rows; // return the fetched rows
}

export async function getRow(username, password) {
  const row = await pool.query(
    `
        SELECT * FROM login_user
        WHERE username = ? AND password = ?`,
    [username, password]
  ); // Get a row by user and password from the database
  return row; // return the fetched row
  //if I return rows as a normal object, it'll print out the array of objects instead of the object itself
  //on the other hand, if I return rows[0], it'll print out the object itself
}

export async function addUser(username, password) {
  const [result] = await pool.query(
    `INSERT INTO login_user (username, password)
                    VALUES (?,?)`,
    [username, password]
  );
  const id = result.insertId; //increment id in the database
  return getRow(id); // Return the inserted user
}

export async function deleteUser(id){
    const del = await pool.query(`
        DELETE FROM login_user
        WHERE id =?`
        , [id]);
    const delMessage = `User with id: ${id} deleted successfully.`;
    // Delete a user by id from the database
    console.log(delMessage);
    return del; // Return the deleted user
}


const rowsReturn = await getRows(); //assign the function call to an object
console.log(rowsReturn); 
//const delReturn = await deleteUser(4); // Call the deleteUser function
//console.log(delReturn);  
//const rowReturn = await getRow("Diogo", "1234"); // Call the getRow function
//console.log(rowReturn);
//const addReturn = await addUSer('Diogo', '1234'); // Call the adduser function
//console.log(addReturn); 
