// import axios from "axios";

// export default axios.create({
//   baseURL: "https://api.coingecko.com/api/v3",
// });

const API_KEY = process.env.REACT_APP_API_KEY;

//contex
export const CoinList = () =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`;

export const SingleCoin = (coinId) =>
  `https://api.coingecko.com/api/v3/coins/${coinId}?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`;

export const HistoricalChart = (coinId, dayAgo) =>
  `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${dayAgo}&interval=daily`;

export const CryptoNews = (coinId) =>
  `https://newsapi.org/v2/everything?q=${coinId}&sortBy=publishedAt&apiKey=${API_KEY}`;
// export const CryptoNews = (coinId) =>
//   `https://newsdata.io/api/1/news?apikey=pub_${API_KEY}&category=business&q=${coinId}`;

// export const DataCoins = (coinId) =>
//   `https://api.coingecko.com/api/v3/coins/${coinId}?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`;
