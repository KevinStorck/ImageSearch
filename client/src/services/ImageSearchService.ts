import axios from "axios";
import { IImageSearchData } from "../models/IImageSearchData";

const API_KEY = import.meta.env.VITE_API_KEY;

export const ImageSearch = async (input: string): Promise<IImageSearchData> => {
  let response = await axios.get<IImageSearchData>(
    `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=***REMOVED***&searchType=image&q=${input}`
  );

  return response.data;
};
