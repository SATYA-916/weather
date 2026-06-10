export async function geocodeCity(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to search city.");
  const data = await response.json();
  if (!data.results || data.results.length === 0) throw new Error("City not found.");
  return data.results[0];
}

export async function getHistoricalWeather(lat, lon, dateString) {
  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${dateString}&end_date=${dateString}&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,precipitation_sum,windspeed_10m_max,weathercode&hourly=temperature_2m&timezone=auto`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch historical weather data.");
  const data = await response.json();
  if (!data.daily || !data.hourly) throw new Error("No data available for this date.");
  return data;
}

export async function getForecast(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,precipitation_sum,windspeed_10m_max,weathercode&hourly=temperature_2m&forecast_days=7&timezone=auto`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch forecast data.");
  const data = await response.json();
  if (!data.daily) throw new Error("No forecast data available.");
  return data;
}

export function getWeatherLabel(code) {
  if (code === 0) return "Clear Sky";
  if ([1, 2, 3].includes(code)) return "Mainly Clear / Partly Cloudy";
  if ([45, 48].includes(code)) return "Foggy";
  if ([51, 53, 55].includes(code)) return "Drizzle";
  if ([61, 63, 65].includes(code)) return "Rain";
  if ([71, 73, 75].includes(code)) return "Snowfall";
  if ([80, 81, 82].includes(code)) return "Rain Showers";
  if (code === 95) return "Thunderstorm";
  if ([96, 99].includes(code)) return "Thunderstorm with Hail";
  return "Unknown Condition";
}
