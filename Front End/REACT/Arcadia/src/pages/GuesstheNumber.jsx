import { useState, useRef } from "react";
;

const GuesstheNumber = () => {
  const [difficulty, setDifficulty] = useState(null);
  const [result, setResult] = useState("");
  const user_value = useRef();
  const targetNumber = useRef(Math.floor(Math.random() * 100) + 1);
  const attempts = useRef();

  const playGame = (userInput) => {
    attempts.current--;
    if (attempts.current > 0) {
      if (userInput === targetNumber.current) {
        setResult("Congratulations! You guessed the number");
      } else {
        setResult(
          userInput > targetNumber.current
            ? `Too high! Try Again<br>Attempts Left: ${attempts.current}`
            : `Too Low! Try Again<br>Attempts Left: ${attempts.current}`
        );
      }
    } else {
      setResult(`Game Over! Correct Number was: ${targetNumber.current}`);
    }
  };

  const setDifficultyAndAttempts = (difficultyLevel) => {
    setDifficulty(difficultyLevel);
    switch (difficultyLevel) {
      case "Easy":
        attempts.current = 12;
        break;
      case "Medium":
        attempts.current = 10;
        break;
      case "Hard":
        attempts.current = 5;
        break;
      default:
        break;
    }
    user_value.current.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        let userInput = parseInt(event.target.value);
        if (!isNaN(userInput) && userInput >= 1 && userInput <= 100) {
          playGame(userInput);
        } else {
          alert("Please Enter valid number");
        }
      }
    });
  };

  return (
    <>
      <div className="game-container neon-button">
        <h1>Guess the Number</h1>
        <input
          ref={user_value}
          type="text"
          placeholder="Enter a number between 1-100"
        />
        <div className="modes">
          {difficulty ? (
            <h6>{`${difficulty} Mode Selected`}</h6>
          ) : (
            <h6>Choose Difficulty</h6>
          )}
        </div>
        <div className="buttons">
          <button onClick={() => setDifficultyAndAttempts("Easy")}>Easy</button>
          <button onClick={() => setDifficultyAndAttempts("Medium")}>Medium</button>
          <button onClick={() => setDifficultyAndAttempts("Hard")}>Hard</button>
        </div>
        {result && <p dangerouslySetInnerHTML={{ __html: result }}></p>}
      </div>
    </>
  );
};

export default GuesstheNumber;
