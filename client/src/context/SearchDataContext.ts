import { createContext } from "react";
import { IImageSearchData } from "../models/IImageSearchData";
// import { IAction } from "../reducers/ImageSearchReducer";

export interface ISearchOutputContext {
  searchInput: string;
  searchData: IImageSearchData;
  setSearchData: (searchData: IImageSearchData) => void;
}

export const SearchDataContext = createContext<ISearchOutputContext>({
  searchInput: "",
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
