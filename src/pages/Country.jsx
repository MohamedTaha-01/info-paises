import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const axios = require("axios").default;

export default function Country() {
  const [dataLoading, setDataLoading] = useState(false);
  const [data, setData] = useState();
  const params = useParams();

  useEffect(() => {
    setDataLoading(true);
    const fetchData = async () => {
      const res = await axios.get(
        `https://restcountries.com/v3.1/name/${params.id}`
      );
      setDataLoading(false);
      setData(res.data);
    };

    fetchData();
  }, [params.id]);

  return (
    <div className="page-wrapper">
      {dataLoading ? (
        <p>Cargando datos...</p>
      ) : (
        data &&
        data.map((country, i) => (
          <div key={i} className="country-container">
            <h2>
              {country.name.common}&nbsp;
              {country.capital && (
                <span style={{ fontSize: 18 }}>({country.capital})</span>
              )}
            </h2>
            <hr />
            <div className="section-1">
              <img src={country.flags.svg} alt="" />
            </div>
            <div className="section-2">
              <div className="section-half">
                <div className="data-table">
                  <div className="a1">Continentes</div>
                  <div className="a2">
                    {country.continents.map((continent, i) => (
                      <span key={`continent${i}`}>{continent}</span>
                    ))}
                  </div>
                  <div className="b1">Área</div>
                  <div className="b2">{country.area} km2</div>
                  <div className="c1">Población</div>
                  <div className="c2">{country.population}</div>
                  <div className="d1">Monedas</div>
                  <div className="d2">
                    {country.currencies &&
                      Object.values(country.currencies).map((currency, i) => (
                        <span key={`currency${i}`}>
                          {i === 0 ? `${currency.name}` : `, ${currency.name}`}
                        </span>
                      ))}
                  </div>
                  <div className="e1">Idiomas</div>
                  <div className="e2">
                    {country.languages &&
                      Object.values(country.languages).join(", ")}
                  </div>
                  <div className="f1">Lado de la conducción</div>
                  <div className="f2">{country.car.side}</div>
                </div>
              </div>
              {country.coatOfArms.svg && (
                <div className="section-half">
                  <img src={country.coatOfArms.svg} alt="" />
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
