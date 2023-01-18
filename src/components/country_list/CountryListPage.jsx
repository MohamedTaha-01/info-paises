import { Link } from "react-router-dom";
import CountryItem from "./CountryItem";
import { useContext } from "react";
import { ScreenSizeContext } from "../../App";

export default function CountryListPage({ dataChunk }) {
  const isSmallScreen = useContext(ScreenSizeContext);

  return (
    <>
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
      {dataChunk.map((country, i) =>
        !isSmallScreen ? (
          <Link to={`/countries/${country.name.common}`} key={`country${i}`}>
            <CountryItem country={country} />
          </Link>
        ) : (
          <CountryItem key={`country${i}`} country={country} />
        )
      )}
    </>
  );
}
