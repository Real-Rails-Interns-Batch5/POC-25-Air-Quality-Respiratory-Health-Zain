"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  Cloud,
  Droplets,
  Gauge,
  Sparkles,
  Wind,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { getAirQuality, type AirQualityData } from "@/lib/airQuality";
import { cities, type City } from "@/lib/cities";

type AQICategory = "good" | "moderate" | "unhealthy" | "very-unhealthy" | "hazardous";
type RiskLevel = "Low" | "Moderate" | "High";
type PollutantKey = "pm25" | "pm10" | "carbonMonoxide" | "nitrogenDioxide" | "ozone";

function formatMetric(value: number | null, unit?: string) {
  if (value === null || Number.isNaN(value)) {
    return "Data unavailable";
  }

  if (unit) {
    return `${value.toFixed(1)} ${unit}`;
  }

  return Math.round(value).toString();
}

function getAQICategory(aqi: number | null): AQICategory {
  if (aqi === null) return "moderate";
  if (aqi <= 50) return "good";
  if (aqi <= 100) return "moderate";
  if (aqi <= 150) return "unhealthy";
  if (aqi <= 200) return "very-unhealthy";
  return "hazardous";
}

function getAQIStatus(aqi: number | null) {
  return {
    good: "Good",
    moderate: "Moderate",
    unhealthy: "Unhealthy",
    "very-unhealthy": "Very Unhealthy",
    hazardous: "Hazardous",
  }[getAQICategory(aqi)];
}

function getAQIColorClasses(aqi: number | null) {
  const category = getAQICategory(aqi);
  const palette = {
    good: "text-emerald-300 border-emerald-400/30 bg-emerald-500/10",
    moderate: "text-amber-300 border-amber-400/30 bg-amber-500/10",
    unhealthy: "text-orange-300 border-orange-400/30 bg-orange-500/10",
    "very-unhealthy": "text-rose-300 border-rose-400/30 bg-rose-500/10",
    hazardous: "text-violet-300 border-violet-400/30 bg-violet-500/10",
  } as const;

  return palette[category];
}

function getAQIValueClasses(aqi: number | null) {
  const category = getAQICategory(aqi);
  const palette = {
    good: "text-emerald-300",
    moderate: "text-amber-300",
    unhealthy: "text-orange-300",
    "very-unhealthy": "text-rose-300",
    hazardous: "text-violet-300",
  } as const;

  return palette[category];
}

function getRespiratoryRisk(aqi: number | null): { label: RiskLevel; classes: string } {
  if (aqi === null) {
    return { label: "Moderate", classes: "text-amber-300 border-amber-400/30 bg-amber-500/10" };
  }

  if (aqi > 100) {
    return { label: "High", classes: "text-rose-300 border-rose-400/30 bg-rose-500/10" };
  }

  if (aqi > 50) {
    return { label: "Moderate", classes: "text-amber-300 border-amber-400/30 bg-amber-500/10" };
  }

  return { label: "Low", classes: "text-emerald-300 border-emerald-400/30 bg-emerald-500/10" };
}

function getPollutantSeverityStyles(key: PollutantKey, value: number | null) {
  const base = "border-white/10 bg-white/5 hover:border-sky-400/40";
  if (value === null || Number.isNaN(value)) {
    return { border: "border-white/10", text: "text-slate-400", bg: base };
  }

  const standard = {
    pm25: [12, 35, 55],
    pm10: [20, 50, 100],
    ozone: [100, 160, 240],
    carbonMonoxide: [1000, 2000, 4000],
    nitrogenDioxide: [40, 100, 200],
  }[key];

  if (value <= standard[0]) {
    return { border: "border-emerald-400/30", text: "text-emerald-300", bg: "border-emerald-400/30 bg-emerald-500/10" };
  }

  if (value <= standard[1]) {
    return { border: "border-amber-400/30", text: "text-amber-300", bg: "border-amber-400/30 bg-amber-500/10" };
  }

  if (value <= standard[2]) {
    return { border: "border-orange-400/30", text: "text-orange-300", bg: "border-orange-400/30 bg-orange-500/10" };
  }

  return { border: "border-rose-400/30", text: "text-rose-300", bg: "border-rose-400/30 bg-rose-500/10" };
}

function formatRelativeTimestamp(value: string | null) {
  if (!value) return "Awaiting update";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  const deltaMs = Date.now() - date.getTime();
  if (deltaMs < 60_000) {
    return "Updated just now";
  }

  const minutes = Math.floor(deltaMs / 60_000);
  if (minutes < 60) {
    return `Updated ${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `Updated ${hours}h ago`;
  }

  return `Updated ${Math.floor(hours / 24)}d ago`;
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="h-3 w-16 rounded bg-white/10" />
      <div className="mt-3 h-6 w-20 rounded bg-white/10" />
      <div className="mt-2 h-3 w-24 rounded bg-white/10" />
    </div>
  );
}

interface LiveAQICardProps {
  selectedCity: City;
  onCityChange: (city: City) => void;
}

export default function LiveAQICard({ selectedCity, onCityChange }: LiveAQICardProps) {
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshData = useCallback(async (city = selectedCity) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getAirQuality(city.latitude, city.longitude);
      setAirQuality(data);
    } catch {
      setError("Unable to refresh data. Showing previous values.");
    } finally {
      setLoading(false);
    }
  }, [selectedCity]);

  useEffect(() => {
    void refreshData(selectedCity);
  }, [refreshData, selectedCity]);

  const aqiBadgeClasses = getAQIColorClasses(airQuality?.aqi ?? null);
  const aqiValueClasses = getAQIValueClasses(airQuality?.aqi ?? null);
  const respiratoryRisk = getRespiratoryRisk(airQuality?.aqi ?? null);

  return (
    <div className="flex w-full flex-col gap-3">
      <label className="text-sm font-medium text-slate-200">
        <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">
          Live Air Quality Location
        </span>
        <select
          value={selectedCity.id}
          onChange={(event) => {
            const city = cities.find((item) => item.id === event.target.value);
            if (city) {
              onCityChange(city);
            }
          }}
          disabled={loading}
          className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-4 py-3 text-sm text-white shadow-sm backdrop-blur-xl outline-none transition hover:border-sky-400/40 focus:border-sky-400/60 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {cities.map((city) => (
            <option key={city.id} value={city.id} className="bg-slate-900 text-white">
              {city.name}, {city.country}
            </option>
          ))}
        </select>
      </label>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="relative w-full rounded-3xl border border-white/10 bg-gradient-to-br from-slate-800/60 via-sky-900/40 to-slate-900/60 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
        </div>

        <div className="relative flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-700/80 text-sm font-semibold text-white">
              AQ
            </div>
            <div>
              <div className="text-xs text-slate-400">{selectedCity.name} Live Data</div>
              <div className="font-semibold text-white">
                {loading ? "Loading..." : airQuality?.lastUpdated ? formatRelativeTimestamp(airQuality.lastUpdated) : "Awaiting update"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-right text-xs text-slate-300">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <span className="font-semibold text-emerald-300">LIVE</span>
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mt-3 flex items-center justify-between rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-sm text-amber-200"
          >
            <span className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              {error}
            </span>
            <button
              type="button"
              onClick={() => void refreshData(selectedCity)}
              className="rounded-full border border-amber-400/30 px-2.5 py-1 text-xs font-medium transition hover:bg-amber-500/20"
            >
              Retry
            </button>
          </motion.div>
        )}

        <div className="relative mt-4 rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Selected location</p>
              <p className="mt-2 text-xl font-semibold text-white">{selectedCity.name}, {selectedCity.country}</p>
            </div>
            <div className="rounded-full border border-slate-800 bg-slate-900/80 px-4 py-2 text-sm text-slate-200">
              Live monitoring enabled
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Current AQI</p>
              <p className={`mt-3 text-4xl font-semibold ${aqiValueClasses}`}>{loading ? "--" : formatMetric(airQuality?.aqi ?? null)}</p>
              <p className="mt-2 text-sm text-slate-400">{loading ? "Loading status" : getAQIStatus(airQuality?.aqi ?? null)}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Operational outlook</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {loading
                  ? "Awaiting live update"
                  : respiratoryRisk.label === "High"
                  ? "High exposure risk. Limit outdoor operations and notify stakeholders."
                  : respiratoryRisk.label === "Moderate"
                  ? "Moderate conditions. Monitor closely and keep precautionary workflows ready."
                  : "Low risk. Continue standard environmental monitoring."
                }
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-sm text-slate-400">
            <span className="rounded-full border border-slate-800 bg-slate-900/80 px-3 py-2">
              {loading ? "Fetching latest data" : airQuality?.lastUpdated ? formatRelativeTimestamp(airQuality.lastUpdated) : "Awaiting update"}
            </span>
            <button
              type="button"
              onClick={() => void refreshData(selectedCity)}
              className="rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm text-white transition hover:bg-slate-800"
            >
              Refresh
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
