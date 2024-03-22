import axios from "axios";
import { IImageSearchData } from "../models/IImageSearchData";

const API_KEY = import.meta.env.VITE_API_KEY;

export const ImageSearch = async (input: string): Promise<IImageSearchData> => {
  let response = await axios.get<IImageSearchData>(
    `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=933eca6f7ca1d43be&searchType=image&q=${input}`
  );

  return response.data;
};
