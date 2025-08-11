console.log("Starting...");

function func1() {
    console.log("func1 executed");
}

function func2() {
    const start = Date.now();
    while (Date.now() - start < 5000) {
    }
    console.log("func2 completed after 5 seconds");
    return "func2 result";
}

function func3() {
    console.log("func3 executed");
}

function main(){
    func1();
    func2(); // Delay of 5s
    func3(); 
    console.log("All done!");
}
main()
