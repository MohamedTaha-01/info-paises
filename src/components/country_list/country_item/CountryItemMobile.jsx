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
    </div>
  );
}
