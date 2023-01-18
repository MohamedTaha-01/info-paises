import { useContext } from "react";
import { ScreenSizeContext } from "../../../App";
import CountryItemData from "./CountryItemData";
import CountryItemDataMobile from "./CountryItemDataMobile";

export default function CountryItem({ country }) {
  const isSmallScreen = useContext(ScreenSizeContext);

  return (
    <div className="item">
      <div
        className="item-name"
        style={{
          backgroundImage:
            `linear-gradient(90deg, rgba(255,255,255,0) 0, #002752 100%), url('https://flagcdn.com/w320/${country.cca2}.png')`.toLowerCase(),
        }}
      >
        {country.name.common}
      </div>
      {isSmallScreen ? (
        <CountryItemDataMobile country={country} />
      ) : (
        <CountryItemData country={country} /> // Mobile country data accordion
      )}
    </div>
  );
}
