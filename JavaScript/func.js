// In JavaScript, a function is not a “magical language structure”, but a special kind of value.

// Function Declaration (hoisted)
// Works even before the definition
function greet1(name){
    console.log(`Hello ${name}`)
}
greet1('sid')

// Function Expression (not hoisted)
// Error: Cannot call greet2 before it's defined
const greet2 = function(name){
    console.log(`hello again ${name} `)
}
greet2('sid')

// Aspect	            greet1 (Function Declaration)	                    greet2 (Function Expression)
// Declaration Type	    Function Declaration	                            Function Expression
// Hoisting	            Hoisted — can be called before declaration	        Not hoisted — cannot be called before declaration
// Re-declaration	    Can be redeclared in the same scope	                Cannot be reassigned or redeclared (if using const or let)
// Invocation	        Available throughout the scope	                    Available only after the assignment line


// Arrow Function
const wassup = (name)=>{console.log(`wassup ${name} `)}
wassup('sid')

const ops = (...numbers)=>{
    console.log(numbers.reduce((acc, num) => acc + num, 0))
}
const alot_of_greetings = (...names)=>{
    names.map((name)=>{
        console.log(`Hello ${name}`)
    })
}
ops(1,2,3,4,5,6)
alot_of_greetings('sid','pri','shukla','jasmine')
