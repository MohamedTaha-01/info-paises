import { Link } from "react-router-dom";
import CountryItem from "./CountryItem";

export default function CountryList({ data }) {
  return (
    <div>
      {data &&
        data.map((country, i) => (
          <Link to={`/countries/${country.name.common}`} key={i}>
            <CountryItem country={country} />
          </Link>
        ))}
    </div>
  );
}
