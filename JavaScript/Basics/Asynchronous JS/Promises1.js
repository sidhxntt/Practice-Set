const prompt = require('prompt-sync')();

let number1 = parseInt(prompt("Enter number-1: "));
let number2 = parseInt(prompt("Enter number-2: "));
let number3 = parseInt(prompt("Enter number-3: "));

const CheckEvenNumberValidity = (number) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (number > 0) {
                if (number % 2 === 0) {
                    resolve("VALID EVEN NUMBER");
                } else {
                    reject("INVALID EVEN NUMBER");
                }
            } else {
                reject("INVALID NUMBER");
            }
        }, 2000);
    });
};

const CheckOddNumberValidity = (number) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (number > 0) {
                if (number % 2 !== 0) {
                    resolve("VALID ODD NUMBER");
                } else {
                    reject("INVALID ODD NUMBER");
                }
            } else {
                reject("INVALID NUMBER");
            }
        }, 3000);
    });
};

const CheckPrimeNumberValidity = (number) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (number > 1) {
                let isPrime = true;
                for (let i = 2; i <= Math.sqrt(number); i++) {
                    if (number % i === 0) {
                        isPrime = false;
                        break;
                    }
                }
                if (isPrime) {
                    resolve("VALID PRIME NUMBER");
                } else {
                    reject("NOT A PRIME NUMBER");
                }
            } else {
                reject("INVALID NUMBER");
            }
        }, 4000);
    });
};

Promise.all([
    CheckEvenNumberValidity(number1),
    CheckOddNumberValidity(number2),
    CheckPrimeNumberValidity(number3)
]).then((messages) => {
    console.log(messages);
}).catch((error) => {
    console.error(error);
});


// Example usage:
// CheckEvenNumberValidity(number1)
//     .then(result => {
//         console.log(result);
//     })
//     .catch(error => {
//         console.error(error);
//     });

// CheckOddNumberValidity(number2)
//     .then(result => {
//         console.log(result);
//     })
//     .catch(error => {
//         console.error(error);
//     });

// CheckPrimeNumberValidity(number3)
//     .then(result => {
//         console.log(result);
//     })
//     .catch(error => {
//         console.error(error);
//     });
