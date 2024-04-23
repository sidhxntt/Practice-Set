const prompt = require('prompt-sync')();

function computerChoice() {
    const choices = ['S', 'W', 'G'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function playGame(userChoice, compChoice) {
    console.log(`You chose: ${userChoice}`);
    console.log(`Computer chose: ${compChoice}`);
    if (userChoice === compChoice) {
        console.log("It's a tie!");
    } else if (
        (userChoice === 'S' && compChoice === 'W') ||
        (userChoice === 'W' && compChoice === 'G') ||
        (userChoice === 'G' && compChoice === 'S')
    ) {
        console.log("You win!");
    } else {
        console.log("Computer wins!");
    }
}

console.log("Welcome to Snake, Water, Gun game!");
console.log("Enter S for Snake, W for Water, and G for Gun.");

const userChoice = prompt("Enter your choice (S/W/G): ").toUpperCase();
const compChoice = computerChoice();

if (userChoice !== 'S' && userChoice !== 'W' && userChoice !== 'G') {
    console.log("Invalid choice! Please enter S, W, or G.");
} else {
    playGame(userChoice, compChoice);
}
