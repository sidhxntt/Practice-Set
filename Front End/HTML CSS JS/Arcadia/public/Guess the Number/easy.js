function easy() {
  document.body.querySelector("h6").innerHTML = "Easy Mode Selected";
  let targetNumber = Math.floor(Math.random() * 100) + 1; // Include 100 in the range
  let attempts = 12;

  document.body
    .querySelector("input")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        let userInput = parseInt(event.target.value);
        if (!isNaN(userInput) && userInput >= 1 && userInput <= 100) {
          // Check if input is a valid number
          playGame(userInput, targetNumber);
        } else {
          openModal();
        }
      }
    });

  function playGame(userInput, targetNumber) {
    if (attempts > 0) {
      attempts--;

      if (userInput === targetNumber) {
        document.querySelector(
          ".game-container"
        ).lastElementChild.innerHTML = `Congratulations! You guessed the number.`;
        document.querySelector(
          ".game-container"
        ).lastElementChild.style.display = "block";
        return;
      } else if (attempts === 0) {
        document.querySelector(
          ".game-container"
        ).lastElementChild.innerHTML = `Game over. The correct number was ${targetNumber}.`;
        return;
      } else {
        if (userInput > targetNumber) {
          document.querySelector(
            ".game-container"
          ).lastElementChild.innerHTML = `Too High! Try Again!<br>Attempts left: ${attempts}`;
          document.querySelector(
            ".game-container"
          ).lastElementChild.style.display = "block";
        } else {
          document.querySelector(
            ".game-container"
          ).lastElementChild.innerHTML = `Too Low! Try Again!<br>Attempts left: ${attempts}`;
          document.querySelector(
            ".game-container"
          ).lastElementChild.style.display = "block";
        }
      }
    }
  }
}
var modal = document.getElementById("myModal");

// Function to open the modal
function openModal() {
  modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
  modal.style.display = "none";
}

// Close the modal if the user clicks outside of it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
