import { useState } from "react";
import "./App.css";
import Navbar from "./Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar count={count}/>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}> + </button>
        <button onClick={() => setCount((count) => count - 1)}> - </button>
      </div>
    </>
  );
}

export default App;
