const prompt = require('prompt-sync')();
let string = prompt("Enter your Name: ");

console.log(`Hello ${string}!`);
console.log(string.split(' '));
console.log(string.split(''));
console.log(string.split(' ').reverse().join(' '));


const FirstName= string.split(' ')[0];  //get the first name from user input
const LastName = string.split(" ")[string.split(' ').length-1]; //get the last name by removing the first word from the  user input
console.log("Fist Name: " +FirstName);
console.log("Last Name: "+LastName);  
console.log(string.toLowerCase());
console.log(string.toUpperCase());
console.log(string.length);
console.log(string[0]);
console.log(string[string.length-1]);
console.log(`${string}`+ " Loves Pri")
console.log(string.concat("pri"));
console.log()

// ___________________________________________________________________________________________________________________________
let str="Please give me Rs 1000";
let n=str.indexOf("1000");
let amount=parseInt(str.substring(n,n+4)); // OR str.slice(n,n+4)
console.log(typeof(amount));
if(amount%2==0){
    console.log("Fine  is due");
}else{
    console.log("No Fine Due");
}
// ___________________________________________________________________________________________________________________________


