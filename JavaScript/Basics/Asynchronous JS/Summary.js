// // Async function will run after the sync
// const Producer_code = () => {
//   return setTimeout(() => {
//     console.log(0);
//   }, 2000);
// };
// const Consumer_code = () => {
//   console.log(1);
//   console.log(2);
//   console.log(3);
// };

// Producer_code()
// Consumer_code();

// // Async function will run after the sync
// // 1,2,3,0 as settimeout is Async ie it will removed from main thread of syncronous execution flow and then place it
// // after synchronous process has been done.

// WITH PROMISE NOW TO MAKE ASYNC WORK AS SYNC


const Producer_code = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(0); // Resolve the promise once the timeout is complete
        }, 2000);
    });
};

const Consumer_code = async () => {
    const zero = await Producer_code(); // Wait for Producer_code to complete
    // Await is used to wait for the promise to be resolved until then zero has promise ie a placeholder for the actual value
    console.log(zero)
    console.log(1);
    console.log(2);
};

Consumer_code();
console.log(4)
