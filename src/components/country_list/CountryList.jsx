import { useEffect, useReducer, useState } from "react";
import CountryListButton from "./CountryListButton";
import CountryListPage from "./CountryListPage";
import {
  calcItemsFrom_Number,
  calcItemsTo_Number,
} from "../../utils/calcItemsNumber";

export default function CountryList({
  data,
  searchValue,
  continentsChecked,
  radioIndependentState,
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sorting, setSorting] = useState("");

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
    case "none":
      break;
    default:
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

  const selectedContinents = continentsChecked
    .filter((continent) => {
      return continent.checked ? continent.name : "";
    })
    .map((continent) => {
      return continent.name_en;
    });

  selectedContinents.forEach((continent) => {
    filteredData = filteredData.filter((country) => {
      return country.continents.includes(continent);
    });
  });

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
      <div>
        <label htmlFor="select-order_by">Ordenar por: </label>
        <select
          name=""
          id="select-order_by"
          onChange={(e) => {
            setSorting(e.target.value);
          }}
        >
          <option value="none">Por defecto</option>
          <option value="by_nameAsc">Nombre (Asc)</option>
          <option value="by_nameDesc">Nombre (Desc)</option>
          <option value="by_capitalAsc">Capital (Asc)</option>
          <option value="by_capitalDesc">Capital (Desc)</option>
          <option value="by_populationAsc">Población (Asc)</option>
          <option value="by_populationDesc">Población (Desc)</option>
        </select>
      </div>
      <div>
        <div>Número de entradas por página</div>
        <div>
          <button
            onClick={() => {
              setPageSize(10);
            }}
            disabled={pageSize === 10 ? true : false}
          >
            10
          </button>
          <button
            onClick={() => {
              setPageSize(25);
            }}
            disabled={pageSize === 25 ? true : false}
          >
            25
          </button>
          <button
            onClick={() => {
              setPageSize(50);
            }}
            disabled={pageSize === 50 ? true : false}
          >
            50
          </button>
          <p>{`Mostrando ${pageSize} resultados por página`}</p>
        </div>
      </div>
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
      {data &&
        slicedData.map((dataChunk, sliceIndex) =>
          sliceIndex === currentPage ? (
            <div key={`CountryListPage${sliceIndex}`}>
              <div>
                <p>{`Resultados del ${calcItemsFrom_Number(
                  slicedData,
                  currentPage
                )} al ${calcItemsTo_Number(
                  slicedData,
                  currentPage
                )} de un total de ${filteredData.length} resultados`}</p>
              </div>
              <div>
                <CountryListPage dataChunk={dataChunk} />
              </div>
            </div>
          ) : (
            ""
          )
        )}
    </>
  );
}
