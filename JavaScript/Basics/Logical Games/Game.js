const prompt = require('prompt-sync')();

let targetElement = Math.floor(Math.random() * 100) + 1; // Include 100 in the range
let count = 1; // Initialize count to 0
let choice = 1; // Initialize choice to 1 to enter the loop

let name = prompt("Please enter your Name: ");
console.log("Hi " + name + ", Welcome to my Game!🤖");
console.log("Yes=1 and No=0");

while (choice !== 0) {
  choice = parseInt(prompt("Do you want to play? (1/0): "));
  if (choice === 1) {
    console.log("\nGreat! Let's start the game!");
    let userElement;
    do {
      userElement = parseInt(prompt("Enter Number: "));
      while (userElement < 1 || userElement > 100 || isNaN(userElement)) {
        userElement = parseInt(prompt("Invalid Input!\nEnter a number between 1 & 100: "));
      }
      if (userElement !== targetElement) {
        if (userElement > targetElement) {
          console.log("Your number is too high!\nTry Again.");
        } else {
          console.log("Your number is too low!\nTry again.");
        }
        count++;
      }
    } while (userElement !== targetElement);
    console.log(
      `Congratulations ${name}, you guessed the correct number (${targetElement}) in ${count + 1} attempts.`
    );
    console.log("Your total Score: ", 100 - count + "%");
    process.exit ();

  } else if (choice === 0) {
    console.log(`Sorry to see you go ${name}, but maybe next time.`);
  } else {
    console.log(
      "\nInvalid Input!\nPlease Enter 1 for Yes or 0 for No.\nLet's try that again...\n"
    );
  }
}
