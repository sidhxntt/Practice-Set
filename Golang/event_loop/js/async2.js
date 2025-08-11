console.log("Starting...");

function func1() {
    console.log("func1 executed");
}

// This function returns a Promise
async function func2() {
    console.log("func2 started - running in background");
    
    // await pauses THIS function, not the main thread
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    console.log("func2 completed after 5 seconds");
    return "func2 result"; // Automatically wrapped in Promise
}

function func3() {
    console.log("func3 executed");
}

async function main() {
    func1();
    
    // Method 1: Sequential execution (waits for func2)
    console.log("=== Sequential Approach ===");
    const result = await func2(); // Waits here
    func3(); // Only runs after func2 completes
    console.log("Result:", result);
}

// Alternative: Concurrent execution
async function mainConcurrent() {
    func1();
    
    console.log("=== Concurrent Approach ===");
    // Start func2 but don't wait yet - it returns a Promise immediately
    const promise = func2();
    
    func3(); // Runs immediately while func2 is still working
    
    // Now wait for func2 to finish
    const result = await promise;
    console.log("Result:", result);
    
    console.log("All done!");
}

// Run the concurrent version
mainConcurrent();

// Output:
// Starting...
// func1 executed
// === Concurrent Approach ===
// func2 started - running in background
// func3 executed
// (5 seconds later...)
// func2 completed after 5 seconds
// Result: func2 result
// All done!