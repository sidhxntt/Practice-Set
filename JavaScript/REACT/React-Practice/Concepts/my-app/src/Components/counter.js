import React, { useState } from "react";
const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>count is: {count}</h1>
      <button onClick={()=>{setCount(count+1)}}>Click me</button>
    </>
  );
};

export default Counter;
