import { Link } from "react-router-dom";
import CountryItem from "./CountryItem";

export default function CountryListPage({ dataChunk }) {
  return (
    <div>
      {dataChunk.map((country, i) => (
        <Link to={`/countries/${country.name.common}`} key={`country${i}`}>
          <CountryItem country={country} />
        </Link>
      ))}
    </div>
  );
}
