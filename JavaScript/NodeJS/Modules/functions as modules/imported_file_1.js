//FUNCTIONS AS MODULES
const {add,sub,mul,div}=require ("./Base_file-1");// when function passed as modules use same name

function calculation(a,b,add,sub,mul,div){
    console.log("Addition:", add(a, b));
    console.log("Subtraction:", sub(a, b));
    console.log("multiplication:", mul(a, b));
    console.log("Division:", div(a, b));
} 
calculation(10, 5, add, sub, mul, div);