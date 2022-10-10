import { useState, useEffect, useRef, useReducer } from "react";
import { useSearchParams } from "react-router-dom";
import CountryList from "../components/country_list/CountryList";
import FiltersForm from "../components/filters_form/FiltersForm";
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

  const radioIndependentReducer = (state, action) => {
    switch (action.type) {
      default:
      case "INDEPENDENT_CHOOSE_ALL":
        return {
          option_all: true,
          option_true: false,
          option_false: false,
        };
      case "INDEPENDENT_CHOOSE_TRUE":
        return {
          option_all: false,
          option_true: true,
          option_false: false,
        };
      case "INDEPENDENT_CHOOSE_FALSE":
        return {
          option_all: false,
          option_true: false,
          option_false: true,
        };
    }
  };
  const [radioIndependentState, dispatchRadioIndependent] = useReducer(
    radioIndependentReducer,
    {
      option_all: true,
      option_true: false,
      option_false: false,
    }
  );

  useEffect(() => {
    setDataLoading(true);
    const fetchData = async () => {
      const res = await axios.get(
        "https://restcountries.com/v3.1/all?fields=name,currencies,capital,region,subregion,languages,flag,maps,population,continents,flags,independent"
      );
      setDataLoading(false);
      setData(res.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      Countries
      <div>
        <FiltersForm
          searchValue={searchValue}
          setSearch={setSearch}
          continentsChecked={continentsChecked}
          setContinentsChecked={setContinentsChecked}
          radioIndependentState={radioIndependentState}
          dispatchRadioIndependent={dispatchRadioIndependent}
        />
      </div>
      <div>
        {dataLoading ? (
          <p>Cargando datos...</p>
        ) : (
          <CountryList
            data={data}
            searchValue={searchValue}
            continentsChecked={continentsChecked}
            radioIndependentState={radioIndependentState}
          />
        )}
      </div>
    </div>
  );
}
