#!/usr/bin/env node

import * as p from "@clack/prompts";
import color from "picocolors";
import { spawn } from "child_process";


function cancelOperation(input) {
  if (p.isCancel(input)) {
    p.outro(`${color.bgRed(color.black(`Operation Cancelled`))}`);
    process.exit(0);
  }
}

async function installPackage(packageName) {
  try {
    let command;
    if (packageName === "ViteJS") {
      command = "npx create-vite@latest";
    } else if (packageName === "NextJS") {
      command = "npx create-next-app@latest";
    } else {
      throw new Error(`Unknown package: ${packageName}`);
    }

    const child = spawn(command, {
      stdio: "inherit", // Directly use the parent process's stdin, stdout, and stderr
      shell: true, // Use shell to handle command-line parsing and environment
    });

    child.on("error", (err) => {
      console.error(`Error: ${err.message}`);
    });

  } catch (error) {
    console.error(`Failed to install ${packageName}: ${error.message}`);
  }
}

async function main() {
  p.intro(`${color.bgMagenta(color.black(`Example CLI -2`))}`);

  const projectType = await p.select({
    message: "Pick a project type.",
    options: [
      { value: "frontend", label: "Frontend" },
      { value: "backend", label: "Backend" },
      { value: "all", label: "All", hint: "recommended" },
    ],
    required: true,
  });

  cancelOperation(projectType);

  if (projectType === "frontend") {
    const framework = await p.select({
      message: "Pick a Framework.",
      options: [
        { value: "ViteJS", label: "ViteJS" },
        { value: "NextJS", label: "NextJS" },
      ],
      required: true,
    });

    cancelOperation(framework);

    await installPackage(framework);
  }

}

// Run the main function
main();
