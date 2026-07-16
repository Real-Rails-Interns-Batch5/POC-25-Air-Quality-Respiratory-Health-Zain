"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import AQITrendChart from "@/components/AQITrendChart";
import { generateAlerts } from "@/lib/alerts";
import type { AirQualityData } from "@/lib/airQuality";
import type { City } from "@/lib/cities";
import { getWeatherCodeLabel, getWindDirectionLabel, type WeatherData } from "@/lib/weather";

interface DashboardPreviewProps {
  selectedCity: City;
  airQuality: AirQualityData | null;
  weather: WeatherData | null;
  loading: boolean;
  weatherLoading: boolean;
}

interface StatisticCardProps {
  label: string;
  value: string;
  note: string;
  accentClassName?: string;
  valueClassName?: string;
  loading?: boolean;
}

function StatisticCard({
  label,
  value,
  note,
  accentClassName = "border-white/10 bg-white/5",
  valueClassName = "text-white",
  loading = false,
}: StatisticCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24 }}
      className={`rounded-xl border p-3 ${accentClassName}`}
    >
      <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{label}</p>
      {loading ? (
        <div className="mt-3 h-6 w-20 animate-pulse rounded bg-white/10" />
      ) : (
        <p className={`mt-2 text-xl font-semibold ${valueClassName}`}>{value}</p>
      )}
      <p className="mt-1 text-sm text-slate-400">{loading ? "Loading" : note}</p>
    </motion.div>
  );
}

function getAQIStatus(aqi: number | null) {
  if (aqi === null || Number.isNaN(aqi)) {
    return "Unavailable";
  }

  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy";
  if (aqi <= 200) return "Very Unhealthy";
  return "Hazardous";
}

function getAQIAccentClass(aqi: number | null) {
  if (aqi === null || Number.isNaN(aqi)) {
    return "border-white/10 bg-white/5";
  }

  if (aqi <= 50) return "border-emerald-400/30 bg-emerald-500/10";
  if (aqi <= 100) return "border-amber-400/30 bg-amber-500/10";
  if (aqi <= 150) return "border-orange-400/30 bg-orange-500/10";
  if (aqi <= 200) return "border-rose-400/30 bg-rose-500/10";
  return "border-violet-400/30 bg-violet-500/10";
}

function getAQIValueClass(aqi: number | null) {
  if (aqi === null || Number.isNaN(aqi)) {
    return "text-slate-400";
  }

  if (aqi <= 50) return "text-emerald-300";
  if (aqi <= 100) return "text-amber-300";
  if (aqi <= 150) return "text-orange-300";
  if (aqi <= 200) return "text-rose-300";
  return "text-violet-300";
}

function formatMetric(value: number | null, digits = 1) {
  if (value === null || Number.isNaN(value)) {
    return "--";
  }

  return value.toFixed(digits);
}

function formatLocalTime(value: string | null, timezone: string | null) {
  if (!value) {
    return "--";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "--";
  }

  try {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: timezone ?? undefined,
    });
  } catch {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }
}

export default function DashboardPreview({
  selectedCity,
  airQuality,
  weather,
  loading,
  weatherLoading,
}: DashboardPreviewProps) {
  const aqiStatus = getAQIStatus(airQuality?.aqi ?? null);
  const aqiAccentClass = getAQIAccentClass(airQuality?.aqi ?? null);
  const aqiValueClass = getAQIValueClass(airQuality?.aqi ?? null);

  const alerts = useMemo(
    () =>
      generateAlerts({
        aqi: airQuality?.aqi ?? null,
        pm25: airQuality?.pm25 ?? null,
        windSpeed: weather?.windSpeed ?? null,
        humidity: weather?.humidity ?? null,
        weatherCondition: getWeatherCodeLabel(weather?.weatherCode ?? null),
        minutesAgo: 0,
      }),
    [airQuality?.aqi, airQuality?.pm25, weather?.windSpeed, weather?.humidity, weather?.weatherCode]
  );

  const weatherConditionLabel = useMemo(() => getWeatherCodeLabel(weather?.weatherCode ?? null), [weather?.weatherCode]);

  const aqiLabel = useMemo(() => formatMetric(airQuality?.aqi ?? null, 0), [airQuality?.aqi]);
  const pm25Label = useMemo(() => `${formatMetric(airQuality?.pm25 ?? null)} μg/m³`, [airQuality?.pm25]);
  const pm10Label = useMemo(() => `${formatMetric(airQuality?.pm10 ?? null)} μg/m³`, [airQuality?.pm10]);
  const coLabel = useMemo(() => `${formatMetric(airQuality?.carbonMonoxide ?? null)} μg/m³`, [airQuality?.carbonMonoxide]);
  const no2Label = useMemo(() => `${formatMetric(airQuality?.nitrogenDioxide ?? null)} μg/m³`, [airQuality?.nitrogenDioxide]);
  const ozoneLabel = useMemo(() => `${formatMetric(airQuality?.ozone ?? null)} μg/m³`, [airQuality?.ozone]);
  const updatedLabel = useMemo(
    () => (loading ? "--" : formatLocalTime(airQuality?.lastUpdated ?? null, airQuality?.timezone ?? null)),
    [airQuality?.lastUpdated, airQuality?.timezone, loading]
  );

  return (
    <section id="analytics" className="rounded-[2rem] border border-slate-800 bg-slate-950 p-5 text-slate-100 shadow-2xl shadow-black/20 sm:p-7">
      <div className="flex flex-col gap-4 border-b border-slate-800 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-500">
            Air quality command center
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Respiratory Health Analytics
          </h2>
        </div>
        <div className="flex items-center gap-2 self-start rounded-full border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-300 lg:self-auto">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          Live Preview
        </div>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">AQI Trend</p>
              <p className="text-sm text-slate-400">Weekly movement across monitored districts</p>
            </div>
            <span className="rounded-full border border-emerald-800/70 bg-emerald-950/70 px-3 py-1 text-sm text-emerald-300">
              Stable
            </span>
          </div>

          <AQITrendChart city={selectedCity} />
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-white">Live Statistics</p>
              <span className="text-sm text-slate-400">{selectedCity.name}</span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <StatisticCard
                label="Current AQI"
                value={loading ? "--" : aqiLabel}
                note={loading ? "Loading" : aqiStatus}
                accentClassName={aqiAccentClass}
                valueClassName={aqiValueClass}
                loading={loading}
              />
              <StatisticCard
                label="PM2.5"
                value={loading ? "--" : pm25Label}
                note="Fine particles"
                loading={loading}
              />
              <StatisticCard
                label="PM10"
                value={loading ? "--" : pm10Label}
                note="Coarse particles"
                loading={loading}
              />
              <StatisticCard
                label="Carbon Monoxide"
                value={loading ? "--" : coLabel}
                note="CO"
                loading={loading}
              />
              <StatisticCard
                label="Nitrogen Dioxide"
                value={loading ? "--" : no2Label}
                note="NO₂"
                loading={loading}
              />
              <StatisticCard
                label="Ozone"
                value={loading ? "--" : ozoneLabel}
                note="Surface-level ozone"
                loading={loading}
              />
              <StatisticCard
                label="Last Updated"
                value={loading ? "--" : updatedLabel}
                note={loading ? "Loading" : "Local time"}
                loading={loading}
              />
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <StatisticCard
                label="Temperature"
                value={weatherLoading ? "--" : `${formatMetric(weather?.temperature ?? null, 0)}°C`}
                note={weatherLoading ? "Loading" : "Current temperature"}
                loading={weatherLoading}
              />
              <StatisticCard
                label="Humidity"
                value={weatherLoading ? "--" : `${formatMetric(weather?.humidity ?? null, 0)}%`}
                note="Relative humidity"
                loading={weatherLoading}
              />
              <StatisticCard
                label="Wind"
                value={weatherLoading ? "--" : `${formatMetric(weather?.windSpeed ?? null, 0)} km/h ${getWindDirectionLabel(weather?.windDirection ?? null)}`}
                note="Wind speed and direction"
                loading={weatherLoading}
              />
              <StatisticCard
                label="Feels Like"
                value={weatherLoading ? "--" : `${formatMetric(weather?.apparentTemperature ?? null, 0)}°C`}
                note="Apparent temperature"
                loading={weatherLoading}
              />
              <StatisticCard
                label="Pressure"
                value={weatherLoading ? "--" : `${formatMetric(weather?.pressure ?? null, 0)} hPa`}
                note="Surface pressure"
                loading={weatherLoading}
              />
              <StatisticCard
                label="Conditions"
                value={weatherLoading ? "--" : weatherConditionLabel}
                note="Weather conditions"
                loading={weatherLoading}
              />
            </div>
          </div>

</div>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-white">Environmental Alerts</p>
            <p className="text-sm text-slate-400">Dynamic guidance based on live AQI and weather conditions</p>
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-slate-800">
          {alerts.length === 0 ? (
            <div className="bg-slate-900/70 px-4 py-8 text-center text-sm text-slate-400">
              No active environmental alerts.
            </div>
          ) : (
            <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
              <thead className="bg-slate-950/70 text-slate-400">
                <tr>
                  <th className="px-4 py-3 font-medium">Severity</th>
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium">Description</th>
                  <th className="px-4 py-3 font-medium">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/70">
                {alerts.map((alert, index) => (
                  <tr key={alert.id}>
                    <td className="px-4 py-3">
                      <motion.span
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        className={`rounded-full px-2.5 py-1 text-xs ${
                          alert.severity === "High"
                            ? "bg-rose-950/70 text-rose-300"
                            : alert.severity === "Medium"
                              ? "bg-amber-950/70 text-amber-300"
                              : "bg-emerald-950/70 text-emerald-300"
                        }`}
                      >
                        {alert.severity}
                      </motion.span>
                    </td>
                    <td className="px-4 py-3 font-medium text-white">{alert.title}</td>
                    <td className="px-4 py-3 text-slate-300">{alert.description}</td>
                    <td className="px-4 py-3 text-slate-400">{alert.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}