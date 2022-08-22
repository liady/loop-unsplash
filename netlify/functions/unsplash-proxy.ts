import axios from 'axios';

exports.handler = async function (event) {
  const url = event.rawUrl;
  const relevantUrlPart = url.split('/unsplash-proxy')[1];
  const unsplashApiUrl = `https://api.unsplash.com${relevantUrlPart}`;
  const unsplashApiUrlWithKey = addQueryParamToUrl(
    unsplashApiUrl,
    'client_id=' + process.env.UNSPLASH_API_KEY
  );
  try {
    const response = await axios.get(unsplashApiUrlWithKey);
    delete response.headers['content-length'];
    return {
      statusCode: response.status,
      headers: response.headers,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.log(error);
  }
};

function addQueryParamToUrl(url, queryParam) {
  return url + (url.indexOf('?') > -1 ? '&' : '?') + queryParam;
}
