import { useCallback, useEffect, useState } from 'react';
import {
  clearAllHistory,
  getSearchesFromHistory,
  getSelectedImagesFromHistory,
} from '../../services/localStorageService';
import Button from '../design/Button';
import ListItem from '../design/ListItem';
import styles from './History.module.scss';
import { EmptyResults } from './Search';
import siteState from '../../stores/SiteState';
import unsplashState from '../../stores/UnsplashState';
import { Screen } from './Navigation';
import {
  HistoryItemType,
  ISearch,
  ISelectedImage,
  SearchState,
} from '../../types';

export function History() {
  const { history, clearHistory } = useHistory();
  const onSelectedHistoryItemClick = useCallback((item: ISelectedImage) => {
    siteState.setSelectedImage(item.image);
  }, []);
  const onSearchItemClick = useCallback((item: ISearch) => {
    unsplashState.setCurrentTab(Screen.Search);
    unsplashState.loadSearchResults(item.searchString, item.results);
  }, []);
  return (
    <div className={styles.history}>
      <div className={styles.header}>
        <label>Actions history</label>
        <Button label="Clear" active secondary onClick={clearHistory} />
      </div>
      {history.length ? (
        <ul>
          {history.map((item) =>
            'searchString' in item ? (
              <SearchHistoryItem
                key={item.timestamp}
                item={item}
                onClick={onSearchItemClick}
              />
            ) : (
              <SelectedImageHistoryItem
                key={item.timestamp}
                item={item}
                onClick={onSelectedHistoryItemClick}
              />
            )
          )}
        </ul>
      ) : (
        <EmptyResults text="No history yet" />
      )}
    </div>
  );
}

function SearchHistoryItem({
  item,
  onClick,
}: {
  item: ISearch;
  onClick: (item: ISearch) => void;
}) {
  return (
    <ListItem
      label={`Searched for`}
      entityLabel={item.searchString}
      timestamp={item.timestamp}
      images={item.results}
      onClick={() => onClick(item)}
    />
  );
}

function SelectedImageHistoryItem({
  item,
  onClick,
}: {
  item: ISelectedImage;
  onClick: (item: ISelectedImage) => void;
}) {
  return (
    <ListItem
      label={`Selected ${
        item.image.description || item.image.alt_description ? '' : 'image'
      }`}
      entityLabel={item.image.description || item.image.alt_description || ''}
      timestamp={item.timestamp}
      images={[item.image]}
      onClick={() => onClick(item)}
    />
  );
}

function useHistory() {
  const [history, setHistory] = useState<HistoryItemType[]>([]);
  useEffect(() => {
    const searchHistory = getSearchesFromHistory();
    const selectedImages = getSelectedImagesFromHistory();
    const merged = mergeAndSortByTimestamp(searchHistory, selectedImages);
    setHistory(merged);
  }, []);
  const clearHistory = useCallback(() => {
    setHistory([]);
    clearAllHistory();
  }, []);
  return { history, clearHistory };
}

function mergeAndSortByTimestamp(
  searchHistory: ISearch[],
  selectedHistory: ISelectedImage[]
): HistoryItemType[] {
  const mergedHistory = [...searchHistory, ...selectedHistory];
  return mergedHistory.sort((a, b) => b.timestamp - a.timestamp);
}
