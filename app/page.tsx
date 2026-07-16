"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DashboardPreview from "@/components/DashboardPreview";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import HistoricalAnalytics from "@/components/HistoricalAnalytics";
import PollutionHeatmapSection from "@/components/PollutionHeatmapSection";
import { getAirQuality, getAirQualityHistory, type AirQualityData, type AirQualityHistoryPoint } from "@/lib/airQuality";
import { cities, type City } from "@/lib/cities";
import { getWeather, type WeatherData } from "@/lib/weather";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<City>(cities[0]);
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);
  const [airQualityHistory, setAirQualityHistory] = useState<AirQualityHistoryPoint[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [lastSuccessfulFetch, setLastSuccessfulFetch] = useState("Awaiting first sync");

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setLoading(true);
      setWeatherLoading(true);

      try {
        const [airData, weatherData, historyData] = await Promise.all([
          getAirQuality(selectedCity.latitude, selectedCity.longitude),
          getWeather(selectedCity.latitude, selectedCity.longitude),
          getAirQualityHistory(selectedCity.latitude, selectedCity.longitude),
        ]);

        if (isMounted) {
          setAirQuality(airData);
          setWeather(weatherData);
          setAirQualityHistory(historyData);
          setLastSuccessfulFetch(
            new Date().toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })
          );
        }
      } catch {
        if (isMounted) {
          setAirQuality(null);
          setWeather(null);
          setAirQualityHistory([]);
          setLastSuccessfulFetch("Offline");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
          setWeatherLoading(false);
        }
      }
    };

    void loadData();

    return () => {
      isMounted = false;
    };
  }, [selectedCity.latitude, selectedCity.longitude]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <div className="space-y-4 px-3 py-3 sm:px-4 lg:px-6">
        <Hero selectedCity={selectedCity} onCityChange={setSelectedCity} />
        <div id="dashboard" className="scroll-mt-24" />
        <DashboardPreview
          selectedCity={selectedCity}
          airQuality={airQuality}
          weather={weather}
          loading={loading}
          weatherLoading={weatherLoading}
        />
        <PollutionHeatmapSection
          selectedCity={selectedCity}
          airQuality={airQuality}
          weather={weather}
          loading={loading}
          weatherLoading={weatherLoading}
        />
        <Features
          selectedCity={selectedCity}
          airQuality={airQuality}
          airQualityHistory={airQualityHistory}
          weather={weather}
          loading={loading}
          weatherLoading={weatherLoading}
          lastSuccessfulFetch={lastSuccessfulFetch}
        />
        <HistoricalAnalytics />
      </div>
      <Footer />
    </main>
  );
}