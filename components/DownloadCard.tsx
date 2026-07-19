"use client";

import { CheckCircle2, Download } from "lucide-react";
import { motion } from "framer-motion";

interface DownloadCardProps {
  isGenerating: boolean;
  isReady: boolean;
  onGenerate: () => void;
  onDownload: () => void;
  selectedRange: "24h" | "7d" | "30d";
  onRangeChange: (range: "24h" | "7d" | "30d") => void;
}

const ranges = [
  { value: "24h", label: "Last 24 hours" },
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
] as const;

export default function DownloadCard({
  isGenerating,
  isReady,
  onGenerate,
  onDownload,
  selectedRange,
  onRangeChange,
}: DownloadCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[1.75rem] border border-slate-800/80 bg-slate-900/70 p-5 shadow-2xl shadow-black/20 backdrop-blur"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-500">Dataset Generator</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Build downloadable, live datasets</h3>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
          <CheckCircle2 className="h-4 w-4" />
          <span>Live Open-Meteo data</span>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {ranges.map((range) => {
          const active = selectedRange === range.value;

          return (
            <button
              key={range.value}
              type="button"
              onClick={() => onRangeChange(range.value as "24h" | "7d" | "30d")}
              className={`rounded-full border px-3 py-1.5 text-sm transition ${active
                ? "border-cyan-500/40 bg-cyan-500/15 text-cyan-300"
                : "border-slate-700 bg-slate-950/70 text-slate-300 hover:border-slate-600"}`}
            >
              {range.label}
            </button>
          );
        })}
      </div>

      <div className="mt-5 rounded-[1.25rem] border border-slate-800/80 bg-slate-950/80 p-4">
        <div className="flex items-center justify-between text-sm text-slate-300">
          <span>{isGenerating ? "Generating dataset from live APIs..." : "Ready to generate a new dataset"}</span>
          <span>{isGenerating ? "In progress" : isReady ? "Ready" : "Idle"}</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
          <div
            className={`h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all ${isGenerating ? "animate-pulse" : ""}`}
            style={{ width: isGenerating ? "70%" : isReady ? "100%" : "20%" }}
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          disabled={isGenerating}
          onClick={onGenerate}
          className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/15 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/25 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isGenerating ? "Generating..." : "Generate Dataset"}
        </button>

        <button
          type="button"
          disabled={!isReady}
          onClick={onDownload}
          className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/70 px-4 py-2 text-sm font-medium text-white transition hover:border-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download className="h-4 w-4" />
          Download CSV
        </button>
      </div>
    </motion.div>
  );
}
