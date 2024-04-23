const prompt = require('prompt-sync')();
const age = parseInt(prompt("Enter your age: "));

switch (true) {
    case (age < 18):
        console.log("Sorry, neither can you drive nor can you drink.");
        break;

    case (age >= 18 && age < 21):
        console.log("You can drive, but you can't drink.");
        break;

    case (age >= 21):
        console.log("You are old enough to both drive and drink.");
        break;
}
