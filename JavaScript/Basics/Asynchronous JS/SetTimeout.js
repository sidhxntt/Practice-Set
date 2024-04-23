console.log("start");

// setInterval(() => {
//     console.log("WASSUP!"); //after every 3s of interval
// }, 3000);

console.log("end");

setTimeout(() => {
    console.log("IDK"); // One time after 4s
}, 1000);

// These are pre build call back  functions, which will execute once the given time is over.
// setTimeout(callback function, milliseconds) - It executes the callback function after the given time in ms.
// Timeout function - executes only one time.
// Set Interval function - keeps on executing in a loop with a specified time difference between two consecutive executions.
// Set Interval function - keeps on executing in the given time until you stop it manually.