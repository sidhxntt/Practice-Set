import React, { useState } from "react";
import './App.css';
import Greet from './Components/greet';
import Counter from './Components/counter';

function App() {
  // useState is a hook that allows us to have state in functional components
  // state is a variable that is local to a component same as local fuctional variables whereas props are arguments to the function and are immuatable
  // Its just  a local variable wrt the component that can be rendered to the DOM 
  const [name, setName] = useState('sid');
 
  return (
    <div className="App">
      {/* Props, i.e., passing values from parent to children components */}
      {/* Basically, components are JavaScript functions that take props as arguments and output markup */}
      {/* Everything here is basically a function call for greet and everything that it takes is an argument (props) */}
      <Greet name={name}>
        <p>Wassup</p> 
      </Greet>

      {/* Reusing the component */}
      <Greet name='pri'>
        <button>Click</button>
      </Greet>

      <Greet name={name}>
        <button onClick={()=>{setName('MONDO')}}>Click me</button>
        {/* Output is so because this state is local to App component so it will first change the name pass it as the new name as a prop */}
      </Greet>
      
      <Counter/>
    </div>
  );
}

export default App;
