import { useState, useEffect } from "react";
import Counter3 from "./Counter3";

const Example3 = () => {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };
  useEffect(() => {
    console.log("Parent component rendered");
  });

  return (
    <>
      <h1>Example 3</h1>
      <p>
        Tranfer of Entire handleclick function except the count(state) of the
        parent to children component where the function is getting triggered{" "}
      </p>
      <p>
        Therefore on changing state of parent will trigger re-rendering of only
        the Parent but the child wil render too because by default if parent
        changes all its direct children are re-rendered but that re-render
        doesn't necessarily changes the actual DOM , thats how React works ,
        only visible changes are updated to real DOM.{" "}
      </p>
      <Counter3 handleClick={handleClick} />
      <p>Counter: {count}</p>
    </>
  );
};

export default Example3;
