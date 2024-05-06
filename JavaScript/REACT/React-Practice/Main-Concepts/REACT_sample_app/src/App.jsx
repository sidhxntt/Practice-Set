//JSX allows us to write HTML elements in JavaScript and place them in the DOM without any createElement()  and/or appendChild() methods. 
//It cant return more than one element therefore should be wrapped in some tags.
import Navbar from "./Components/navbar";
import Footer from "./Components/footer";
import Card1 from "./Components/card-1";
import Card2 from "./Components/card-2";
import Counter from "./Components/Main_counter";
import List_items from "./Components/lists";
import React, { useState, useEffect, useRef, useCallback } from "react";
import hooks_samples from "./Components/useEffect";
import { Component1 } from "./Components/useContext(prob)";
import { Component_1} from "./Components/useContext(sol)";
import EventListner from "./Components/event_listner";
import ExpensiveComputation from "./Components/useMemo";
import Todos from "./Components/memo";
import Example1 from "./Components/useRef";
import Example2 from "./Components/usecallback";

//Components are independent and reusable bits of code. They serve the same purpose as JavaScript functions, but work in isolation and return HTML.
// They are JS function that takes props as arguments and output markup

function App() {
  // useState is a hook that allows us to have state in functional components and when state changes the component re-renders
  // state is a variable that is local to a component same as fuctional variables are local to funcs whereas props are arguments to the function and are immuatable
  // Its just  a local variable wrt the component that can be rendered to the DOM
  const [count, setCount] = useState(0);
  const [showcontent, setShowcontent]= useState(true);
  const [todos, setTodos] = useState(["todo 1", "todo 2"]);
  const [adjective, setAdjective] = useState("good");
  const btnRef = useRef();
//useRef() hook is primarily used to create mutable references to DOM elements or any other value that persists across 
//renders without causing a re-render when the value changes unike useState() that causes re-render when its value is changed.
  const handleClick = () => {
    setCount(count + 1);
  };
  // hooks_samples(count);
  // useEffect used for app component but not card-1


const change_adjective = useCallback(
  () => {
    setAdjective('bad')
  },
  [],
)

  return (
    <>
      <Navbar />
      <div className="card_holder">
        {/* Props, i.e., passing values from parent to children components */}
        {/* Basically, components are JavaScript functions that take props as arguments and output markup */}
        {/* Everything here is basically a function call for Card and everything that it takes is an argument (props) */}
        <Card1 title={"Card-Title-1"} name={"Heading-1"} desc={"Paraaa"} />
        <Card1 title={"Card-Title-2"} name={"Heading-2"} desc={"Paraaa"} />
        <Card1 title={"Card-Title-3"} name={"Heading-3"} desc={"Paraaa"} />
        {/* function ie handeClick as a prop */}
        <Card2
          handleClick={handleClick}
          title={"Card-Title-4"}
          name={"Heading-4"}
          desc={"Paraaa"}
          count={count}
        />
        <Card2
          handleClick={handleClick}
          title={"Card-Title-5"}
          name={"Heading-5"}
          desc={"Paraaa"}
          count={count}
        />
      </div>
      <div className="main">
      <button ref={btnRef} onClick={handleClick}>Counter Button</button> 
      {/* ref is a special prop that allows us to access the DOM element directly without DOM manupilation */}
      <Counter count={count} />
      {/* using the above btn reference here in this new btn to change its bg color using useRef() */}
      <button onClick={()=>{btnRef.current.style.backgroundColor ='red'}}>Colour Change button</button> 
      {/* Conditional Rendering */}
      <div>
        {showcontent && <p>This text will toggle wrt to buttons aka CONDITIONAL RENDERING</p>}
        {showcontent ? <button onClick={()=>{setShowcontent(false)}}>Click to Hide</button> : <button onClick={()=>{setShowcontent(true)}}>Click to show</button>}
      </div>
      <hr />
      <List_items/>
      {/* UseContext Prob */}
      <hr />

      <div>
        <h1>The Problem useContext() is trying to solve</h1>
        <Component1/>
        <hr />
        <h1>The Problem solved using useContext() </h1>
        <Component_1/>
        <hr />
        <EventListner/>
        <hr />
      </div>

      <ExpensiveComputation/>
      <h2>As count changes entire component will be re-rendered except Todos as its using memo</h2>
      <Todos todos={todos}/> 
      <hr />
      <h1>UseRef() usage</h1>
      <Example1/>
      <h1>UseCallback() usage</h1>
      <Example2 count={count} handleClick={handleClick} adjective={adjective} change_adjective={change_adjective}/>
    </div>
      <Footer />
    </>
  );
}

export default App;
//in react if a child component re-renders will the parent component too?
// Yes , by default if parent changes all its direct children are re-rendered but that re-render doesn't necessarily changes the actual DOM , 
// thats how React works , only visible changes are updated to real DOM.

