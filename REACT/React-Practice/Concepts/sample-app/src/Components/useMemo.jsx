import { useState, useMemo } from "react";

const nums =  new Array(30_000_000).fill(0).map((_, i) => {
        return {
            index: i,
            isMagical: i === 29_000_000
        };
    });
// Extremely expensive computation as extremely big array
// Using useMemo() to memoizing the expensive computation so that it is not re-executed every time the component is re-rendered thus optimizing the perofrmance
// Memoization is an optimization technique used primarily in programming to speed up the execution of functions by caching the results 
//of expensive function calls and returning the cached result when the same inputs occur again. 
//This avoids redundant calculations and improves performance, especially for functions with expensive computations or repetitive calculations.

const ExpensiveComputation = () => {
    const [count, setCount] = useState(0)
    const [numbers, setNumbers] = useState(nums)

    const magicalNumber = useMemo(() => {
        return numbers.find(n => n.isMagical);
    }, [numbers]);

    const handleClick = () => {
        setCount(count + 1);
        if (count === 10) {
            setNumbers(new Array(10_00_000).fill(0).map((_, i) => {
                return {
                    index: i,
                    isMagical: i === 1_00_000
                };
            }));
        }
    };

    return (
        <div>
            <h2>UseMemo() Demonstration</h2>
            <p>Magical Number is: {magicalNumber.index}</p>
            <button onClick={handleClick}>Click me</button>
            <p>Counter: {count}</p>
        </div>
    );
}

export default ExpensiveComputation;


// useMemo() caches the the value from an expensive function or any general value ie it makes it skip rendering if its dependecy array is not updated 
// Memo caches the component ie it makes it skip rendering if its props have not changed.
// useCallback() caches the func ie it makes it skip rendering if its arguments have not changed.