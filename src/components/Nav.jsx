import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function Nav() {
  let { pathname } = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);

  console.log(pathname);

  useEffect(() => {
    if (pathname === "/") {
      setShowNavbar(false);
    } else setShowNavbar(true);
  }, [pathname]);

  return showNavbar ? (
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
  ) : null;
}
