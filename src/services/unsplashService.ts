import { createApi } from 'unsplash-js';
import { Basic } from 'unsplash-js/dist/methods/photos/types';
import { IPartialImage } from '../types';

// typed as `any` since there is no defined type in unsplash for their api
let unsplashApi: any;
function getApi() {
  if (!unsplashApi) {
    const apiOrigin =
      process.env.NODE_ENV === 'production'
        ? window.location.origin
        : 'http://localhost:9999';

    unsplashApi = createApi({
      apiUrl: `${apiOrigin}/.netlify/functions/unsplash-proxy`,
    });
  }
  return unsplashApi;
}

export async function searchImages(
  searchString: string
): Promise<IPartialImage[]> {
  const api = getApi();
  const results = await api.search.getPhotos({
    query: searchString,
    perPage: 9,
    page: 1,
  });
  return (results.response?.results || []).map(getPartialImage);
}

function getPartialImage(image: Basic): IPartialImage {
  return {
    id: image.id,
    urls: image.urls,
    alt_description: image.alt_description,
    user: image.user,
    description: image.description,
    links: image.links,
  };
}
