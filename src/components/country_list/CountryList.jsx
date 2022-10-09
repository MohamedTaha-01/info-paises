import { useEffect, useState } from "react";
import CountryListButton from "./CountryListButton";
import CountryListPage from "./CountryListPage";

export default function CountryList({
  data,
  searchValue,
  continentsChecked,
  onlyCountries,
  onlyTerritories,
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    setCurrentPage(0);
  }, [data, searchValue, continentsChecked, onlyCountries, onlyTerritories]);

  if (data === undefined) return false;
  // let filtro = data.filter((country) => {
  //   return country.capital.length > 0;
  // });
  // console.log(
  //   filtro.filter((country) => {
  //     return country.capital[0].toLowerCase().includes(searchValue.toLowerCase());
  //   })

  if (searchValue !== "") {
    data = data.filter((country) => {
      return (
        country.name.common.toLowerCase().includes(searchValue.toLowerCase()) ||
        country.capital.includes(searchValue.toLowerCase())
      );
    });
  }

  const selectedContinents = continentsChecked
    .filter((o) => {
      return o.checked ? o.name : "";
    })
    .map((o) => {
      return o.name_en;
    });

  selectedContinents.forEach((continent) => {
    data = data.filter((country) => {
      return country.continents.includes(continent);
    });
  });

  if (onlyCountries) {
    data = data.filter((country) => {
      return country.independent === true;
    });
  }

  if (onlyTerritories) {
    data = data.filter((country) => {
      return country.independent === false;
    });
  }

  let slicedData = [];
  for (let i = 0; i < data.length; i += pageSize) {
    const dataChunk = data.slice(i, i + pageSize);
    slicedData.push(dataChunk);
  }

  function calcItemsFrom() {
    let aux = 0;
    for (let j = 0; j < currentPage; j++) {
      aux = slicedData[j].length + aux;
    }
    return aux + 1;
  }

  function calcItemsTo() {
    let aux = 0;
    for (let j = 0; j < currentPage; j++) {
      aux = slicedData[j].length + aux;
    }
    return aux + slicedData[currentPage].length;
  }

  return (
    <>
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
                <p>{`Resultados del ${calcItemsFrom()} al ${calcItemsTo()} de un total de ${
                  data.length
                } resultados`}</p>
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
