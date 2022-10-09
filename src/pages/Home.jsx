import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      Home
      <div>
        <h3>Países y territorios</h3>
      </div>
      <div>
        <Link to="/countries">
          <p>Todos los países y territorios</p>
          <p>Todos los países</p>
        </Link>
      </div>
      <div>
        <h3>Continentes</h3>
      </div>
      <div>
        <Link to="/countries">África</Link>
        <Link>
          <p>América</p>
        </Link>
        <Link>
          <p>Antártida</p>
        </Link>
        <Link>
          <p>Asia</p>
        </Link>
        <Link>
          <p>Europa</p>
        </Link>
        <Link>
          <p>Oceanía</p>
        </Link>
      </div>
    </div>
  );
}
