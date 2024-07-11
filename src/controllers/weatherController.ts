import axios from "axios";

const GEO_API_OPTIONS = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "4f0dcce84bmshac9e329bd55fd14p17ec6fjsnff18c2e61917",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export const getCurrentWeather = async (payload: any) => {
  const { city } = payload;

  const response = await axios.get(`${process.env.WEATHER_API_URL}/weather`, {
    params: {
      q: city,
      appid: process.env.WEATHER_API_KEY,
      lang: "en",
    },
  });

  return response.data;
};

export const getForecast = async (payload: any) => {
  const { city } = payload;

  const response = await axios.get(`${process.env.WEATHER_API_URL}/forecast`, {
    params: {
      q: city,
      appid: process.env.WEATHER_API_KEY,
      lang: "en",
    },
  });

  return response.data;
};

const getCoordinates = async (city: any) => {
  const response = await axios.get(`${process.env.GEO_API_URL}/direct`, {
    params: {
      q: city,
      limit: 1,
      appid: process.env.WEATHER_API_KEY,
      lang: "en",
    },
  });
  const data = response.data[0];

  return { lat: data.lat, lon: data.lon };
};

export const getHistoricalWeather = async (payload: any) => {
  const { city } = payload;

  const { lat, lon } = await getCoordinates(city);

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 7);
  const endDate = new Date();

  const start = startDate.toISOString().split("T")[0];
  const end = endDate.toISOString().split("T")[0];

  const response = await axios.get(
    `${process.env.WEATHERBIT_API_URL}/history/daily`,
    {
      params: {
        lat,
        lon,
        start_date: start,
        end_date: end,
        key: process.env.WEATHERBIT_API_KEY,
      },
    }
  );
  return response.data;
};

export const getCities = async (payload: any) => {
  const { city } = payload;

  const response = await axios.get(
    `${process.env.GEO_CITY_API_URL}/cities?minPopulation=10000&namePrefix=${city}`,
    {
      headers: {
        "X-RapidAPI-Key": "4f0dcce84bmshac9e329bd55fd14p17ec6fjsnff18c2e61917",
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
    }
  );

  return response.data;
};
