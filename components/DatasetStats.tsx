"use client";

import { motion } from "framer-motion";

interface DatasetStatsProps {
  rows: number;
  columns: number;
  sizeBytes: number;
  generationTimeMs: number;
  apiStatus: string;
  timeRange: string;
  citiesCovered: number;
  totalRecords: number;
  lastGenerated: string;
  datasetSize: string;
  sourceApis: string[];
}

function formatBytes(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function DatasetStats({
  rows,
  columns,
  sizeBytes,
  generationTimeMs,
  apiStatus,
  timeRange,
  citiesCovered,
  totalRecords,
  lastGenerated,
  datasetSize,
  sourceApis,
}: DatasetStatsProps) {
  const metrics = [
    { label: "Total records", value: totalRecords.toLocaleString() },
    { label: "Cities covered", value: citiesCovered.toString() },
    { label: "Time period", value: timeRange },
    { label: "Last generated", value: lastGenerated },
    { label: "Dataset size", value: datasetSize },
    { label: "Source APIs", value: sourceApis.join(" / ") },
  ];

  return (
    <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[1.75rem] border border-slate-800/80 bg-slate-900/70 p-5 shadow-2xl shadow-black/20 backdrop-blur"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-500">Dataset Information</p>
            <h3 className="mt-2 text-xl font-semibold text-white">Live export-ready pipeline</h3>
          </div>
          <div className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
            {rows > 0 ? "Ready" : "Idle"}
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-[1.25rem] border border-slate-800/90 bg-slate-950/80 p-4">
              <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">{metric.label}</p>
              <p className="mt-2 text-lg font-semibold text-white">{metric.value}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-[1.75rem] border border-slate-800/80 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-blue-500/10 p-5 shadow-2xl shadow-black/20 backdrop-blur"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-500">Metadata</p>
        <div className="mt-4 space-y-4">
          <div>
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Rows generated</span>
              <span>{rows.toLocaleString()}</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-slate-800">
              <div className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: `${Math.min(100, Math.round((rows / Math.max(1, totalRecords)) * 100))}%` }} />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.25rem] border border-slate-800/80 bg-slate-950/70 p-4">
              <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Columns</p>
              <p className="mt-2 text-xl font-semibold text-white">{columns}</p>
            </div>
            <div className="rounded-[1.25rem] border border-slate-800/80 bg-slate-950/70 p-4">
              <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Dataset size</p>
              <p className="mt-2 text-xl font-semibold text-white">{formatBytes(sizeBytes)}</p>
            </div>
            <div className="rounded-[1.25rem] border border-slate-800/80 bg-slate-950/70 p-4">
              <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Generation time</p>
              <p className="mt-2 text-xl font-semibold text-white">{generationTimeMs} ms</p>
            </div>
            <div className="rounded-[1.25rem] border border-slate-800/80 bg-slate-950/70 p-4">
              <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">API status</p>
              <p className="mt-2 text-sm font-semibold text-cyan-300">{apiStatus}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
