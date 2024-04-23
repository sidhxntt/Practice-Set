const prompt = require("prompt-sync")();
let age = prompt("Hey wahts your age?");
if(age<18){
    console.log("Sorry neither can you drive nor you can drink");
}
else if(age>18 && age<21){
    console.log(" You can drive but you can't drink");
}
else{
    console.log("You are old enough to both drive and drink");
}