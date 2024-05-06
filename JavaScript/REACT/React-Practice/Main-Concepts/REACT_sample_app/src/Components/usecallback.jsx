//Function passed as prop
const Example2 = ({ count, handleClick, adjective, change_adjective }) => {
    console.log("Example2 is rendered")
  return (
    <>
      <p> Counter: {count} </p>
      <button onClick={handleClick}>Counter btn</button>
      <button onClick={change_adjective}>Change me</button>
      <p>I a {adjective} boy</p>
    </>
  );
};

export default Example2;
// Now if we press the main counter button in app.jsx it will change the stater of the main count causing re-rendering of the component 
// and the function ie in this case change_adjective will change as in JS func1()!=func2() even tho everything is same in functions
// causing the props of this component changing thus causing this component to re-render.