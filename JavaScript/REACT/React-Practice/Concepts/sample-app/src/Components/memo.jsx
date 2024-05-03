//Using memo will cause React to skip rendering a component if its props have not changed.

import { memo } from "react";

const Todos = ({ todos }) => {
    console.log('Todos is re-rendering....')
  return (
    <>
      <h2>My Todos</h2>
      {todos.map((todo, index) => {
        return <p key={index}>{todo}</p>;
      })}
    </>
  );
};

export default memo(Todos);