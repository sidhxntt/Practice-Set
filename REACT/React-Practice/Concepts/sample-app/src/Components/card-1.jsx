import React, { useState } from "react";

const Card1= ({ title, name, desc }) => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div className="cards">
      <h2>{title}</h2> 
      <img
        src="https://cdn.shopify.com/s/files/1/0306/6419/6141/articles/coding_languages.png?v=1619126283"
        alt=""
        width={333}
        style={{ border: "2px solid black" }}
      />
      <h3>{name}</h3>
      <p>{desc}</p>
      <button onClick={handleClick}>Counter</button>
      <p>Counter: {count}</p>
    </div>
  );
};

export default Card1;

// On clicking the button handleclick func is getting executed ie its passed as props from the parent component to the child component.
// and handlecick func is declared in child component ie Card1() and not in parent component ie App() which uses its local state varirable