import { Link } from "react-router-dom";
import CountryItem from "./CountryItem";

export default function CountryList({
  data,
  searchValue,
  continentsChecked,
  onlyCountries,
  onlyTerritories,
}) {
  if (data === undefined) return false;
  // let filtro = data.filter((country) => {
  //   return country.capital.length > 0;
  // });
  // console.log(
  //   filtro.filter((country) => {
  //     return country.capital[0].toLowerCase().includes(searchValue.toLowerCase());
  //   })

  if (searchValue !== "") {
    data = data.filter((country) => {
      return (
        country.name.common.toLowerCase().includes(searchValue.toLowerCase()) ||
        country.capital.includes(searchValue.toLowerCase())
      );
    });
  }

  const selectedContinents = continentsChecked
    .filter((o) => {
      return o.checked ? o.name : "";
    })
    .map((o) => {
      return o.name_en;
    });

  selectedContinents.forEach((continent) => {
    data = data.filter((country) => {
      return country.continents.includes(continent);
    });
  });

  if (onlyCountries) {
    data = data.filter((country) => {
      return country.independent === true;
    });
  }

  if (onlyTerritories) {
    data = data.filter((country) => {
      return country.independent === false;
    });
  }
  console.log(data);

  return (
    <div>
      <div>{`${data.length} resultados encontrados`}</div>
      {data &&
        data.map((country, i) => (
          <Link to={`/countries/${country.name.common}`} key={i}>
            <CountryItem country={country} />
          </Link>
        ))}
    </div>
  );
}
