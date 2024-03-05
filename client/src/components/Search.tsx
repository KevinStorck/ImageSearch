import axios from "axios";
import { useState } from "react";
import { IImageSearchData } from "../models/IImageSearchData";

export const engineID = "933eca6f7ca1d43be";
export const API_KEY = "AIzaSyBgUC7X6q9DGBItHpr38VajtRr9NNLkPFo";

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
