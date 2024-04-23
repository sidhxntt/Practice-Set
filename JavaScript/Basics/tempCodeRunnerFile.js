let getcheese = () => {
    let cheese = '🧀';
    setTimeout(() => {
        console.log("Here is cheese " + cheese);
    }, 1000);
    return cheese;
}

let r=getcheese();
console.log("Got the cheese "+r); // This line will be executed immediately after calling getcheese
