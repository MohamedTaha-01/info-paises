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
  const [searchValue, setSearch] = useState("");
  const [continentsChecked, setContinentsChecked] = useState(continentsArray);

  const [filteredData, setFilteredData] = useState();

  const searchInput = useRef();

  useEffect(() => {
    setDataLoading(true);
    const fetchData = async () => {
      const res = await axios.get(
        "https://restcountries.com/v3.1/all?fields=name,currencies,capital,region,subregion,languages,flag,maps,population,continents,flags"
      );
      setDataLoading(false);
      setData(res.data);
    };
    fetchData();
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
      continentsChecked.map((continent, index) => {
        const boolean = index === i ? !continent.checked : continent.checked;
        return {
          name: continent.name,
          name_en: continent.name_en,
          checked: boolean,
        };
      })
    );
  };

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
                  id={`checkbox-continent-${continent.name}`}
                  value={continent.name}
                  onChange={() => handleContinentCheck(i)}
                  checked={continentsChecked[i].checked}
                />
                <label htmlFor={`checkbox-continent-${continent.name}`}>
                  {continent.name}
                </label>
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
          <CountryList
            data={data}
            searchValue={searchValue}
            continentsChecked={continentsChecked}
          />
        )}
      </div>
    </div>
  );
}
