import { SearchInput } from "./SearchInput";
import { SearchRender } from "./SearchRender";
import { useState } from "react";
import {
  ISearchOutputContext,
  SearchDataContext,
} from "../context/SearchDataContext";
import { IImageSearchData } from "../models/IImageSearchData";

export const ImageSearchApp = () => {
  const [input, setInput] = useState("");
  const [searchOutput, setSearchOutput] = useState<ISearchOutputContext>({
    searchData: {
      items: [],
      searchInformation: {
        formattedSearchTime: "",
        formattedTotalResults: "",
        searchTime: 0,
        totalResults: "",
      },
      queries: { request: { searchTerms: "" } },
    },
    setSearchData: () => {},
  });
  searchOutput.setSearchData = (searchData: IImageSearchData) => {
    setSearchOutput({ ...searchOutput, searchData: searchData });
  };

  return (
    <>
      <SearchDataContext.Provider value={searchOutput}>
        <SearchInput input={input} setInput={setInput} />
        <SearchRender setInput={setInput} />
      </SearchDataContext.Provider>
    </>
  );
};
