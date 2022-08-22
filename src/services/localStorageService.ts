import { IPartialImage, ISearch, ISelectedImage } from '../types';

const SEARCHES_KEY = 'searches';
const SELECTED_IMAGES_KEY = 'selectedImages';

export function addNewSearchToHistory(
  searchString: string,
  results: IPartialImage[]
) {
  const searches = getSearchesFromHistory();
  searches.push({
    searchString,
    timestamp: Date.now(),
    results,
  });
  localStorage.setItem(SEARCHES_KEY, JSON.stringify(searches));
}

export function getSearchesFromHistory(): ISearch[] {
  const searches = localStorage.getItem(SEARCHES_KEY);
  return searches ? JSON.parse(searches) : [];
}

export function addSelectedImageToHistory(image: IPartialImage) {
  const selectedImages = getSelectedImagesFromHistory();
  selectedImages.push({
    id: image.id,
    timestamp: Date.now(),
    image,
  });
  localStorage.setItem(SELECTED_IMAGES_KEY, JSON.stringify(selectedImages));
}

export function getSelectedImagesFromHistory(): ISelectedImage[] {
  const selectedImages = localStorage.getItem(SELECTED_IMAGES_KEY);
  return selectedImages ? JSON.parse(selectedImages) : [];
}

export function clearAllHistory() {
  localStorage.removeItem(SEARCHES_KEY);
  localStorage.removeItem(SELECTED_IMAGES_KEY);
}
