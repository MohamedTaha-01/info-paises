import { useContext, useEffect, useState } from "react";
import CountryListButton from "./CountryListButton";
import {
  calcItemsFrom_Number,
  calcItemsTo_Number,
} from "../../utils/calcItemsNumber";
import CountryItem from "./CountryItem";
import { ScreenSizeContext } from "../../App";
import { Link } from "react-router-dom";

export default function CountryListWrapper({
  data,
  searchValue,
  continentsChecked,
  radioIndependentState,
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sorting, setSorting] = useState("by_nameAsc");

  const isSmallScreen = useContext(ScreenSizeContext);

  useEffect(() => {
    setCurrentPage(0);
  }, [data, searchValue, continentsChecked, radioIndependentState, pageSize]);

  if (data === undefined) return false;
  let filteredData,
    filteredDataAux = [];

  switch (sorting) {
    case "by_nameAsc":
      data.sort((a, b) => (a.name.common > b.name.common ? 1 : -1));
      break;
    case "by_nameDesc":
      data.sort((a, b) => (a.name.common > b.name.common ? -1 : 1));
      break;
    case "by_capitalAsc":
      data.sort((a, b) => (a.capital > b.capital ? 1 : -1));
      break;
    case "by_capitalDesc":
      data.sort((a, b) => (a.capital > b.capital ? -1 : 1));
      break;
    case "by_populationAsc":
      data.sort((a, b) => (a.population > b.population ? 1 : -1));
      break;
    case "by_populationDesc":
      data.sort((a, b) => (a.population > b.population ? -1 : 1));
      break;
    default:
      data.sort((a, b) => (a.name.common > b.name.common ? 1 : -1));
      break;
  }

  filteredData = searchValue
    ? data.filter((country) => {
        return country.name.common
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      })
    : data;

  let capitalsFilter = data.filter((country) => {
    return country.capital.length > 0;
  });
  filteredDataAux = searchValue
    ? capitalsFilter.filter((country) => {
        return country.capital[0]
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      })
    : [];

  let activeCountries = new Set(
    filteredData.map((continent) => {
      return continent.name.common;
    })
  );
  filteredData = [
    ...filteredData,
    ...filteredDataAux.filter((country) => {
      return !activeCountries.has(country.name.common);
    }),
  ];

  // filter by continent
  const selectedContinents = continentsChecked
    .filter((continent) => {
      return continent.checked ? continent.name : "";
    })
    .map((continent) => {
      return continent.name_en;
    });

  filteredData = filteredData.filter((country) => {
    return selectedContinents.includes(...country.continents);
  });

  // filter by independent
  filteredData = radioIndependentState.option_true
    ? filteredData.filter((country) => {
        return country.independent === true;
      })
    : filteredData;

  filteredData = radioIndependentState.option_false
    ? filteredData.filter((country) => {
        return country.independent === false;
      })
    : filteredData;

  let slicedData = [];
  for (let i = 0; i < filteredData.length; i += pageSize) {
    const dataChunk = filteredData.slice(i, i + pageSize);
    slicedData.push(dataChunk);
  }

  return (
    <>
      <div className="page_options-wrapper">
        <fieldset className="page_options-order_by p-20">
          <label htmlFor="select-order_by">Ordenar por: </label>
          <select
            name=""
            id="select-order_by"
            onChange={(e) => {
              setSorting(e.target.value);
            }}
          >
            <option value="by_nameAsc">&nbsp;Nombre (Asc)</option>
            <option value="by_nameDesc">&nbsp;Nombre (Desc)</option>
            <option value="by_capitalAsc">&nbsp;Capital (Asc)</option>
            <option value="by_capitalDesc">&nbsp;Capital (Desc)</option>
            <option value="by_populationAsc">&nbsp;Población (Asc)</option>
            <option value="by_populationDesc">&nbsp;Población (Desc)</option>
          </select>
        </fieldset>
        <fieldset className="page_options-number pb-20">
          <div className="page_options-number_items">
            <p>Número de entradas por página</p>
            <div>
              <button
                className="numbered-button"
                onClick={() => {
                  setPageSize(10);
                }}
                disabled={pageSize === 10 ? true : false}
              >
                10
              </button>
              <button
                className="numbered-button"
                onClick={() => {
                  setPageSize(25);
                }}
                disabled={pageSize === 25 ? true : false}
              >
                25
              </button>
              <button
                className="numbered-button"
                onClick={() => {
                  setPageSize(50);
                }}
                disabled={pageSize === 50 ? true : false}
              >
                50
              </button>
            </div>
          </div>
          <div className="page_options-number_page">
            <p>Página</p>
            <div>
              {data &&
                slicedData.map((dataChunk, sliceIndex) => (
                  <CountryListButton
                    key={`buttonPage${sliceIndex}`}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    value={sliceIndex}
                  />
                ))}
            </div>
          </div>
        </fieldset>
      </div>
      {data &&
        slicedData.map((dataChunk, sliceIndex) =>
          sliceIndex === currentPage ? (
            // ----------------------- START DATA -----------------------
            <div key={`CountryListPage${sliceIndex}`} className="data-wrapper">
              <div className="data-item-number">
                <p>{`Mostrando resultados del ${calcItemsFrom_Number(
                  slicedData,
                  currentPage
                )} al ${calcItemsTo_Number(
                  slicedData,
                  currentPage
                )} de un total de ${filteredData.length} resultados`}</p>
                <br />
              </div>

              {!isSmallScreen ? (
                /* DESKTOP */
                <>
                  {/* START HEADER */}
                  <div className="data-grid">
                    <div className="c0 grid-header"></div>
                    <div className="c1 grid-header">País</div>
                    <div className="c2 grid-header">Capital</div>
                    <div className="c3 grid-header">Continentes</div>
                    <div className="c4 grid-header">Población</div>
                    <div className="c5 grid-header">Idiomas</div>
                  </div>
                  {/* END HEADER */}
                  {/* START COUNTRIES LIST */}
                  {dataChunk.map((country, i) => (
                    <CountryItem country={country} key={`country${i}`} />
                  ))}
                  {/* END COUNTRIES LIST */}
                </>
              ) : (
                /* MOBILE */
                dataChunk.map((country, i) => (
                  <Link
                    className="data-gridm"
                    to={`/countries/${country.name.common}`}
                    key={`country${i}`}
                  >
                    <div className="c1m">{country.flag}</div>
                    <div className="c2m">{country.name.common}</div>
                  </Link>
                ))
              )}
            </div>
          ) : (
            // ----------------------- END DATA -----------------------
            ""
          )
        )}
    </>
  );
}
