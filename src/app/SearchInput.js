import { useState } from "react";
import { Input, Button } from "@mui/material";

const SearchInput = ({ onSearch, onClear }) => {
  const [searchText, setSearchText] = useState("");

  const onChange = (e) => setSearchText(e.target.value);

  const getSearch = () => {
    onSearch(searchText);
  };

  return (
    <div>
      <Input type="text" onChange={onChange} value={searchText} />
      <Button variant="text" onClick={getSearch}>Search</Button>
      <Button  variant="text" type="button" onClick={onClear}>
        Clear
      </Button>
    </div>
  );
};

export default SearchInput;
