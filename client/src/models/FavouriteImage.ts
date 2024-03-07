export class FavouriteImage {
  constructor(public id: string, public favourite: IImage) {}
}

export interface IImage {
  title: string;
  byteSize: number;
  url: string;
}
