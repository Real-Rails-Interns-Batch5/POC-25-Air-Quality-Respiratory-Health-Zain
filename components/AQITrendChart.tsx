"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getAirQualityHistory, type AirQualityHistoryPoint } from "@/lib/airQuality";

interface AQITrendChartProps {
  city: {
    latitude: number;
    longitude: number;
    name: string;
  };
}

function formatHourLabel(value: string) {
  if (!value) {
    return "--";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "--";
  }

  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function formatTooltipTime(value: string) {
  if (!value) {
    return "--";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function formatMetric(value: number | null) {
  if (value === null || Number.isNaN(value)) {
    return "—";
  }

  return value.toFixed(0);
}

function TooltipContent({ active, payload, label }: { active?: boolean; payload?: Array<{ name?: string; value?: number | null; color?: string }>; label?: string }) {
  if (!active || !payload?.length || !label) {
    return null;
  }

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-950/95 px-3 py-2 text-sm shadow-lg">
      <div className="text-[11px] uppercase tracking-[0.25em] text-slate-400">Time</div>
      <div className="mt-1 font-medium text-white">{formatTooltipTime(label)}</div>
      <div className="mt-2 space-y-1">
        {payload.map((entry, index) => {
          const value = entry.value;
          if (value === null || value === undefined) {
            return null;
          }

          const labelText =
            entry.name === "AQI"
              ? "AQI"
              : entry.name === "PM2.5"
                ? "PM2.5 μg/m³"
                : entry.name === "PM10"
                  ? "PM10 μg/m³"
                  : entry.name;

          return (
            <div key={`${entry.name ?? "value"}-${index}`} className="flex items-center justify-between gap-3 text-slate-300">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                {labelText}
              </span>
              <span className="font-semibold text-white">{formatMetric(typeof value === "number" ? value : null)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function AQITrendChart({ city }: AQITrendChartProps) {
  const [data, setData] = useState<AirQualityHistoryPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setLoading(true);
      setError(false);

      try {
        const history = await getAirQualityHistory(city.latitude, city.longitude);
        if (isMounted) {
          setData(history);
        }
      } catch {
        if (isMounted) {
          setError(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [city.latitude, city.longitude]);

  const chartData = useMemo(() => {
    return data.filter((point) => point.aqi !== null || point.pm25 !== null || point.pm10 !== null);
  }, [data]);

  if (loading) {
    return (
      <div className="mt-6 flex h-48 items-center justify-center rounded-xl border border-slate-800 bg-slate-950/70 p-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-sky-400/40 border-t-sky-400" />
      </div>
    );
  }

  if (error || chartData.length === 0) {
    return (
      <div className="mt-6 flex h-48 items-center justify-center rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-400">
        Unable to load trend data.
      </div>
    );
  }

  return (
    <motion.div
      key={city.name}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mt-6 h-60 rounded-xl border border-slate-800 bg-slate-950/70 p-3"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            tickFormatter={formatHourLabel}
            stroke="#334155"
            tickCount={8}
            minTickGap={12}
          />
          <YAxis
            yAxisId="left"
            domain={[0, 300]}
            stroke="#334155"
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            width={40}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, 220]}
            stroke="#334155"
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            width={40}
          />
          <Tooltip content={<TooltipContent />} />
          <Legend wrapperStyle={{ fontSize: "12px", color: "#cbd5e1" }} />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="aqi"
            name="AQI"
            stroke="#22c55e"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4 }}
            connectNulls
            isAnimationActive
            animationDuration={250}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="pm25"
            name="PM2.5"
            stroke="#3b82f6"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4 }}
            connectNulls
            isAnimationActive
            animationDuration={250}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="pm10"
            name="PM10"
            stroke="#f59e0b"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4 }}
            connectNulls
            isAnimationActive
            animationDuration={250}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
