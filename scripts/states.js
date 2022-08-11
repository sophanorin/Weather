let currentCity = null;
const setCity = (city) => (currentCity = city);

let currentForecast = null;
const setForecast = (forecast) => (currentForecast = forecast);

let fiveDaysForecast = null;
const setFiveDaysForecast = (forecast) => (fiveDaysForecast = forecast);

export {
  currentCity,
  setCity,
  currentForecast,
  setForecast,
  fiveDaysForecast,
  setFiveDaysForecast,
};
