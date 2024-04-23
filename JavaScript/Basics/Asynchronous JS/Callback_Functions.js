const calculator =(a,b,operation)=>{return  operation(a,b)};

const add= (num1,num2) => num1+num2;
const sub= (num1,num2) => num1-num2;
const div= (num1,num2) => num1/num2;
const mul= (num1,num2) => num1*num2;
const mod= (num1,num2) => num1%num2;

a=10,b=5;
console.log(calculator(a, b ,add)); // 15
console.log(calculator(a, b ,sub)); // 5
console.log(calculator(a, b ,div));// 2.00
console.log(calculator(a, b ,mul)); // 100
console.log(calculator(a, b ,mod)); // 0  

 // Callback function is same as passing functions as arguements in cpp


//METHOD -1
                // let greetUser =(name) =>{
                //     console.log(`Hello ${name}!`);  
                // }
                // let callaback=()=> {
                //     console.log("Callback Function called");
                // }
                // greetUser("Siddhant");
                // callaback();



// METHOD -2
                // let greetUser =(name) =>{
                //     console.log(`Hello ${name}!`);  
                //     callaback();
                // }
                // let callaback=()=> {
                //     console.log("Callback Function called");
                // }
                // greetUser("Siddhant");



// METHOD -3
                // let greetUser =(name,func) =>{
                //     console.log(`Hello ${name}!`);  
                //     callaback();
                // }
                // let callaback=()=> {
                //     console.log("Callback Function called");
                // }
                // greetUser("Siddhant",callaback);
