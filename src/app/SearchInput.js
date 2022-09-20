import { useState } from "react";

const SearchInput = ({ onSearch, onClear }) => {
  const [searchText, setSearchText] = useState("");

  const onChange = (e) => setSearchText(e.target.value);

  const getSearch = () => {
    onSearch(searchText);
  };

  return (
    <div>
      <input type="text" onChange={onChange} value={searchText} />
      <button onClick={getSearch}>Search</button>
      <button type="button" onClick={onClear}>
        Clear
      </button>
    </div>
  );
};

export default SearchInput;
