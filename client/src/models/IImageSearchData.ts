export interface IImageSearchData {
  items: ResultItem[];
  searchInformation: IsearchInformation;
  spelling?: ISpelling;
}

export interface ResultItem {
  link: string;
  image: { byteSize: number };
}

export interface IsearchInformation {
  formattedSearchTime: string;
  formattedTotalResults: string;
  searchTime: number;
  totalResults: string;
}

export interface ISpelling {
  correctedQuery: string;
}
