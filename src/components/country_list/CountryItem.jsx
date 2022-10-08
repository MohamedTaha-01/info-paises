export default function CountryItem({ country }) {
  return (
    <p>
      {country.name.common}&nbsp;
      {country.capital}&nbsp;
      {country.continents.map((continent, i) => (
        <span key={`continent${i}`}>{continent}</span>
      ))}
      &nbsp;
      {country.population}&nbsp;
      {Object.values(country.languages).join(", ")}
      &nbsp;
    </p>
  );
}
