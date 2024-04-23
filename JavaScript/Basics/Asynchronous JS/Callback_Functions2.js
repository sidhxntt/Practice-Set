
// let getcheese = () => {
//     let cheese = '🧀';
//     setTimeout(() => {
//         console.log("Here is cheese " + cheese);
//     }, 1000);
//     return cheese;
// }

// let r=getcheese();
// console.log("Got the cheese "+r); 

// // This line will be executed immediately after calling getcheese
// // If we don't use a callback function and instead try to directly execute code after the asynchronous operation,
// //  it will lead to a synchronous behavior, causing the program to wait for the asynchronous operation to complete before
// //  proceeding further. In the case of JavaScript, this means that the code after the asynchronous operation will execute 
// // immediately after the asynchronous function is called, without waiting for its completion.

let getcheese = (callback) => {
    setTimeout(() => {
        let cheese = '🧀';
        console.log("Here is cheese " + cheese);
        callback(cheese);
    }, 1000);
}

getcheese((cheese) => {
    console.log("Got the cheese " + cheese);
});
