console.log("Starting...");

function func1() {
    console.log("func1 executed");
}

function func2() {
    return new Promise((resolve) => {
        console.log("func2 started - running in background");
        setTimeout(() => {
            console.log("func2 completed after 5 seconds");
            resolve("func2 result");
        }, 5000);
    });
} // returnes immediately by returning a promise for non- blocking main thread execution

function func3() {
    console.log("func3 executed");
}

function main (){
    func1();

    const promise = func2();
    console.log("Promise returned:", promise);

    func3(); 

    promise.then((result) => {
        console.log("Callback executed with result:", result);
    }); // registered callback here to call the func2 once ready

    console.log("All synchronous code done!");
}

main()
