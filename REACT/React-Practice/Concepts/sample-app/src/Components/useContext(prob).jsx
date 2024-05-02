//PROBLEM
import { useState } from "react";
import ReactDOM from "react-dom/client";

function Component1() {
  const [user, setUser] = useState("Jesse Hall");

  return (
    <>
      <h2>{`Hello ${user}!`}</h2>
      <Component2 user={user} />
    </>
  );
}

function Component2({ user }) {
  return (
    <>
      <h2>Component 2</h2>
      <Component3 user={user} />
    </>
  );
}

function Component3({ user }) {
  return (
    <>
      <h2>Component 3</h2>
      <Component4 user={user} />
    </>
  );
}

function Component4({ user }) {
  return (
    <>
      <h2>Component 4</h2>
      <Component5 user={user} />
    </>
  );
}

function Component5({ user }) {
  return (
    <>
      <h2>Component 5</h2>
      <h2>{`Hello ${user} again!`}</h2>
    </>
  );
}
//Even though components 2-4 did not need the state, they had to pass the state along so that it could reach component 5.

export {Component1}