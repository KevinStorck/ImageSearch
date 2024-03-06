import { useContext } from "react";
import { SearchOutputContext } from "../context/SearchOutputContext";

export const SearchRender = () => {
  const { searchData } = useContext(SearchOutputContext);
  return (
    <div>
      <h2>{searchData.searchInformation.searchTime}</h2>
      <h2>{searchData.spelling?.correctedQuery}</h2>
      {searchData.items.map((item) => (
        <p></p>
      ))}
    </div>
  );
};
