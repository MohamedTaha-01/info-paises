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
    <div>
      {dataLoading ? (
        <p>Cargando datos...</p>
      ) : (
        data &&
        data.map((country, i) => (
          <p key={i}>
            {country.name.common}&nbsp;
            {country.capital}&nbsp;
            {country.population}&nbsp;
            {country.region}&nbsp;
            {JSON.stringify(country)}
          </p>
        ))
      )}
    </div>
  );
}
