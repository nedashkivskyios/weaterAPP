const axios = require("axios").default;

const optionsForCurrentWeather = (location: string) => ({
  method: 'GET',
  url: 'https://weatherapi-com.p.rapidapi.com/current.json',
  params: {q: location},
  headers: {
    'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
    'x-rapidapi-key': '522dd2ce9fmsh7e6b732ad88df6cp1bc1f7jsndc21235e55ec',
  },
})

export const weatherAPI = {
  getCurrentWeather(location: string) {
    return axios.request(optionsForCurrentWeather(location))
  },
}

