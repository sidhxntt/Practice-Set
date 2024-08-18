import * as p from "@clack/prompts";
import { setTimeout } from "node:timers/promises";
import color from "picocolors";

async function spinner() {
  const s = p.spinner();
  s.start();
  // Simulate some async operation
  await setTimeout(1000);
  // Stop spinner
  s.stop();
}

function cancelOperation(input) {
  if (p.isCancel(input)) {
    p.outro(`${color.bgRed(color.black(`Operation Cancelled`))}`);
    process.exit(0);
  }
}

async function main() {
  // Introduction message
  p.intro(`${color.bgMagenta(color.black(`Example CLI`))}`);

  const shouldContinue = await p.confirm({
    message: "Do you want to continue?",
  });

  cancelOperation(shouldContinue);

  if (shouldContinue) {
    await spinner();

    // Ask for the user's name
    const name = await p.text({
      message: "What is your name?",
      placeholder: "Enter your name here",
      validate(value) {
        if (value.length === 0) return `Value is required!`;
      },
    });

    cancelOperation(name);
    await spinner();

    // Ask for the user's age
    const age = await p.text({
      message: "What is your age?",
      placeholder: "Enter your age here",
      validate(value) {
        if (value.length === 0) return `Value is required!`;
      },
    });

    cancelOperation(age);
    await spinner();

    // Ask for the project type
    const projectType = await p.select({
      message: 'Pick a project type.',
      options: [
        { value: 'ts', label: 'TypeScript' },
        { value: 'js', label: 'JavaScript' },
        { value: 'coffee', label: 'CoffeeScript', hint: 'recommended' },
      ],
      required: true
    });

    cancelOperation(projectType);

    if (projectType === 'coffee') {
      p.note('You have chosen CoffeeScript');
    }

    await spinner();

    // Ask for hobbies
    const hobbies = await p.multiselect({
      message: 'Select hobbies.',
      options: [
        { value: 'music', label: 'Music' },
        { value: 'coding', label: 'Coding' },
        { value: 'gym', label: 'Gym' },
      ],
      required: true
    });

    cancelOperation(hobbies);

    p.outro(`${color.bgGreen(color.black(`Hello ${name}, age: ${age}`))}`);
  } else {
    p.outro(`${color.bgGreen(color.black(`Bye`))}`);
  }
}

// Run the main function
main();
