import { useState, useEffect, useReducer } from "react";
import CountryListWrapper from "../components/country_list/CountryListWrapper";
import FiltersForm from "../components/filters_form/FiltersForm";
import { continentsArray } from "../utils/continentsArray";

const axios = require("axios").default;

export default function Countries() {
  // fetch data
  const [dataLoading, setDataLoading] = useState(false);
  const [dataError, setDataError] = useState(false);
  const [data, setData] = useState();
  // filters
  const [searchValue, setSearch] = useState("");
  const [continentsChecked, setContinentsChecked] = useState(continentsArray);

  // Radio inputs filter (is/not independent)
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

  // fetch data
  useEffect(() => {
    setDataLoading(true);
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name,cca2,currencies,capital,region,subregion,languages,flag,maps,population,continents,flags,independent"
        );
        setDataLoading(false);
        setData(res.data);
      } catch (error) {
        setDataLoading(false);
        setDataError(true);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="info-wrapper">
        <ul>
          <li>
            A continuación encontrarás una lista de todos los territorios del
            mundo.
          </li>
          <br />
          <li>
            Haciendo click en un territorio podrás ver información sobre el.
          </li>
          <br />
          <li>Utiliza los filtros para encontrar el territorio que deseas.</li>
          <br />
          <li>
            No todos los territorios se consideran países, algunos son
            territorios independientes.
          </li>
          <br />
          <li>
            También puedes ordenar los territorios o cambiar el número de
            territorios que se muestran por página
          </li>
        </ul>
      </div>
      <div className="filter-wrapper">
        <FiltersForm
          searchValue={searchValue}
          setSearch={setSearch}
          continentsChecked={continentsChecked}
          setContinentsChecked={setContinentsChecked}
          radioIndependentState={radioIndependentState}
          dispatchRadioIndependent={dispatchRadioIndependent}
        />
      </div>
      <div className="country_list-wrapper">
        {dataLoading ? (
          <p>Cargando datos...</p>
        ) : dataError ? (
          <p>Error, no se han podido cargar los datos.</p>
        ) : (
          <CountryListWrapper
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
