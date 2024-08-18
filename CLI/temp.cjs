const { spawn } = require('child_process');

const command = 'npx create-next-app@latest';

const child = spawn(command, {
    stdio: 'inherit', // Directly use the parent process's stdin, stdout, and stderr
    shell: true       // Use shell to handle command-line parsing and environment
});

child.on('error', (err) => {
    console.error(`Error: ${err.message}`);
});

child.on('exit', (code) => {
    console.log(`Process exited with code ${code}`);
});
