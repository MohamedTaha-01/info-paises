import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState([]);
  const [countryName, setCountryName] = useState("");

  // fetch country names
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "https://restcountries.com/v3.1/all?fields=name"
      );
      setData(res.data);
    };
    fetchData();
  }, []);

  // choose random country name
  useEffect(() => {
    const random = Math.floor(Math.random() * data.length);
    if (data.length > 1) setCountryName(data[random].name.common);
    else setCountryName("");
  }, [data]);

  return (
    <div className="home-wrapper">
      <Link to="/countries" className="home-left">
        <div>
          <h3>Explorar todo</h3>
        </div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
            <path d="M22.9 43.95q-3.95-.2-7.4-1.85-3.45-1.65-6-4.325Q6.95 35.1 5.475 31.55 4 28 4 24q0-4.15 1.575-7.8Q7.15 12.55 9.85 9.85q2.7-2.7 6.35-4.275Q19.85 4 24 4q7.45 0 12.95 4.7 5.5 4.7 6.75 11.8h-3.05q-.85-4.2-3.55-7.5-2.7-3.3-6.75-4.95v.9q0 1.75-1.2 3.05-1.2 1.3-2.95 1.3h-4.35v4.35q0 .85-.675 1.4-.675.55-1.525.55H15.5V24H21v6.25h-3.35l-10.2-10.2q-.25 1-.35 1.975Q7 23 7 24q0 6.75 4.55 11.65t11.35 5.3Zm18.55-2.4-5.65-5.6q-1.05.75-2.275 1.15-1.225.4-2.525.4-3.55 0-6.025-2.475Q22.5 32.55 22.5 29q0-3.55 2.475-6.025Q27.45 20.5 31 20.5q3.55 0 6.025 2.475Q39.5 25.45 39.5 29q0 1.3-.425 2.525-.425 1.225-1.125 2.325l5.6 5.6q.45.45.475 1.05.025.6-.425 1.1-.45.45-1.075.425Q41.9 42 41.45 41.55ZM31 34.5q2.3 0 3.9-1.6t1.6-3.9q0-2.3-1.6-3.9T31 23.5q-2.3 0-3.9 1.6T25.5 29q0 2.3 1.6 3.9t3.9 1.6Z" />
          </svg>
        </div>
      </Link>
      <Link to={`/countries/${countryName}`} className="home-right">
        <div>
          <h3>Explorar aleatorio</h3>
        </div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
            <path d="M22.9 43.95q-3.95-.2-7.4-1.85-3.45-1.65-6-4.325Q6.95 35.1 5.475 31.55 4 28 4 24q0-4.15 1.575-7.8Q7.15 12.55 9.85 9.85q2.7-2.7 6.35-4.275Q19.85 4 24 4q7.45 0 12.95 4.7 5.5 4.7 6.75 11.8h-3.05q-.85-4.2-3.55-7.5-2.7-3.3-6.75-4.95v.9q0 1.75-1.2 3.05-1.2 1.3-2.95 1.3h-4.35v4.35q0 .85-.675 1.4-.675.55-1.525.55H15.5V24H21v6.25h-3.35l-10.2-10.2q-.25 1-.35 1.975Q7 23 7 24q0 6.75 4.55 11.65t11.35 5.3Zm18.55-2.4-5.65-5.6q-1.05.75-2.275 1.15-1.225.4-2.525.4-3.55 0-6.025-2.475Q22.5 32.55 22.5 29q0-3.55 2.475-6.025Q27.45 20.5 31 20.5q3.55 0 6.025 2.475Q39.5 25.45 39.5 29q0 1.3-.425 2.525-.425 1.225-1.125 2.325l5.6 5.6q.45.45.475 1.05.025.6-.425 1.1-.45.45-1.075.425Q41.9 42 41.45 41.55ZM31 34.5q2.3 0 3.9-1.6t1.6-3.9q0-2.3-1.6-3.9T31 23.5q-2.3 0-3.9 1.6T25.5 29q0 2.3 1.6 3.9t3.9 1.6Z" />
          </svg>
        </div>
      </Link>
    </div>
  );
}
