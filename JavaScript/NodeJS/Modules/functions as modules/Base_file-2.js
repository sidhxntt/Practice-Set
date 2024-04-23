// Fix for calculation.js
function calculation(a, b, add, sub, mul, div) {
    const sum = add(a, b);
    const diff = sub(a, b);
    const prod = mul(a, b);
    const ques = div(a, b);
    console.log(sum, diff, prod, ques);
}

function add(num1, num2) {
    return num1 + num2;
}

function mul(num1, num2) {
    return num1 * num2;
}

function sub(num1, num2) {
    return num1 - num2;
}

function div(num1, num2) {
    return num1 / num2;
}

// Exporting the calculation function with provided operations
module.exports = function (a, b) {
    calculation(a, b, add, sub, mul, div);
};
