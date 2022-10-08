import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import CountryList from "../components/country_list/CountryList";
import { continentsArray } from "../utils/continentsArray";

const axios = require("axios").default;

export default function Countries() {
  // fetch data
  const [dataLoading, setDataLoading] = useState(false);
  const [data, setData] = useState();
  // filters
  const [urlParams, setUrlParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearch] = useState("");
  const [continentsChecked, setContinentsChecked] = useState(
    new Array(continentsArray.length).fill(false)
  );
  const [filters, setFilters] = useState();

  const [filteredData, setFilteredData] = useState();

  const searchInput = useRef();

  useEffect(() => {
    setDataLoading(true);
    const fetchData = async () => {
      const res = await axios.get(
        "https://restcountries.com/v3.1/all?fields=name,currencies,capital,region,subregion,languages,flag,maps,population,continents,flags"
      );
      setData(res.data);
    };
    fetchData();
    setDataLoading(false);
  }, []);

  useEffect(() => {
    urlParams.forEach((urlParam, key) => {
      // if (key === 'search') searchInput.current.value = urlParam;
    });
    // get search param desde la url y meterlo en input
  }, [urlParams]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    // setUrlParams({'search': e.target.value});
    // if(e.target.value==='') setUrlParams();
  };

  const handleContinentCheck = (i) => {
    setContinentsChecked(
      continentsChecked.map((boolean, index) => {
        return index === i ? !boolean : boolean;
      })
    );
  };

  console.log(continentsChecked);

  return (
    <div>
      Countries
      <div>
        <form action="">
          <div>
            <input
              type="text"
              placeholder="Buscar país o capital"
              value={searchValue}
              onChange={handleSearch}
              ref={searchInput}
            />
          </div>
          <div>
            {continentsArray.map((continent, i) => (
              <div key={`continent${i}`}>
                <input
                  type="checkbox"
                  name=""
                  id={`checkbox-continent-${i}`}
                  value={continent}
                  onChange={() => handleContinentCheck(i)}
                  checked={continentsChecked[i]}
                />
                <label htmlFor={`checkbox-continent-${i}`}>{continent}</label>
              </div>
            ))}
          </div>
          <div></div>
        </form>
      </div>
      <div>
        {dataLoading ? (
          <p>Cargando datos...</p>
        ) : (
          <CountryList data={data} searchValue={searchValue} />
        )}
      </div>
      <button
        onClick={() => {
          setUrlParams(...urlParams, { page: 1 });
        }}
      >
        1
      </button>
      <button
        onClick={() => {
          setUrlParams(...urlParams, { page: 2 });
        }}
      >
        2
      </button>
    </div>
  );
}
