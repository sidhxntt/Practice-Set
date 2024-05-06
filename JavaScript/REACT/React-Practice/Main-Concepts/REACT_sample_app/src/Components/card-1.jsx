import React, { useState, useEffect, useRef} from "react";
//Anytime ref changes it wont re-render the component unlike state therefore not recommended to use it in DOM that is in return part of the component
const Card1 = ({ title, name, desc }) => {
  const [count, setCount] = useState(0);
  // let a=0
  const a =useRef(0)//makes the value persist regardless of re-rendering
  const handleClick = () => {
    setCount(count + 1);
  };
  useEffect(() => {
    // a=a+1
    //  Not using useRef here makes it impossible for this variable to retain its value after the component is re-render
    //basically as useEffect is making this component re-render a is getting re-initialised as 0 and then it is getting incremented
    //so the value of a is 1
    a.current=a.current+1
    console.log(a.current)
    alert("Running because state of the card changed");
    
  }, [count]);

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
