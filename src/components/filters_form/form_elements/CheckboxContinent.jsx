export default function CheckboxContinent({
  continent,
  continentsChecked,
  setContinentsChecked,
  i,
}) {
  const handleContinentCheck = (i) => {
    setContinentsChecked(
      continentsChecked.map((continent, index) => {
        const boolean = index === i ? !continent.checked : continent.checked;
        return {
          name: continent.name,
          name_en: continent.name_en,
          checked: boolean,
        };
      })
    );
  };

  return (
    <>
      <input
        type="checkbox"
        name=""
        id={`checkbox-continent-${continent.name}`}
        value={continent.name}
        onChange={() => handleContinentCheck(i)}
        checked={continentsChecked[i].checked}
      />
      <label htmlFor={`checkbox-continent-${continent.name}`}>
        {continent.name}
      </label>
    </>
  );
}
