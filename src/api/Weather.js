export const fetchWeather = async (city) => {
  const endpoint = `https://api.weatherapi.com/v1/current.json?key=98d10412378d474f8a2200129211808%20&q=${city}&aqi=no`;
  const data = await (await fetch(endpoint)).json();

  return data;
};

/// degress in C  data.current.temp_c
