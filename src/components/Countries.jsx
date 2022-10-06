import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import CountryList from "./country_list/CountryList";

const axios = require("axios").default;

export default function Countries() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState();
  const [dataLoading, setDataLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    setDataLoading(true);
    const fetchData = async () => {
      const res = await axios.get(
        "https://restcountries.com/v3.1/all?fields=name,currencies,capital,region,subregion,languages,flag,maps,population,continents,flags"
      );
      console.log(res.data);
      setData(res.data);
      setDataLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      Countries
      <div>
        <form action="">
          <div>
            <input type="text" />
          </div>
          <div>
            <input type="checkbox" name="" id="" />África
            <input type="checkbox" name="" id="" />América
            <input type="checkbox" name="" id="" />Antártida
            <input type="checkbox" name="" id="" />Asia
            <input type="checkbox" name="" id="" />Europa
            <input type="checkbox" name="" id="" />Oceanía
          </div>
          <div>
            
          </div>
        </form>
      </div>
      <div>
        {dataLoading ? <p>Cargando datos...</p> : <CountryList data={data} />}
      </div>
      <button
        onClick={() => {
          setSearchParams(...searchParams, { page: 1 });
        }}
      >
        1
      </button>
      <button
        onClick={() => {
          setSearchParams(...searchParams, { page: 2 });
        }}
      >
        2
      </button>
    </div>
  );
}
