import {
  IImageSearchData,
  ISpelling,
  IsearchInformation,
  ResultItem,
} from "./IImageSearchData";

export class favourite implements IImageSearchData {
  constructor(
    public items: ResultItem[],
    public searchInformation: IsearchInformation,
    public spelling?: ISpelling | undefined
  ) {}
}
