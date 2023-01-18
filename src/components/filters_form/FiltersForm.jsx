import { continentsArray } from "../../utils/continentsArray";
import ContinentFilter from "./form_elements/ContinentFilter";
import IndependentFilter from "./form_elements/IndependentFilter";
import SearchFilter from "./form_elements/SearchFilter";

export default function FiltersForm({
  searchValue,
  setSearch,
  continentsChecked,
  setContinentsChecked,
  radioIndependentState,
  dispatchRadioIndependent,
}) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <fieldset>
        <h2>Filtros</h2>
      </fieldset>
      <fieldset className="fieldset-checkboxes">
        <div className="div-continents">
          {continentsArray.map((continent, i) => (
            <div key={`continent${i}`}>
              <ContinentFilter
                continent={continent}
                continentsChecked={continentsChecked}
                setContinentsChecked={setContinentsChecked}
                i={i}
              />
            </div>
          ))}
        </div>
        <div className="fieldset-independent">
          <div>
            <IndependentFilter
              option="all"
              value="Todos"
              radioIndependentState={radioIndependentState.option_all}
              dispatchRadioIndependent={dispatchRadioIndependent}
              actionType={{
                type: "INDEPENDENT_CHOOSE_ALL",
              }}
            />
          </div>
          <div>
            <IndependentFilter
              option="true"
              value="Solo territorios independientes (países)"
              radioIndependentState={radioIndependentState.option_true}
              dispatchRadioIndependent={dispatchRadioIndependent}
              actionType={{
                type: "INDEPENDENT_CHOOSE_TRUE",
              }}
            />
          </div>
          <div>
            <IndependentFilter
              option="false"
              value="Solo territorios no independientes (no países)"
              radioIndependentState={radioIndependentState.option_false}
              dispatchRadioIndependent={dispatchRadioIndependent}
              actionType={{
                type: "INDEPENDENT_CHOOSE_FALSE",
              }}
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="fieldset-search">
        <SearchFilter searchValue={searchValue} setSearch={setSearch} />
      </fieldset>
    </form>
  );
}
