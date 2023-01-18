export default function CountryItemMobile({ country }) {
  return (
    <div className="country-item-mobile">
      <div
        className="item-name"
        style={{
          backgroundImage:
            `linear-gradient(90deg, rgba(255,255,255,0) 0, #002752 100%), url('https://flagcdn.com/w320/${country.cca2}.png')`.toLowerCase(),
        }}
      >
        {country.name.common}
      </div>
      <div className="mobile-accordion">
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
      </div>
    </div>
  );
}
