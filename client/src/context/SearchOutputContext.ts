import { createContext } from "react";
import { IImageSearchData } from "../models/IImageSearchData";

export interface ISearchOutputContext {
  searchData: IImageSearchData;
  setSearchData: (searchData: IImageSearchData) => void;
}

export const SearchOutputContext = createContext<ISearchOutputContext>({
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
