import { useCallback } from 'react';
import TextBox from '../design/TextBox';
import styles from './Search.module.scss';
import Button from '../design/Button';
import { useUnsplash } from '../../services/useUnsplash';
import Image from '../design/Image';
import siteState from '../../stores/SiteState';
import { observer } from 'mobx-react-lite';
import { addSelectedImageToHistory } from '../../services/localStorageService';
import { IPartialImage, SearchState } from '../../types';
import unsplashState from '../../stores/UnsplashState';

export default observer(function Search() {
  const { results, search, searchState } = useUnsplash();
  return (
    <div className={styles.main}>
      <div className={styles.searchArea}>
        <TextBox
          placeholder="Search Unsplash"
          onChange={(query) => unsplashState.setSearchQuery(query)}
          onSearch={search}
          value={unsplashState.searchQuery}
        />
        <Button
          label="Search"
          onClick={() => search(unsplashState.searchQuery)}
          active={!!unsplashState.searchQuery?.length}
        />
      </div>
      <Results results={results} searchState={searchState} />
    </div>
  );
});

const Results = observer(function Results({
  results,
  searchState,
}: {
  results: IPartialImage[];
  searchState: SearchState;
}) {
  const onImageSelect = useCallback((image: IPartialImage | null) => {
    siteState.setSelectedImage(image);
    if (image) {
      addSelectedImageToHistory(image);
    }
  }, []);
  if (searchState === SearchState.Searching) {
    return <EmptyResults text="Searching..." />;
  } else if (searchState === SearchState.Results) {
    return results.length ? (
      <div className={styles.results}>
        {results.map((result) => (
          <Image
            key={result.id}
            image={result}
            onClick={onImageSelect}
            selected={siteState.selectedImage?.id === result.id}
          />
        ))}
      </div>
    ) : (
      <EmptyResults text="No results found" />
    );
  } else {
    return <EmptyResults text="Search for an image to get started" />;
  }
});

export function EmptyResults({ text }: { text: string }) {
  return <div className={styles.emptyResults}>{text}</div>;
}
