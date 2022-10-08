import { Link } from "react-router-dom";
import CountryItem from "./CountryItem";

export default function CountryList({ data, searchValue }) {
  if (data !== undefined) {
    let filtro = data.filter((country) => {
      return country.capital.length > 0;
    });
    console.log(
      filtro.filter((country) => {
        return country.capital[0].toLowerCase().includes(searchValue.toLowerCase());
      })
    );
  }

  return (
    <div>
      {data &&
        data
          .filter(
            (country) =>
              country.name.common
                .toLowerCase()
                .includes(searchValue.toLowerCase()) ||
              country.capital.includes(searchValue.toLowerCase())
          )
          .map((country, i) => (
            <Link to={`/countries/${country.name.common}`} key={i}>
              <CountryItem country={country} />
            </Link>
          ))}
    </div>
  );
}
