import { useState, createContext, useContext } from "react";
import ReactDOM from "react-dom/client";

const UserContext = createContext();

function Component_1() {
  const [user, setUser] = useState("Jesse Hall");

  return (
    <UserContext.Provider value={user}>
      <h2>{`Hello ${user}!`}</h2>
      <Component_2 />
    </UserContext.Provider>
  );
}

function Component_2() {
  return (
    <>
      <h2>Component 2</h2>
      <Component_3 />
    </>
  );
}

function Component_3() {
  return (
    <>
      <h2>Component 3</h2>
      <Component_4 />
    </>
  );
}

function Component_4() {
  return (
    <>
      <h2>Component 4</h2>
      <Component_5 />
    </>
  );
}

function Component_5() {
  const user = useContext(UserContext);

  return (
    <>
      <h2>Component 5</h2>
      <h2>{`Hello ${user} again!`}</h2>
    </>
  );
}
export {Component_1}