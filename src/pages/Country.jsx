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
              <span style={{ fontSize: 18 }}>({country.capital})</span>
            </h2>
            <hr />
            <div className="section-1">
              <img src={country.flags.svg} alt="" />
            </div>
            <div className="section-2">
              <div className="section-half">
                <div class="data-table">
                  <div class="a1">Continentes</div>
                  <div class="a2">
                    {country.continents.map((continent, i) => (
                      <span key={`continent${i}`}>{continent}</span>
                    ))}
                  </div>
                  <div class="b1">Población</div>
                  <div class="b2">{country.population}</div>
                  <div class="c1">Idiomas</div>
                  <div class="c2">
                    {Object.values(country.languages).join(", ")}
                  </div>
                  <div class="d1">Monedas</div>
                  <div class="d2">
                    {Object.values(country.currencies).map((currency, i) => (
                      <span key={`currency${i}`}>
                        {i === 0 ? `${currency.name}` : `, ${currency.name}`}
                      </span>
                    ))}
                  </div>
                  <div class="e1">Area</div>
                  <div class="e2">{country.area} km2</div>
                  <div class="f1">Lado de la conducción</div>
                  <div class="f2">{country.car.side}</div>
                </div>
              </div>
              <div className="section-half">
                <img src={country.coatOfArms.svg} alt="" />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
