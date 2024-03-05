import axios from "axios";
import { useState } from "react";
import { IImageSearchData } from "../models/IImageSearchData";

export const engineID = "***REMOVED***";
export const API_KEY = "***REMOVED***";

export const Search = () => {
  const [input, setInput] = useState("");

  const handleClick = async () => {
    let response = await axios.get<IImageSearchData>(
      `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${engineID}&searchType=image&q=${input}`
    );
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
