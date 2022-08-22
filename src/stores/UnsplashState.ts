import { makeAutoObservable } from 'mobx';
import { Screen } from '../components/unsplash/Navigation';
import { IPartialImage, SearchState } from '../types';

class UnsplashState {
  currentTab: Screen = Screen.Search;
  searchQuery: string = '';
  searchResults: IPartialImage[] = [];
  searchState: SearchState = SearchState.Initial;

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentTab(tab: Screen) {
    this.currentTab = tab;
  }

  setSearchQuery(query: string) {
    this.searchQuery = query;
  }

  setSearchResults(results: IPartialImage[]) {
    this.searchResults = results;
  }

  setSearchState(state: SearchState) {
    this.searchState = state;
  }

  loadSearchResults(query: string, results: IPartialImage[]) {
    this.setSearchQuery(query);
    this.setSearchResults(results);
    this.setSearchState(SearchState.Results);
  }
}

export default new UnsplashState();
