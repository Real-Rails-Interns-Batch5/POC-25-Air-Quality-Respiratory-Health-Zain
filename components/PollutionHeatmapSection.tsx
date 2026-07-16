"use client";

import dynamic from "next/dynamic";
import type { AirQualityData } from "@/lib/airQuality";
import type { City } from "@/lib/cities";
import type { WeatherData } from "@/lib/weather";

const PollutionMap = dynamic(() => import("@/components/PollutionMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[500px] items-center justify-center rounded-[1.5rem] border border-slate-800 bg-slate-950/70 text-sm text-slate-400">
      Loading map…
    </div>
  ),
});

interface PollutionHeatmapSectionProps {
  selectedCity: City;
  airQuality: AirQualityData | null;
  weather: WeatherData | null;
  loading: boolean;
  weatherLoading: boolean;
}

export default function PollutionHeatmapSection({
  selectedCity,
  airQuality,
  weather,
  loading,
  weatherLoading,
}: PollutionHeatmapSectionProps) {
  return (
    <section id="heatmap" className="rounded-[2rem] border border-slate-800 bg-slate-950 px-4 py-6 text-slate-100 shadow-2xl shadow-black/20 sm:px-8 sm:py-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-500">Pollution Heatmap</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Spatial monitoring view</h2>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
            <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1">Live geospatial layer</span>
            <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1">Responsive controls</span>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-slate-800 bg-slate-900/70 p-3 sm:p-4">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-[1.25rem] border border-slate-800/80 bg-slate-950/70 px-4 py-3 text-sm text-slate-400">
            <div>
              <p className="font-medium text-white">{selectedCity.name}</p>
              <p className="mt-1 text-slate-500">AQI and weather-driven impact radius</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1">OpenStreetMap</span>
              <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1">Zoom 8</span>
            </div>
          </div>
          <div className="rounded-[1.5rem] border border-slate-800/80 p-2">
            <PollutionMap
              selectedCity={selectedCity}
              aqi={airQuality?.aqi ?? null}
              pm25={airQuality?.pm25 ?? null}
              temperature={weather?.temperature ?? null}
              humidity={weather?.humidity ?? null}
              loading={loading}
              weatherLoading={weatherLoading}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
