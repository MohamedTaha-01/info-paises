import { Link } from "react-router-dom";
import CountryItem from "./country_item/CountryItem";
import { useContext } from "react";
import { ScreenSizeContext } from "../../App";
import CountryItemMobile from "./country_item/CountryItemMobile";

export default function CountryListPage({ dataChunk }) {
  const isSmallScreen = useContext(ScreenSizeContext);

  return (
    <>
      {/* ---------- HEADER ---------- */}
      <div className="item grid-header">
        <div className="item-name">País</div>
        {!isSmallScreen && (
          <>
            <div className="item-capital">Capital</div>
            <div className="item-continents">Continentes</div>
            <div className="item-population">Población</div>
            <div className="item-languages">Idiomas</div>
          </>
        )}
      </div>
      {/* ---------- LIST ENTRIES ---------- */}
      {dataChunk.map((country, i) =>
        !isSmallScreen ? (
          <CountryItem key={`country${i}`} country={country} />
        ) : (
          <CountryItemMobile key={`country${i}`} country={country} />
        )
      )}
    </>
  );
}
