import { useContext } from "react";
import { SearchDataContext } from "../context/SearchDataContext";
import { ImageSearch } from "../services/ImageSearchService";
import { objectToIImageSearchData } from "../functions/objectToIImageSearchData";

interface ISearchInputProps {
  input: string;
  setInput: (input: string) => void;
}

export const SearchInput = ({ input, setInput }: ISearchInputProps) => {
  const { setSearchData } = useContext(SearchDataContext);

  return (
    <div id="searchBar">
      <input
        id="searchInputField"
        type="text"
        value={input}
        placeholder="Sökterm"
        onChange={(e) => {
          setInput(e.target.value);
        }}
      ></input>
      <span
        id="searchIcon"
        className="material-symbols-outlined"
        onClick={async () =>
          setSearchData(objectToIImageSearchData(await ImageSearch(input)))
        }
      >
        search
      </span>
    </div>
  );
};
