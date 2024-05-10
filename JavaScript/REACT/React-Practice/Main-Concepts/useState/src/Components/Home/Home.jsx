import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1>Hello User!</h1>
      <p>Corner Cases of React Hooks are the purpose of this page</p>
      <p>React Routing too 🥵</p>
      <p><i><b>UseState() is just local variables to the component which when changes causes component to re-render hence the name state</b></i></p>
      <ul>
        <li>
          <Link to="/example-1">Example-1</Link>
        </li>
        <li>
          <Link to="/example-2">Example-2</Link>
        </li>
        <li>
          <Link to="/example-3">Example-3</Link>
        </li>
        <li>
          <Link to="/example-4">Example-4</Link>
        </li>
      </ul>
    </>
  );
};

export default Home;
