let a = [10, 20, 30];
let b = [10, 20, 30];

console.log(typeof a,typeof b);

let compareNumber1 = () => a==b;
console.log(compareNumber1());

let compareNumber2 = () => a!=b;
console.log(compareNumber2());

let compareNumber3 = () => a===b;
console.log(compareNumber3());

let compareNumber4 = () => a!==b;
console.log(compareNumber4());