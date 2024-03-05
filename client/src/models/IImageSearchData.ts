export interface IImageSearchData {
  items: ResultItem[];
  searchInformation: IsearchInformation;
  spelling?: ISpelling;
}

interface ResultItem {
  link: string;
  image: { byteSize: number };
}

interface IsearchInformation {
  formattedSearchTime: string;
  formattedTotalResults: string;
  searchTime: number;
  totalResults: string;
}

interface ISpelling {
  correctedQuery: string;
}
