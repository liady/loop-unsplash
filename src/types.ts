import { Basic } from 'unsplash-js/dist/methods/photos/types';

export type IPartialImage = Pick<
  Basic,
  'id' | 'urls' | 'alt_description' | 'user' | 'description'
>;

export enum SearchState {
  Initial,
  Searching,
  Results,
}

export interface ISelectedImage {
  id: string;
  timestamp: number;
  image: IPartialImage;
}

export interface ISearch {
  searchString: string;
  timestamp: number;
  results: IPartialImage[];
}

export type HistoryItemType = ISearch | ISelectedImage;
