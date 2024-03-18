import { SearchInput } from "./SearchInput";
import { SearchRender } from "./SearchRender";
import { useState } from "react";
import {
  ISearchOutputContext,
  SearchDataContext,
} from "../context/SearchDataContext";
import { IImageSearchData } from "../models/IImageSearchData";
import { useAuth0 } from "@auth0/auth0-react";

export const ImageSearchApp = () => {
  const [input, setInput] = useState("");
  const { isAuthenticated } = useAuth0();
  const [searchOutput, setSearchOutput] = useState<ISearchOutputContext>({
    searchData: {
      items: [],
      searchInformation: {
        formattedSearchTime: "",
        formattedTotalResults: "",
        searchTime: 0,
        totalResults: "",
      },
      queries: { request: [{ searchTerms: "" }] },
    },
    setSearchData: () => {},
  });
  searchOutput.setSearchData = (searchData: IImageSearchData) => {
    setSearchOutput({ ...searchOutput, searchData: searchData });
  };

  return (
    <>
      <SearchDataContext.Provider value={searchOutput}>
        {!isAuthenticated ? null : (
          <>
            <SearchInput input={input} setInput={setInput} />
            <SearchRender setInput={setInput} />
          </>
        )}
      </SearchDataContext.Provider>
    </>
  );
};
