import { IDLE_FETCHER } from "@remix-run/router";
import { useEffect } from "react";

export default function CheckboxContinent({
  continent,
  continentsChecked,
  setContinentsChecked,
  i,
}) {
  const indexOfAllCheckbox = continentsChecked
    .map((continent) => continent.name_en)
    .indexOf("All");

  useEffect(() => {
    // comprobar si algun continente es falso, en cuyo caso desactivar "Todos" y viceversa
  }, [continentsChecked]);

  const handleContinentCheck = (i) => {
    i === indexOfAllCheckbox ? toggleAll() : toggleOne(i);
  };

  const toggleOne = (i) => {
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

  const toggleAll = () => {
    setContinentsChecked(
      continentsChecked.map((continent) => {
        return {
          name: continent.name,
          name_en: continent.name_en,
          checked: !continentsChecked[indexOfAllCheckbox].checked,
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
