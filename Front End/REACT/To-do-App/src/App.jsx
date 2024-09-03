import React, { useRef, useState } from "react";
import "./App.css";

function App() {
  const input_value = useRef();
  const [list, setList] = useState([]);

  function handleClick() {
    const newValue = input_value.current.value;
    if (newValue === "") {
      alert("Please enter a task");
      return;
    }
    setList([...list, newValue]);
    input_value.current.value = ""; // Clear input after adding task
  }

  return (
    <div className="container">
      <h1>To Do list</h1>
      <div className="input_area">
        <input ref={input_value} type="text" placeholder="Add task" />
        <button onClick={handleClick}>Add</button>
      </div>
      <ul>
        {list.map((item, index) => (
          <li key={index}> {item} </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
