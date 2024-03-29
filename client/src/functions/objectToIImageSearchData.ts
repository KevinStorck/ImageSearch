import { IImageSearchData } from "../models/IImageSearchData";

export const objectToIImageSearchData = (
  object: IImageSearchData
): IImageSearchData => {
  let searchData = {
    items: object.items.map((item) => ({
      title: item.title,
      link: item.link,
      image: {
        byteSize: item.image.byteSize,
        height: item.image.height,
        width: item.image.width,
      },
    })),
    searchInformation: {
      formattedSearchTime: object.searchInformation.formattedSearchTime,
      formattedTotalResults: object.searchInformation.formattedTotalResults,
      searchTime: object.searchInformation.searchTime,
      totalResults: object.searchInformation.totalResults,
    },
    queries: {
      request: [{ searchTerms: object.queries.request[0].searchTerms }],
    },
  };

  if (object.spelling) {
    if (object.spelling.correctedQuery) {
      return {
        ...searchData,
        spelling: { correctedQuery: object.spelling.correctedQuery },
      };
    }
  }
  return searchData;
};
