// FYI polygon's free plan only allow to make 5 api calls in a minutes
import axios from "axios";
import { TickerDummyResponse, AggregatesDummyResponse } from "./polygon_dummy_data";
// Leaving api key here to make testing on other systems easy, If I had more time I'll put this in env vars
const apiKey = 'sRYTWxKQVLO1DH7TNiMmt3lra4EMnbcf';
const baseUrl = 'https://api.polygon.io';

export function Aggregates(ticker) {
  const date = new Date();
  const formattedDate = date.toISOString().split('T')[0];
  const sevenDaysAgo = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const url = `${baseUrl}/v2/aggs/ticker/${ticker}/range/1/day/${sevenDaysAgo}/${formattedDate}?adjusted=true&sort=asc&apiKey=${apiKey}`

  return getData(url, AggregatesDummyResponse);
}

export function Ticker(ticker) {
  const formattedDate = new Date().toISOString().split('T')[0];
  const url = `${baseUrl}/v3/reference/tickers/${ticker}?date=${formattedDate}&apiKey=${apiKey}`

  return getData(url, TickerDummyResponse);
}

function getData(url, dummyResponse) {
  const cachedResponse = localStorage.getItem(url.replace(`apiKey=${apiKey}`, ''))

  if(cachedResponse && cachedResponse.length > 0) {
    return Promise.resolve(JSON.parse(cachedResponse))
  }

  return (
    axios.get(url)
    .then((response) => {
      const results = response?.data?.results;
      if(response.status == 200 && results){
        const key = response.request.responseURL.replace(`apiKey=${apiKey}`, '')
        localStorage.setItem(key, JSON.stringify(results))
      }
      return results;
    })
    .catch((error) => {
      if (error.response.status === 429){
        // using a dummy response in case request limit exceeds in trail version
        return dummyResponse.results;
      } else if (error.response.status === 404){
        return 'Not Found';
      } else {
        console.error(error);
      }
    }))
}
