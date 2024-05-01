import Navbar from "./Components/navbar";
import Footer from "./Components/footer";
import Card1 from "./Components/card-1";
import Card2 from "./Components/card-2";
import Counter from "./Components/Main_counter";
import React, { useState } from "react";
import hooks_samples from "./Components/hooks";

function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };
  hooks_samples();
  return (
    <>
      <Navbar />
      <div className="card_holder">
        <Card1 title={"Card-Title-1"} name={"Heading-1"} desc={"Paraaa"} />
        <Card1 title={"Card-Title-2"} name={"Heading-2"} desc={"Paraaa"} />
        <Card1 title={"Card-Title-3"} name={"Heading-3"} desc={"Paraaa"} />
        {/* function ie handeClick as a prop */}
        <Card2 handleClick={handleClick} title={"Card-Title-4"} name={"Heading-4"} desc={"Paraaa"} />
        <Card2 handleClick={handleClick} title={"Card-Title-5"} name={"Heading-5"} desc={"Paraaa"} />
      </div>
      
      <button onClick={handleClick}>CLICK ME</button>
      <Counter count={count}/>
      <Footer />

    </>
  );
}

export default App;
