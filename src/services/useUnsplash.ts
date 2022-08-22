import { useCallback, useState } from 'react';
import unsplashState from '../stores/UnsplashState';
import { IPartialImage, SearchState } from '../types';
import { addNewSearchToHistory } from './localStorageService';
import { searchImages } from './unsplashService';

export function useUnsplash() {
  const results = unsplashState.searchResults;
  const setResults = useCallback(
    (images: IPartialImage[]) => unsplashState.setSearchResults(images),
    []
  );
  const searchState = unsplashState.searchState;
  const setSearchState = useCallback(
    (state: SearchState) => unsplashState.setSearchState(state),
    []
  );
  const search = async (searchString: string) => {
    if (searchString) {
      setSearchState(SearchState.Searching);
      const images = await searchImages(searchString);
      setSearchState(SearchState.Results);
      setResults(images);
      if (images.length > 0) {
        addNewSearchToHistory(searchString, images);
      }
    } else {
      setSearchState(SearchState.Initial);
      setResults([]);
    }
  };
  return { results, search, searchState };
}
