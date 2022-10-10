import { useRef } from "react";
import { continentsArray } from "../../utils/continentsArray";
import CheckboxContinent from "./form_elements/CheckboxContinent";
import RadioIndependent from "./form_elements/RadioIndependent";
import TextSearch from "./form_elements/TextSearch";

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
        <div>
          <TextSearch searchValue={searchValue} setSearch={setSearch} />
        </div>
      </fieldset>
      <fieldset>
        {continentsArray.map((continent, i) => (
          <div key={`continent${i}`}>
            <CheckboxContinent
              continent={continent}
              continentsChecked={continentsChecked}
              setContinentsChecked={setContinentsChecked}
              i={i}
            />
          </div>
        ))}
      </fieldset>
      <fieldset>
        <div>
          <RadioIndependent
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
          <RadioIndependent
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
          <RadioIndependent
            option="false"
            value="Solo territorios no independientes (no países)"
            radioIndependentState={radioIndependentState.option_false}
            dispatchRadioIndependent={dispatchRadioIndependent}
            actionType={{
              type: "INDEPENDENT_CHOOSE_FALSE",
            }}
          />
        </div>
      </fieldset>
    </form>
  );
}
