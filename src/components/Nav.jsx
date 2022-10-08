import {Link} from "react-router-dom";

export default function Nav(){

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Inicio</Link>
                </li>
                <li>
                    <Link to="/countries">Países</Link>
                </li>
            </ul>
        </nav>
    )
}