import { Link } from "react-router-dom";
import CountryItem from "./CountryItem";
import { useMediaQuery } from "react-responsive";

export default function CountryListPage({ dataChunk }) {
  const isSmallScreen = useMediaQuery({ maxWidth: 720 });

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
          <Link
            to={`/countries/${country.name.common}`}
            key={`country${i}`}
            className="page-item"
          >
            <CountryItem country={country} isSmallScreen={isSmallScreen} />
          </Link>
        ) : (
          <div key={`country${i}`} className="page-item">
            <CountryItem country={country} isSmallScreen={isSmallScreen} />
          </div>
        )
      )}
    </>
  );
}
