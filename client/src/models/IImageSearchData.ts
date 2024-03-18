export interface IImageSearchData {
  items: ResultItem[];
  searchInformation: IsearchInformation;
  queries: { request: { searchTerms: string }[] };
  spelling?: ISpelling;
}

export interface ResultItem {
  title: string;
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
