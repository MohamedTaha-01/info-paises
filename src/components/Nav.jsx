import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/countries">Países y territorios</Link>
        </li>
      </ul>
    </nav>
  );
}
