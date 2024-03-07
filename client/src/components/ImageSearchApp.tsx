import { SearchInput } from "./SearchInput";
import { SearchRender } from "./SearchRender";
import { useState } from "react";
import {
  ISearchOutputContext,
  SearchOutputContext,
} from "../context/SearchOutputContext";
import { IImageSearchData } from "../models/IImageSearchData";

export const ImageSearchApp = () => {
  const [searchOutput, setSearchOutput] = useState<ISearchOutputContext>({
    searchData: {
      items: [],
      searchInformation: {
        formattedSearchTime: "",
        formattedTotalResults: "",
        searchTime: 0,
        totalResults: "",
      },
    },
    setSearchData: () => {},
  });
  searchOutput.setSearchData = (searchData: IImageSearchData) => {
    setSearchOutput({ ...searchOutput, searchData: searchData });
  };

  return (
    <>
      <SearchOutputContext.Provider value={searchOutput}>
        <SearchInput />
        <SearchRender />
      </SearchOutputContext.Provider>
    </>
  );
};
