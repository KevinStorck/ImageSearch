export interface FavouriteImage {
  id: string;
  favourite: IImage;
}

export interface IImage {
  title: string;
  byteSize: number;
  url: string;
}
