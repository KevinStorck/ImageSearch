import axios from "axios";
import { useContext, useState } from "react";
import { IImageSearchData } from "../models/IImageSearchData";
import { SearchOutputContext } from "../context/SearchOutputContext";

export const engineID = "***REMOVED***";
export const API_KEY = "***REMOVED***";

export const SearchInput = () => {
  const [input, setInput] = useState("");
  const { setSearchData } = useContext(SearchOutputContext);

  const handleClick = async () => {
    let response = await axios.get<IImageSearchData>(
      `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${engineID}&searchType=image&q=${input}`
    );

    setSearchData({
      items: response.data.items.map((item) => ({
        link: item.link,
        image: { byteSize: item.image.byteSize },
      })),
      searchInformation: response.data.searchInformation,
      spelling: response.data.spelling,
    });
  };
  return (
    <>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></input>
      <button onClick={handleClick}>Sök</button>
    </>
  );
};
