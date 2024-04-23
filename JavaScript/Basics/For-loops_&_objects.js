const prompt = require('prompt-sync')();
let number=parseInt(prompt("Enter a number: "));

let sum=0;
for(let i=0;i<number;i++){
    sum +=i+1;
}
console.log(`The sum of the first ${number} natural numbers is ${sum}.`);
//_________________________________________________________________________________________________________________________________

let obj={
    sid:50,
    pri:89,
    shiv:34,
    sukriti:45
}
console.log(obj[`sid`]);
console.log(obj.sid+obj.sukriti);
console.log(Object.keys(obj)) //Returns keys as array
console.log(Object.values(obj))//  Returns values as an array 
console.log(Object.entries(obj))//returns key value pairs in array format [key ,value]

//FOR -IN LOOP (for arrays and objects to keys/indexes)
for(let a in obj){
    console.log(a);
    console.log(obj[a]);
}
// WITHOUTFOR -IN LOOP
for(let i=0;i<Object.keys(obj).length;i++){
    console.log("The marks of " + Object.keys(obj)[i]+ " are "  + Object.values(obj)[i])
}
//FOR -OF LOOP(to get values of string or array)
for(let b of "SIDDHANT GUPTA"){ //needs to iterable ie an array or a string
    console.log(b);
}