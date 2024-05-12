# Async JS

#### Synchronous Code

Synchronous code in JavaScript executes line by line, in order, without waiting for any operation to complete. This means that each statement is executed one after the other, and the next statement doesn't start until the previous one has finished. Synchronous code is straightforward to understand and reason about because the execution flow is predictable.

#### Aynchronous Code

- A line/Set of Code that takes some computational time such as settimeout(), setinterval() and is attached to main thread once its done executing.

- Asynchronous code in JavaScript allows operations to be executed concurrently, without waiting for one operation to finish before starting another. This is particularly useful for tasks that involve I/O operations, such as fetching data from a server or reading from a file, as it allows the program to continue executing other tasks while waiting for the I/O operation to complete. Asynchronous code is crucial for building responsive and efficient applications, especially in environments like web browsers where I/O operations are common

#### Callback Function

Callback functions in JavaScript are functions that are passed as arguments to other functions and are called inside the body of the containing function. They are commonly used to handle asynchronous operations or to define behavior that should occur after a certain task is completed.

#### Promises

- Promises in JavaScript are used for managing asynchronous operations. They act as a bridge between producer code, which involves tasks that take time to complete such as fetching data from a server, uploading files, or handling authentication and authorization, and consumer code, which deals with processing the results of these tasks.

- Promises ensure that the consumer code receives a placeholder (promise) from the producer code, allowing it to continue execution without blocking the main thread. This means that the rest of the code can proceed synchronously, even though the result of the asynchronous operation isn't immediately available. Once the asynchronous operation is completed, the promise is resolved or rejected, and the consumer code can then handle the result or error, respectively.

- In essence, promises enable a more synchronous-like flow in asynchronous JavaScript code by providing a mechanism for handling asynchronous tasks without blocking the execution of other code.
- In JavaScript, when you're dealing with promises and using async/await, the code execution will proceed to the next line only after the promise has been resolved.
