export interface WeatherData {
  temperature: number | null;
  humidity: number | null;
  windSpeed: number | null;
  windDirection: number | null;
  weatherCode: number | null;
  apparentTemperature: number | null;
  pressure: number | null;
}

function getWeatherCodeLabelInternal(code: number | null) {
  if (code === null || Number.isNaN(code)) {
    return "Unknown";
  }

  const labels: Record<number, string> = {
    0: "Clear sky",
    1: "Mostly clear",
    2: "Partly cloudy",
    3: "Cloudy",
    45: "Fog",
    48: "Rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    80: "Rain showers",
    81: "Heavy showers",
    82: "Violent showers",
    95: "Thunderstorm",
    96: "Thunderstorm with hail",
    99: "Severe hail",
  };

  return labels[code] ?? "Unknown";
}

function getWindDirectionLabelInternal(degrees: number | null) {
  if (degrees === null || Number.isNaN(degrees)) {
    return "--";
  }

  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(degrees / 45) % directions.length;
  return directions[index] ?? "--";
}

export async function getWeather(latitude: number, longitude: number): Promise<WeatherData> {
  const url = new URL("https://api.open-meteo.com/v1/forecast");

  url.searchParams.set("latitude", latitude.toString());
  url.searchParams.set("longitude", longitude.toString());
  url.searchParams.set(
    "current",
    "temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,weather_code,apparent_temperature,surface_pressure"
  );
  url.searchParams.set("timezone", "auto");

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Weather API request failed with status ${response.status}`);
  }

  const data = (await response.json()) as {
    current?: {
      temperature_2m?: number | null;
      relative_humidity_2m?: number | null;
      wind_speed_10m?: number | null;
      wind_direction_10m?: number | null;
      weather_code?: number | null;
      apparent_temperature?: number | null;
      surface_pressure?: number | null;
    };
  };

  const current = data.current;

  return {
    temperature: current?.temperature_2m ?? null,
    humidity: current?.relative_humidity_2m ?? null,
    windSpeed: current?.wind_speed_10m ?? null,
    windDirection: current?.wind_direction_10m ?? null,
    weatherCode: current?.weather_code ?? null,
    apparentTemperature: current?.apparent_temperature ?? null,
    pressure: current?.surface_pressure ?? null,
  };
}

export function getWeatherCodeLabel(code: number | null) {
  return getWeatherCodeLabelInternal(code);
}

export function getWindDirectionLabel(degrees: number | null) {
  return getWindDirectionLabelInternal(degrees);
}
