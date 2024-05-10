import Counter4 from "./Counter4";
import { useEffect } from "react";

const Example4 = () => {
    useEffect(() => {
      console.log("Parent component rendered");
    });
  
    return (
      <>
        <h1>Example 4</h1>
        <p>No Transfer of any state ie no props given to the child component</p>
        <p>Child component independently changes the counter which means only child component re-render but not the parent</p>
        <Counter4 />
      </>
    );
}

export default Example4