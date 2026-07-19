"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import DatasetStats from "@/components/DatasetStats";
import DownloadCard from "@/components/DownloadCard";
import { generateDataset, type DatasetGenerationResult, type DatasetTimeRange } from "@/lib/dataset";
import { cities } from "@/lib/cities";
import { downloadCsv } from "@/utils/csvExport";

const DEFAULT_FILENAME = "air-quality-dataset.csv";

export default function DatasetGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [dataset, setDataset] = useState<DatasetGenerationResult | null>(null);
  const [range, setRange] = useState<DatasetTimeRange>("7d");
  const [statusMessage, setStatusMessage] = useState("No dataset generated yet.");

  const handleGenerate = async () => {
    setIsGenerating(true);
    setStatusMessage("Connecting to live Open-Meteo APIs...");

    try {
      const result = await generateDataset(range, cities);
      setDataset(result);
      setStatusMessage(`Dataset created with ${result.metadata.rows.toLocaleString()} rows.`);
    } catch (error) {
      setDataset(null);
      setStatusMessage(
        error instanceof Error ? error.message : "Unable to generate dataset right now."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!dataset) {
      setStatusMessage("Generate a dataset before downloading the CSV.");
      return;
    }

    downloadCsv(DEFAULT_FILENAME, dataset.csvContent);
    setStatusMessage("CSV downloaded successfully.");
  };

  const summary = useMemo(() => {
    const lastGenerated = dataset?.generatedAt
      ? new Date(dataset.generatedAt).toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "Awaiting first run";

    return {
      totalRecords: dataset?.metadata.rows ?? 0,
      citiesCovered: dataset?.metadata.citiesCovered ?? cities.length,
      timeRange: dataset?.metadata.timeRange ?? "No dataset yet",
      lastGenerated,
      datasetSize: dataset ? `${(dataset.metadata.sizeBytes / 1024).toFixed(1)} KB` : "0 KB",
      sourceApis: dataset?.sourceApis ?? ["Open-Meteo Air Quality API", "Open-Meteo Weather API"],
    };
  }, [dataset]);

  return (
    <section id="dataset-generator" className="scroll-mt-24 rounded-[2rem] border border-slate-800 bg-slate-950 px-4 py-6 text-slate-100 shadow-2xl shadow-black/20 sm:px-8 sm:py-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-500">Dataset Generator</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Build export-ready air quality datasets automatically</h2>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            Pull live air quality and weather measurements across multiple cities, generate a CSV in memory, and download it instantly without manual uploads.
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <DownloadCard
            isGenerating={isGenerating}
            isReady={Boolean(dataset)}
            onGenerate={handleGenerate}
            onDownload={handleDownload}
            selectedRange={range}
            onRangeChange={setRange}
          />

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[1.5rem] border border-slate-800/80 bg-slate-900/70 p-4 text-sm text-slate-300"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <span>{statusMessage}</span>
              <span className="text-cyan-300">{dataset ? "CSV prepared" : "Awaiting generation"}</span>
            </div>
          </motion.div>

          <DatasetStats
            rows={dataset?.metadata.rows ?? 0}
            columns={dataset?.metadata.columns ?? 15}
            sizeBytes={dataset?.metadata.sizeBytes ?? 0}
            generationTimeMs={dataset?.metadata.generationTimeMs ?? 0}
            apiStatus={dataset?.metadata.apiStatus ?? "No API calls executed yet."}
            timeRange={summary.timeRange}
            citiesCovered={summary.citiesCovered}
            totalRecords={summary.totalRecords}
            lastGenerated={summary.lastGenerated}
            datasetSize={summary.datasetSize}
            sourceApis={dataset?.sourceApis ?? ["Open-Meteo Air Quality API", "Open-Meteo Weather API"]}
          />
        </div>
      </div>
    </section>
  );
}
