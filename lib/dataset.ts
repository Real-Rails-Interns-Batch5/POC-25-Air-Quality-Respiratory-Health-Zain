import { cities as defaultCities, type City } from "@/lib/cities";
import { getWeatherCodeLabel } from "@/lib/weather";

export type DatasetTimeRange = "24h" | "7d" | "30d";

export interface DatasetRow {
  timestamp: string;
  city: string;
  latitude: number;
  longitude: number;
  aqi: number | null;
  pm25: number | null;
  pm10: number | null;
  co: number | null;
  no2: number | null;
  o3: number | null;
  temperature: number | null;
  humidity: number | null;
  windSpeed: number | null;
  pressure: number | null;
  weatherCondition: string;
  healthRisk: string;
}

export interface DatasetMetadata {
  rows: number;
  columns: number;
  sizeBytes: number;
  generationTimeMs: number;
  apiStatus: string;
  timeRange: string;
  citiesCovered: number;
}

export interface DatasetGenerationResult {
  rows: DatasetRow[];
  metadata: DatasetMetadata;
  generatedAt: string;
  csvContent: string;
  sourceApis: string[];
}

export const DATASET_COLUMNS = [
  { label: "Timestamp", key: "timestamp" },
  { label: "City", key: "city" },
  { label: "Latitude", key: "latitude" },
  { label: "Longitude", key: "longitude" },
  { label: "AQI", key: "aqi" },
  { label: "PM2_5", key: "pm25" },
  { label: "PM10", key: "pm10" },
  { label: "CO", key: "co" },
  { label: "NO2", key: "no2" },
  { label: "O3", key: "o3" },
  { label: "Temperature", key: "temperature" },
  { label: "Humidity", key: "humidity" },
  { label: "WindSpeed", key: "windSpeed" },
  { label: "Pressure", key: "pressure" },
  { label: "WeatherCondition", key: "weatherCondition" },
  { label: "HealthRisk", key: "healthRisk" },
] as const;

function getHealthRisk(aqi: number | null): string {
  if (aqi === null || Number.isNaN(aqi)) {
    return "Unknown";
  }

  if (aqi <= 50) {
    return "Good";
  }

  if (aqi <= 100) {
    return "Moderate";
  }

  if (aqi <= 150) {
    return "Unhealthy for Sensitive Groups";
  }

  if (aqi <= 200) {
    return "Unhealthy";
  }

  if (aqi <= 300) {
    return "Very Unhealthy";
  }

  return "Hazardous";
}

function buildTimeRangeLabel(range: DatasetTimeRange): string {
  switch (range) {
    case "24h":
      return "Last 24 hours";
    case "7d":
      return "Last 7 days";
    case "30d":
      return "Last 30 days";
    default:
      return "Custom range";
  }
}

function normalizeValue(value: number | null | undefined): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

async function fetchJson<T>(url: URL): Promise<T> {
  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

async function getAirQualitySeries(
  latitude: number,
  longitude: number,
  pastDays: number
): Promise<{
  hourly?: {
    time?: string[];
    us_aqi?: (number | null)[];
    pm2_5?: (number | null)[];
    pm10?: (number | null)[];
    carbon_monoxide?: (number | null)[];
    nitrogen_dioxide?: (number | null)[];
    ozone?: (number | null)[];
  };
}> {
  const url = new URL("https://air-quality-api.open-meteo.com/v1/air-quality");
  url.searchParams.set("latitude", latitude.toString());
  url.searchParams.set("longitude", longitude.toString());
  url.searchParams.set(
    "hourly",
    "us_aqi,pm2_5,pm10,carbon_monoxide,nitrogen_dioxide,ozone"
  );
  url.searchParams.set("timezone", "auto");
  url.searchParams.set("past_days", pastDays.toString());
  url.searchParams.set("forecast_days", "0");

  return fetchJson(url);
}

async function getWeatherSeries(
  latitude: number,
  longitude: number,
  pastDays: number
): Promise<{
  hourly?: {
    time?: string[];
    temperature_2m?: (number | null)[];
    relative_humidity_2m?: (number | null)[];
    wind_speed_10m?: (number | null)[];
    surface_pressure?: (number | null)[];
    weather_code?: (number | null)[];
  };
}> {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", latitude.toString());
  url.searchParams.set("longitude", longitude.toString());
  url.searchParams.set(
    "hourly",
    "temperature_2m,relative_humidity_2m,wind_speed_10m,surface_pressure,weather_code"
  );
  url.searchParams.set("timezone", "auto");
  url.searchParams.set("past_days", pastDays.toString());
  url.searchParams.set("forecast_days", "0");

  return fetchJson(url);
}

async function fetchCityDatasetRows(
  city: City,
  range: DatasetTimeRange
): Promise<DatasetRow[]> {
  const pastDays = range === "24h" ? 1 : range === "7d" ? 7 : 30;

  const [airSeries, weatherSeries] = await Promise.all([
    getAirQualitySeries(city.latitude, city.longitude, pastDays),
    getWeatherSeries(city.latitude, city.longitude, pastDays),
  ]);

  const airHourly = airSeries.hourly;
  const weatherHourly = weatherSeries.hourly;
  const length = Math.max(
    airHourly?.time?.length ?? 0,
    weatherHourly?.time?.length ?? 0
  );

  const rows: DatasetRow[] = [];

  for (let index = 0; index < length; index += 1) {
    const timestamp = airHourly?.time?.[index] ?? weatherHourly?.time?.[index] ?? new Date().toISOString();

    rows.push({
      timestamp,
      city: city.name,
      latitude: city.latitude,
      longitude: city.longitude,
      aqi: normalizeValue(airHourly?.us_aqi?.[index]),
      pm25: normalizeValue(airHourly?.pm2_5?.[index]),
      pm10: normalizeValue(airHourly?.pm10?.[index]),
      co: normalizeValue(airHourly?.carbon_monoxide?.[index]),
      no2: normalizeValue(airHourly?.nitrogen_dioxide?.[index]),
      o3: normalizeValue(airHourly?.ozone?.[index]),
      temperature: normalizeValue(weatherHourly?.temperature_2m?.[index]),
      humidity: normalizeValue(weatherHourly?.relative_humidity_2m?.[index]),
      windSpeed: normalizeValue(weatherHourly?.wind_speed_10m?.[index]),
      pressure: normalizeValue(weatherHourly?.surface_pressure?.[index]),
      weatherCondition: getWeatherCodeLabel(weatherHourly?.weather_code?.[index] ?? null),
      healthRisk: getHealthRisk(normalizeValue(airHourly?.us_aqi?.[index])),
    });
  }

  return rows;
}

export async function generateDataset(
  range: DatasetTimeRange = "7d",
  citiesToUse: City[] = defaultCities
): Promise<DatasetGenerationResult> {
  const startedAt = Date.now();
  const rows: DatasetRow[] = [];
  const failures: string[] = [];

  const results = await Promise.allSettled(citiesToUse.map((city) => fetchCityDatasetRows(city, range)));

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      rows.push(...result.value);
    } else {
      failures.push(`${citiesToUse[index]?.name ?? "Unknown city"}: ${result.reason instanceof Error ? result.reason.message : "Unknown error"}`);
    }
  });

  const csvContent = rows.map((row) => DATASET_COLUMNS.map((column) => {
    const rawValue = row[column.key];
    const value = rawValue ?? "";
    const stringValue = String(value).replace(/\r?\n/g, " ");
    return stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")
      ? `"${stringValue.replace(/"/g, '""')}"`
      : stringValue;
  }).join(",")).join("\n");

  const header = DATASET_COLUMNS.map((column) => column.label).join(",");
  const fullCsv = [header, csvContent].filter(Boolean).join("\n");
  const sizeBytes = new Blob([fullCsv], { type: "text/csv;charset=utf-8" }).size;

  const apiStatus = failures.length === 0
    ? `All ${citiesToUse.length} cities resolved successfully via live Open-Meteo APIs.`
    : failures.length === citiesToUse.length
      ? "Dataset generation hit API errors for every city."
      : `Generated ${rows.length} rows with ${failures.length} city fetch issue${failures.length > 1 ? "s" : ""}.`;

  return {
    rows,
    metadata: {
      rows: rows.length,
      columns: DATASET_COLUMNS.length,
      sizeBytes,
      generationTimeMs: Date.now() - startedAt,
      apiStatus,
      timeRange: buildTimeRangeLabel(range),
      citiesCovered: citiesToUse.length,
    },
    generatedAt: new Date().toISOString(),
    csvContent: fullCsv,
    sourceApis: ["Open-Meteo Air Quality API", "Open-Meteo Weather API"],
  };
}
