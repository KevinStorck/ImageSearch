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
    <>
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      ></input>
      <button
        onClick={async () =>
          setSearchData(objectToIImageSearchData(await ImageSearch(input)))
        }
      >
        Sök
      </button>
    </>
  );
};
