const { json } = require("express");

const arr = [10,20,30,40,50]

const obj = {
  name: 'sid',
  age: 21,
  gender: 'male'
} 

// WHILE LOOP -> Until condition is falsy do it
let i = 0;

while (i < arr.length) { 
  console.log( i );
  i++;
}


// DO WHILE -> This form of syntax should only be used when you want the body of the loop to execute at least once regardless of the condition being truthy. Usually, the other form is preferred: while(…) {…}.
let j = 0
do {
    console.log( j );
    j++;
  } while (j < 3);

// FOR LOOP -> Usually for ranges
for (let i = 0; i < arr.length; i++) { 
    console.log(i);
  }

// for...in Loop | Purpose: Iterates over the enumerable properties of an object or the indices of an array.
for(let key in obj){
  console.log(`${key}: ${obj[key]}`)
}
for(let index in arr){
  console.log(`${index}: ${arr[index]} `)
}
// for...of Loop | Purpose: Iterates over iterable objects like arrays, strings, maps, sets, etc and gives the value not the indices (NO OBJECTS) 
for(let value of arr){
  console.log(value)
}
// Reduce (array method only)
console.log(arr.reduce((arr,curr)=> arr + curr, 0))
// Map (array method only)
const result = arr.map((number,index)=>{
  console.log(`${index}: ${2*number}`)
  return 2* number
})
console.log(result)
// FOREACH (array method only)same as map but doesnt return array or anything
arr.forEach(element => {
  console.log(element)
  return 2* element
});

// all these RETURN ARRAY FOR ONLY OBJECTS
console.log(Object.keys(obj))
console.log(Object.values(obj))
console.log(Object.entries(obj))

const salaries = {
  John: 100,
  Pete: 300,
  Mary: 250,
};

// Immediately Invoked Function Expression (IIFE)
((salaries) => {
  console.log(Object.values(salaries).reduce((acc, curr) => acc + curr, 0));
})(salaries);

// Destructuring the 'John' property
const { John } = salaries; 
console.log(John); // Logs the value of 'John', which is 100

// JSON.stringify to convert objects into JSON.
// JSON.parse to convert JSON back into an object.
console.log(JSON.stringify(salaries))