const prompt = require('prompt-sync')();

function computerChoice() {
    const choices = ['R', 'P', 'S'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function playGame(userChoice, compChoice) {
    console.log(`You chose: ${userChoice}`);
    console.log(`Computer chose: ${compChoice}`);
    if (userChoice === compChoice) {
        console.log("It's a tie!");
    } 
    else if ((userChoice === 'R' && compChoice === 'S')||(userChoice === 'P' && compChoice === 'R')||(userChoice === 'S' && compChoice === 'P'))
    {
        console.log("You win!");
    } else {
        console.log("Computer wins!");
    }
}

console.log("Welcome to Rock, Paper, Scissors game!");
console.log("Enter R for Rock, P for Paper, and S for Scissors.");

const userChoice = prompt("Enter your choice (R/P/S): ").toUpperCase();
const compChoice = computerChoice();

if (userChoice !== 'R' && userChoice !== 'P' && userChoice !== 'S') {
    console.log("Invalid choice! Please enter R, P, or S.");
} else {
    playGame(userChoice, compChoice);
}
