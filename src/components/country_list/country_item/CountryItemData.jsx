export default function CountryItemData({ country }) {
  return (
    <>
      <div className="item-capital p-15">{country.capital}</div>
      <div className="item-continents p-15">
        {country.continents.map((continent, i) => (
          <span key={`continent${i}`}>{continent}</span>
        ))}
      </div>
      <div className="item-population p-15">{country.population}</div>
      <div className="item-languages p-15">
        {Object.values(country.languages).join(", ")}
      </div>
    </>
  );
}
