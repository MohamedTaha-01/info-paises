import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const axios = require("axios").default;

export default function Country() {
  const [data, setData] = useState();
  const params = useParams();

  useEffect(() => {
    // setDataLoading(true);
    const fetchData = async () => {
      const res = await axios.get(
        `https://restcountries.com/v3.1/name/${params.id}`
      );
      console.log(res.data);
      setData(res.data);
      //   setDataLoading(false);
    };

    fetchData();
  }, [params.id]);

  return (
    <div>
      {data &&
        data.map((country, i) => (
          <p key={i}>
            {country.name.common}&nbsp;
            {country.capital}&nbsp;
            {country.population}&nbsp;
            {country.region}&nbsp;
            {JSON.stringify(country)}
          </p>
        ))}
    </div>
  );
}
