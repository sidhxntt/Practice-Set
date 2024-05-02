# Async JS

#### Synchronous Code

Synchronous code in JavaScript executes line by line, in order, without waiting for any operation to complete. This means that each statement is executed one after the other, and the next statement doesn't start until the previous one has finished. Synchronous code is straightforward to understand and reason about because the execution flow is predictable.

#### Aynchronous Code

- A line/Set of Code that takes some computational time such as settimeout(), setinterval() and is attached to main thread once its done executing.

- Asynchronous code in JavaScript allows operations to be executed concurrently, without waiting for one operation to finish before starting another. This is particularly useful for tasks that involve I/O operations, such as fetching data from a server or reading from a file, as it allows the program to continue executing other tasks while waiting for the I/O operation to complete. Asynchronous code is crucial for building responsive and efficient applications, especially in environments like web browsers where I/O operations are common

#### Callback Function

Callback functions in JavaScript are functions that are passed as arguments to other functions and are called inside the body of the containing function. They are commonly used to handle asynchronous operations or to define behavior that should occur after a certain task is completed.

#### Promises

- Promises in JavaScript are used for handling asynchronous operations. It connects Producer code ,something ie taking time such as fetching & uploading over the network, authentication, authorisation etc to consumer code that does something with the result of the producing code.

- Promises are a way to ensure that the consumer code receives a promise from the producer code and does not have to wait for the result of the producer code to be available before it can perform actions with it. The rest of the code can continue synchronously without waiting for the result of the producer code. As soon as a promise is resolved/rejected by the producer code, it becomes available to the consumer code without halting the main thread of the process.

- In other words it a way to make asynchronous nature of JS more synchronous.