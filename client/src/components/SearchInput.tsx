import axios from "axios";
import { useContext, useState } from "react";
import { IImageSearchData } from "../models/IImageSearchData";
import { SearchOutputContext } from "../context/SearchOutputContext";

export const engineID = "933eca6f7ca1d43be";
export const API_KEY = "AIzaSyBgUC7X6q9DGBItHpr38VajtRr9NNLkPFo";

export const SearchInput = () => {
  const [input, setInput] = useState("");
  const { setSearchData } = useContext(SearchOutputContext);

  const handleClick = async () => {
    let response = await axios.get<IImageSearchData>(
      `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${engineID}&searchType=image&q=${input}`
    );
    console.log({
      items: response.data.items.map((item) => ({
        link: item.link,
        image: { byteSize: item.image.byteSize },
      })),
      searchInformation: response.data.searchInformation,
      spelling: response.data.spelling,
    });

    setSearchData({
      items: response.data.items.map((item) => ({
        link: item.link,
        image: { byteSize: item.image.byteSize },
      })),
      searchInformation: response.data.searchInformation,
      spelling: response.data.spelling,
    });
    console.log(response);
    // console.log(response.data.items[0].link);
    // console.log(response.data.searchInformation.searchTime);
    // console.log(response.data.spelling?.correctedQuery);
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
