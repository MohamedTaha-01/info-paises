export default function IndependentFilter({
  option,
  value,
  radioIndependentState,
  dispatchRadioIndependent,
  actionType,
}) {
  return (
    <>
      <input
        type="radio"
        name="radio-independent"
        id={`radio-independent-${option}`}
        checked={radioIndependentState}
        onChange={() => {
          dispatchRadioIndependent(actionType);
        }}
      />
      <label htmlFor={`radio-independent-${option}`}>&nbsp;{value}</label>
    </>
  );
}
