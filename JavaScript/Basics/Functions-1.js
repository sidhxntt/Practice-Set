const prompt = require('prompt-sync')();

let num1=parseInt(prompt("Enter the first number: "));
let num2=parseInt(prompt("Enter the second number: "));

const adding_squares =(num1, num2)=>{
    let a=num1;
    let b=num2;
    const square = (x)=> x*x;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
             let res=square(a)+square(b);
             resolve(res);
        }, 2000);
    })
}

async function  main(){
    const result=await  adding_squares(num1, num2);
    console.log(`The sum of squares is ${result}`);
}

main();