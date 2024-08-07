import React, { useState, useEffect } from 'react';

const StonePaperScissors = () => {
  const [gameState, setGameState] = useState({
    start: false,
    choice: null,
    userScore: 0,
    computerScore: 0,
    attempts: 10,
  });

  useEffect(() => {
    const { start, choice } = gameState;
    if (start && choice !== null) {
      console.log(choice);
      playGame();
    }
  }, [gameState.choice, gameState.start]);

  const computerChoice = () => {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };

  const handleClick = (choice) => {
    setGameState({ ...gameState, choice });
  };

  const playGame = () => {
    const { choice, attempts, userScore, computerScore } = gameState;
    const computerChoiceResult = computerChoice();
    if (attempts > 0) {
      const newState = { ...gameState, attempts: attempts - 1 };
      if (
        (choice === "rock" && computerChoiceResult === "scissors") ||
        (choice === "paper" && computerChoiceResult === "rock") ||
        (choice === "scissors" && computerChoiceResult === "paper")
      ) {
        newState.userScore += 1;
      } else if (choice !== computerChoiceResult) {
        newState.computerScore += 1;
      }
      setGameState(newState);
    } else {
      const resultMessage =
        userScore > computerScore
          ? "Congratulations, you won the game"
          : userScore < computerScore
          ? "Sorry, you lost the game"
          : "It's a tie";
      alert(resultMessage);
      setGameState({
        start: false,
        choice: null,
        userScore: 0,
        computerScore: 0,
        attempts: 10,
      });
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
      <button onClick={() => setGameState({ ...gameState, start: true })} id="button" className="parpadea">
        Press here to Start
      </button>
      <div className="table center">
        <div className="monitor-wrapper center">
          <div className="monitor center">
            <div className="content">
              {gameState.start && (
                <p>
                  You: {gameState.userScore} <br /> Computer: {gameState.computerScore}
                </p>
              )}
              {gameState.start && <p>Attempts: {gameState.attempts}</p>}
            </div>
          </div>
        </div>
        <div className="input_buttons">
          <button onClick={() => handleClick('rock')} className="push1--flat">
            R
          </button>
          <button onClick={() => handleClick('paper')} className="push2--flat">
            P
          </button>
          <button onClick={() => handleClick('scissors')} className="push3--flat">
            S
          </button>
        </div>
      </div>
    </div>
  );
};

export default StonePaperScissors;
