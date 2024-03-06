import { useAuth0 } from "@auth0/auth0-react";
import { SearchInput } from "./SearchInput";
import { ProfileInfo } from "./ProfileInfo";
import { SearchRender } from "./SearchRender";
import { useState } from "react";
import {
  ISearchOutputContext,
  SearchOutputContext,
} from "../context/SearchOutputContext";
import { IImageSearchData } from "../models/IImageSearchData";

export const ImageSearchApp = () => {
  const { isAuthenticated, user } = useAuth0();
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
    setSearchData: (searchOutput: IImageSearchData) => {},
  });
  searchOutput.setSearchData = (searchData: IImageSearchData) => {
    setSearchOutput({ ...searchOutput, searchData: searchOutput.searchData });
  };
  console.log(user);
  console.log(isAuthenticated);

  return (
    <>
      <SearchOutputContext.Provider value={searchOutput}>
        <ProfileInfo />
        <SearchInput />
        <SearchRender />
      </SearchOutputContext.Provider>
    </>
  );
};
