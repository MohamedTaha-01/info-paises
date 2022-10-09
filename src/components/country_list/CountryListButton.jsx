export default function CountryListButton({
  currentPage,
  setCurrentPage,
  value,
}) {
  return (
    <button
      onClick={() => {
        setCurrentPage(value);
      }}
      disabled={currentPage === value ? true : false}
    >
      {value + 1}
    </button>
  );
}
