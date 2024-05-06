import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav>
        <h1>Jobarouter</h1>
        <NavLink to="/">Home</NavLink>
        <NavLink to="about">About</NavLink>
        <NavLink to="help">Help</NavLink>
      </nav>
    </header>
  );
};

export default Header;
