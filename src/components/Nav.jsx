import { Link, NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <h1>
        <Link to="/">Info países</Link>
      </h1>
      <ul>
        <li>
          <NavLink end to="/">
            <h3>Inicio</h3>
          </NavLink>
        </li>
        <li>
          <NavLink to="/countries">
            <h3>Países y territorios</h3>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
