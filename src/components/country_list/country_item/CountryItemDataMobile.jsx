export default function CountryItemDataMobile({ country }) {
  return (
    <div className="data-grid-mobile">
      <div className="item-capital1_Mobile p-15">Capital</div>
      <div className="item-capital2_Mobile p-15">{country.capital}</div>
      <div className="item-continents1_Mobile p-15">Continentes</div>
      <div className="item-continents2_Mobile p-15">
        {country.continents.map((continent, i) => (
          <span key={`continent${i}`}>{continent}</span>
        ))}
      </div>
      <div className="item-population1_Mobile p-15">Población</div>
      <div className="item-population2_Mobile p-15">{country.population}</div>
      <div className="item-languages1_Mobile p-15">Idiomas</div>
      <div className="item-languages2_Mobile p-15">
        {Object.values(country.languages).join(", ")}
      </div>
    </div>
  );
}
