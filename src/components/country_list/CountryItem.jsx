export default function CountryItem({country}) {
  return (
    <p>
      {country.name.common}&nbsp;
      {country.capital}&nbsp;
      {country.population}&nbsp;
      {country.region}&nbsp;
      {/* {JSON.stringify(country.currencies)}&nbsp;
                  {JSON.stringify(country.languages)}&nbsp; */}
      {/* currencies, languages */}
    </p>
  );
}
