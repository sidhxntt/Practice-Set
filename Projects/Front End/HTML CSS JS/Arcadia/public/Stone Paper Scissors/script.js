let start_btn = document.body.querySelector("#button");

start_btn.addEventListener("click", function () {
  document.body.querySelector(".content").style = "display:block";
  start_btn.style.display = "none";
  main();
});

function main() {
  let attempts = 10;
  let userscore = 0;
  let compscore = 0;
  let userchoice;

  function computerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }

  function addButtonEventListener(selector, choice) {
    const btn = document.body.querySelector(selector);
    btn.addEventListener("click", () => {
        userchoice = choice;
        playGame();
    });
}

addButtonEventListener(".push1--flat", "rock");
addButtonEventListener(".push2--flat", "paper");
addButtonEventListener(".push3--flat", "sciss");


  function playGame() {
    const computerChoiceResult = computerChoice();
    if (attempts > 0) {
      attempts--;
      if (computerChoiceResult === userchoice) {
        userscore++;
        compscore++;
        document.body.querySelector(
          ".content"
        ).firstElementChild.innerHTML = `You: ${userscore} <br>  Computer: ${compscore}`;
        document.body.querySelector(
          ".content"
        ).lastElementChild.innerHTML = `Attempts: ${attempts}`;
      } else if (
        (userchoice === "rock" && computerChoiceResult === "scissors") ||
        (userchoice === "paper" && computerChoiceResult === "rock") ||
        (userchoice === "scissors" && computerChoiceResult === "paper")
      ) {
        userscore++;
        document.body.querySelector(
          ".content"
        ).firstElementChild.innerHTML = `You: ${userscore} <br>  Computer: ${compscore}`;
        document.body.querySelector(
          ".content"
        ).lastElementChild.innerHTML = `Attempts: ${attempts}`;
      } else {
        compscore++;
        document.body.querySelector(
          ".content"
        ).firstElementChild.innerHTML = `You: ${userscore} <br>  Computer: ${compscore}`;
        document.body.querySelector(
          ".content"
        ).lastElementChild.innerHTML = `Attempts: ${attempts}`;
      }
    } else {
      if (userscore > compscore) {
        alert(`Congratulations, you won the game`);
      } else if (userscore < compscore) {
        alert(`Sorry, you lost this time.`);
      } else {
        alert(`It's a tie.`);
      }
      location.reload();
    }
  }
}
