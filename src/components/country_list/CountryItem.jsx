import { Link } from "react-router-dom";

export default function CountryItem({ country }) {
  return (
    <Link className="data-grid" to={`/countries/${country.name.common}`}>
      <div className="c0">{country.flag}</div>
      <div className="c1">{country.name.common}</div>
      <div className="c2">{country.capital}</div>
      <div className="c3">
        {country.continents.map((continent, i) => (
          <span key={`continent${i}`}>{continent}</span>
        ))}
      </div>
      <div className="c4">{country.population}</div>
      <div className="c5">{Object.values(country.languages).join(", ")}</div>
    </Link>
  );
}
