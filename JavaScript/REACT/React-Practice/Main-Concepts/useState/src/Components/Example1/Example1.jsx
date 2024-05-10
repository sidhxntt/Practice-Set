import { useState, useEffect } from "react";
import Counter1 from "./Counter1";

const Example1 = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("Parent Component Rendered")
  })
  
  return (
    <>
      <h1>Example 1</h1>
      <p>Tranfer of Entire useState(count & setcount) of the parent to children component and changing it using the child </p>
      <p>Therefore on changing state of parent from child ,will trigger re-rendering of both </p>
      <p>Parent will re-render because its state got changed by it child</p>
      <p>child will re-render coz props got updated</p>
      <Counter1 count={count} setCount={setCount} />
    </>
  );
};

export default Example1;
