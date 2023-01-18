export default function SearchFilter({ searchValue, setSearch }) {
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Buscar país o capital"
        value={searchValue}
        onChange={handleSearch}
      />
    </>
  );
}
