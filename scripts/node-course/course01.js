/*
function getRandomNumber(){
    Math.floor(Math.random() * 100) + 1;
}

function celsiusToFahrenheit(celsius){
    return (celsius * 9/5) + 32;
}
*/

import getPosts,  { getPostsLenght } from './postcontroller.js'

console.log(getPosts());

console.log(`Posts lenght: ${getPostsLenght()}`);