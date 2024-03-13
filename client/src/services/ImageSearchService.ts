import axios from "axios";
import { IImageSearchData } from "../models/IImageSearchData";

const ENGINE_ID = import.meta.env.VITE_ENGINE_ID;
const API_KEY = import.meta.env.VITE_API_KEY;

export const ImageSearch = async (input: string): Promise<IImageSearchData> => {
  let response = await axios.get<IImageSearchData>(
    `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${ENGINE_ID}&searchType=image&q=${input}`
  );
  console.log(response);

  return response.data;
};
