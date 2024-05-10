import {useEffect } from "react";

const Counter1 = ({ count, setCount }) => {
  useEffect(() => {
    console.log("Child Component Rendered")
  });
  return (
    <>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </>
  );
};

export default Counter1;
