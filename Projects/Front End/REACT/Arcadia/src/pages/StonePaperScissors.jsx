import React, { useState, useEffect } from "react";

const StonePaperScissors = () => {
  const [start, setStart] = useState(false);
  const [choice, setChoice] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [attempts, setAttempts] = useState(10);

  function computerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }

  useEffect(() => {
    if (start && choice !== null) {
      playGame();
    }
  }, [choice, start]);

  const handleClickRock = () => {
    setChoice("rock");
  };

  const handleClickPaper = () => {
    setChoice("paper");
  };

  const handleClickScissors = () => {
    setChoice("scissors");
  };

  const playGame = () => {
    const computerChoiceResult = computerChoice();
    if (attempts > 0) {
      setAttempts(attempts - 1);
      if (computerChoiceResult === choice) {
        setUserScore(userScore + 1);
        setComputerScore(computerScore + 1);
      } else if (
        (choice === "rock" && computerChoiceResult === "scissors") ||
        (choice === "paper" && computerChoiceResult === "rock") ||
        (choice === "scissors" && computerChoiceResult === "paper")
      ) {
        setUserScore(userScore + 1);
      } else {
        setComputerScore(computerScore + 1);
      }
    } else {
      if (userScore > computerScore) {
        alert("Congratulations, you won the game");
      } else if (userScore < computerScore) {
        alert("Sorry, you lost the game");
      } else {
        alert("It's a tie");
      }
      location.reload();
    }
  };

  return (
    <div>
      <div className="lines">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <h1>Rock Paper & Scissors</h1>
      <button onClick={() => setStart(true)} id="button" className="parpadea">
        Press here to Start
      </button>
      <div className="table center">
        <div className="monitor-wrapper center">
          <div className="monitor center">
            <div className="content">
              {start && (
                <p>
                  You: {userScore} <br />
                  Computer: {computerScore}
                </p>
              )}
              {start && <p>Attempts: {attempts}</p>}
            </div>
          </div>
        </div>
        <div className="input_buttons">
          <button onClick={handleClickRock} className="push1--flat">
            R
          </button>
          <button onClick={handleClickPaper} className="push2--flat">
            P
          </button>
          <button onClick={handleClickScissors} className="push3--flat">
            S
          </button>
        </div>
      </div>
    </div>
  );
};

export default StonePaperScissors;
