"use client";

import { motion } from "framer-motion";
import { Activity, BarChart3, CloudSun, Cpu, Map, ShieldAlert, Waves } from "lucide-react";
import { useEffect, useState } from "react";
import type { AirQualityData } from "@/lib/airQuality";
import type { AirQualityHistoryPoint } from "@/lib/airQuality";
import type { City } from "@/lib/cities";
import type { WeatherData } from "@/lib/weather";

interface FeaturesProps {
  selectedCity: City;
  airQuality: AirQualityData | null;
  airQualityHistory: AirQualityHistoryPoint[];
  weather: WeatherData | null;
  loading: boolean;
  weatherLoading: boolean;
  lastSuccessfulFetch: string;
}

interface WidgetCardProps {
  title: string;
  icon: React.ElementType;
  accentClassName?: string;
  live?: boolean;
  href?: string;
  children: React.ReactNode;
}

function WidgetCard({ title, icon: Icon, accentClassName = "border-slate-800/80 bg-slate-900/80", live = false, href, children }: WidgetCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => setDisplayValue(1), 80);
    return () => window.clearTimeout(timer);
  }, []);

  const handleClick = () => {
    if (href) {
      document.getElementById(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.button
      type="button"
      whileHover={{ y: -4, scale: 1.01, boxShadow: "0 0 0 1px rgba(59,130,246,0.35), 0 16px 40px rgba(2,132,199,0.18)" }}
      whileTap={{ scale: 0.99 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 ${accentClassName}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 opacity-0 transition duration-300 group-hover:opacity-100" />
      <div className="relative flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-950/80 text-slate-300 transition duration-300 group-hover:rotate-3 group-hover:text-cyan-300">
          <Icon className="h-5 w-5" />
        </div>
        {live ? (
          <span className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-rose-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-rose-400" />
            LIVE
          </span>
        ) : null}
      </div>
      <h3 className="relative mt-5 text-lg font-semibold text-white">{title}</h3>
      <div className="relative mt-3 text-sm leading-6 text-slate-400">{children}</div>
      <motion.div
        animate={{ opacity: displayValue }}
        transition={{ duration: 0.25 }}
        className="pointer-events-none absolute bottom-3 right-3 h-2 w-16 rounded-full bg-gradient-to-r from-cyan-500/40 via-blue-500/70 to-slate-500/20"
      />
    </motion.button>
  );
}

function getAQIState(aqi: number | null) {
  if (aqi === null || Number.isNaN(aqi)) {
    return { label: "Unknown", className: "bg-slate-700/60 text-slate-200", badge: "border-slate-700/70" };
  }

  if (aqi <= 50) return { label: "Good", className: "bg-emerald-500/15 text-emerald-300", badge: "border-emerald-500/30" };
  if (aqi <= 100) return { label: "Moderate", className: "bg-amber-500/15 text-amber-300", badge: "border-amber-500/30" };
  if (aqi <= 150) return { label: "Unhealthy", className: "bg-orange-500/15 text-orange-300", badge: "border-orange-500/30" };
  if (aqi <= 200) return { label: "Very Unhealthy", className: "bg-rose-500/15 text-rose-300", badge: "border-rose-500/30" };
  return { label: "Hazardous", className: "bg-violet-500/15 text-violet-300", badge: "border-violet-500/30" };
}

function getWeatherIcon(weatherCode: number | null) {
  if (weatherCode === null || Number.isNaN(weatherCode)) {
    return <CloudSun className="h-5 w-5" />;
  }

  if (weatherCode >= 61 && weatherCode <= 82) return <Waves className="h-5 w-5" />;
  if (weatherCode >= 45 && weatherCode <= 48) return <CloudSun className="h-5 w-5" />;
  return <CloudSun className="h-5 w-5" />;
}

function getHealthRecommendations(aqi: number | null) {
  if (aqi === null || Number.isNaN(aqi)) {
    return ["Monitoring data unavailable", "Awaiting live update"];
  }

  if (aqi <= 50) {
    return ["✓ Safe outdoor activities", "✓ Normal ventilation"];
  }

  if (aqi <= 100) {
    return ["✓ Sensitive people reduce exposure", "✓ Keep hydration close"];
  }

  if (aqi <= 150) {
    return ["✓ Wear N95 mask", "✓ Avoid exercise", "✓ Keep windows closed"];
  }

  return ["✓ Stay indoors", "✓ Use air purifier", "✓ Avoid outdoor activities"];
}

function getTrendState(history: AirQualityHistoryPoint[]) {
  if (history.length < 3) {
    return { label: "Stable", direction: "→", className: "text-slate-300" };
  }

  const last = history[history.length - 1]?.aqi ?? null;
  const previous = history[history.length - 2]?.aqi ?? null;
  const older = history[history.length - 3]?.aqi ?? null;

  if (last === null || previous === null || older === null) {
    return { label: "Stable", direction: "→", className: "text-slate-300" };
  }

  if (last < previous - 8) {
    return { label: "Improving", direction: "↑", className: "text-emerald-300" };
  }

  if (last > previous + 8) {
    return { label: "Worsening", direction: "↓", className: "text-rose-300" };
  }

  return { label: "Stable", direction: "→", className: "text-slate-300" };
}

export default function Features({
  selectedCity,
  airQuality,
  airQualityHistory,
  weather,
  loading,
  weatherLoading,
  lastSuccessfulFetch,
}: FeaturesProps) {
  const aqiState = getAQIState(airQuality?.aqi ?? null);
  const healthRecommendations = getHealthRecommendations(airQuality?.aqi ?? null);
  const trendState = getTrendState(airQualityHistory);

  return (
    <section id="operations" className="rounded-[2rem] border border-slate-800 bg-slate-950 px-4 py-6 text-slate-100 shadow-2xl shadow-black/20 sm:px-8 sm:py-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-500">
            Platform capabilities
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
            Operations Control Center
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-400">
            A focused set of live operational widgets for monitoring air quality, understanding risk, and responding with confidence.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <WidgetCard title="Operational Readiness" icon={Activity} accentClassName="border-cyan-500/20 bg-slate-900/80" href="dashboard">
            <div className="space-y-3 text-sm text-slate-300">
              <p>Review open incidents and recommended response steps.</p>
              <p>Trigger escalation, adjust monitoring thresholds, or delegate action to shift teams.</p>
              <p className="rounded-lg border border-slate-800/80 bg-slate-950/50 px-3 py-2">Status: {aqiState.label}</p>
            </div>
          </WidgetCard>

          <WidgetCard title="Weather Operations" icon={CloudSun} accentClassName="border-blue-500/20 bg-slate-900/80" href="dashboard">
            <div className="space-y-3 text-sm text-slate-300">
              <p>Access weather-driven operational alerts and boundary conditions.</p>
              <p>Coordinate ventilation and outdoor work plans with upstream forecasts.</p>
            </div>
          </WidgetCard>

          <WidgetCard title="Health Recommendations" icon={ShieldAlert} accentClassName="border-emerald-500/20 bg-slate-900/80" href="analytics">
            <div className="space-y-2 text-sm text-slate-300">
              {healthRecommendations.map((item) => (
                <p key={item} className="rounded-lg border border-slate-800/80 bg-slate-950/50 px-3 py-2">
                  {item}
                </p>
              ))}
            </div>
          </WidgetCard>

          <WidgetCard title="Spatial Navigation" icon={Map} accentClassName="border-violet-500/20 bg-slate-900/80" href="map">
            <div className="space-y-3 text-sm text-slate-300">
              <p>Open the pollution heatmap to inspect hotspot clusters and exposure zones.</p>
              <p>Use the map view to align operational alerts with geographic risk areas.</p>
            </div>
          </WidgetCard>

          <WidgetCard title="Trend Insights" icon={BarChart3} accentClassName="border-amber-500/20 bg-slate-900/80" href="historical">
            <div className="space-y-3 text-sm text-slate-300">
              <p>Track recent performance and compare against prior week baselines.</p>
              <p>Use trend context to prioritize preventive actions and resource deployment.</p>
              <p className={`text-sm font-semibold ${trendState.className}`}>{trendState.direction} {trendState.label}</p>
            </div>
          </WidgetCard>

          <WidgetCard title="Data Health" icon={Cpu} accentClassName="border-slate-700/60 bg-slate-900/80" href="dashboard">
            <div className="space-y-2 text-sm text-slate-300">
              <div className="rounded-lg border border-slate-800/80 bg-slate-950/50 p-3">
                <p className="font-medium text-white">Open-Meteo feed</p>
                <p className="mt-1 text-slate-400">Live query and refresh status</p>
              </div>
              <div className="rounded-lg border border-slate-800/80 bg-slate-950/50 p-3">
                <p className="font-medium text-white">Connectivity</p>
                <p className="mt-1 text-slate-400">Stable enterprise data stream</p>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-slate-800/80 bg-slate-950/50 p-3">
                <span>Last successful fetch</span>
                <span className="text-cyan-300">{lastSuccessfulFetch}</span>
              </div>
            </div>
          </WidgetCard>
        </div>
      </div>
    </section>
  );
}