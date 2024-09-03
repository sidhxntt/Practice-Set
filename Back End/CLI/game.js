#!/usr/bin/env node

import * as p from "@clack/prompts";
import color from "picocolors";

async function showSpinner(duration) {
  const s = p.spinner();
  s.start('Calculating your score');
  await new Promise(resolve => setTimeout(resolve, duration)); 
  s.stop();
}

function cancelOperation(input) {
  if (p.isCancel(input)) {
    p.outro(`${color.bgRed(color.black(`Operation Cancelled`))}`);
    process.exit(0);
  }
}

async function main() {
  p.intro(`${color.bgMagenta(color.black(`Technical Trivia`))}`);

  const shouldContinue = await p.confirm({
    message: "No cheating. 5 questions. Score at the end. Ready to play?",
  });

  cancelOperation(shouldContinue);

  let score = 0;

  if (shouldContinue) {
    const questions = [
      {
        message: "Language of React?",
        options: [
          { value: "jsx", label: "JSX" },
          { value: "py", label: "Python" },
          { value: "js", label: "JavaScript" },
          { value: "none", label: "None of the above" },
        ],
        correctAnswer: "jsx"
      },
      {
        message: "Which one is a CSR focused framework?",
        options: [
          { value: "next", label: "NextJS" },
          { value: "express", label: "ExpressJS" },
          { value: "vite", label: "ViteJS" },
          { value: "none", label: "None of the above" },
        ],
        correctAnswer: "vite"
      },
      {
        message: "Which one is a SSR focused framework?",
        options: [
          { value: "next", label: "NextJS" },
          { value: "express", label: "ExpressJS" },
          { value: "vite", label: "ViteJS" },
          { value: "none", label: "None of the above" },
        ],
        correctAnswer: "next"
      },
      {
        message: "What architecture does K8s follow?",
        options: [
          { value: "monolith", label: "Monolithic" },
          { value: "pubsub", label: "Pub-Sub" },
          { value: "masterslave", label: "Master-Slave" },
          { value: "none", label: "None of the above" },
        ],
        correctAnswer: "masterslave"
      },
      {
        message: "What is MiniKube?",
        options: [
          { value: "localinstance", label: "Local Instance of K8s" },
          { value: "cloud", label: "Cloud Instance of K8s" },
          { value: "decentralised", label: "Decentralised way of K8s" },
          { value: "none", label: "None of the above" },
        ],
        correctAnswer: "localinstance"
      }
    ];

    for (const q of questions) {
      const answer = await p.select({
        message: q.message,
        options: q.options,
        required: true,
      });

      cancelOperation(answer);

      if (answer === q.correctAnswer) {
        score += 1;
      }
    }

    await showSpinner(3000);

    // Display the total score
    if (score === 5) {
      p.note(`You are a Technical Genius!! \nTotal Score: ${score}/5`);
    } else {
      p.note(`You need to try again! \nTotal Score: ${score}/5`);
    }
  }

  p.outro(`${color.bgGreen(color.black(`Game Over`))}`);
}

// Run the main function
main();
