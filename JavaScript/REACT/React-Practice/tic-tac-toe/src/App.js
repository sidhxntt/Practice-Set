//JSX where we can write html and js together & we can write js inside {}
// Components are nothing but js function which returns html
//App component is the main component as we need to wrap everyhing under it so it can be exported as a one & attached in the root element of REACT DOM
// We cant return multiple elements from a component to do  that wrap it around open tags <> </>
// Create component of those things that appear to be repetetive in the html
// props to pass the value each square should have from the parent component (Board) to its child (Square).

import Square from "./Sqaure";

function Board() {
  }
  return (
    <>
        <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );


export default Board;
