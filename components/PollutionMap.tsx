"use client";

import { divIcon } from "leaflet";
import { useEffect, useMemo } from "react";
import { Circle, Marker, Popup, TileLayer, MapContainer, useMap } from "react-leaflet";
import type { City } from "@/lib/cities";

interface PollutionMapProps {
  selectedCity: City;
  aqi: number | null;
  pm25: number | null;
  temperature: number | null;
  humidity: number | null;
  loading: boolean;
  weatherLoading: boolean;
}

function getAQIColor(aqi: number | null) {
  if (aqi === null || Number.isNaN(aqi)) {
    return "#64748b";
  }

  if (aqi <= 50) return "#10b981";
  if (aqi <= 100) return "#facc15";
  if (aqi <= 150) return "#f97316";
  if (aqi <= 200) return "#ef4444";
  return "#8b5cf6";
}

function getAQIRadius(aqi: number | null) {
  if (aqi === null || Number.isNaN(aqi)) {
    return 2500;
  }

  return Math.min(12000, Math.max(2500, aqi * 35));
}

function MapController({ position }: { position: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, 8, {
      duration: 0.95,
      easeLinearity: 0.25,
    });
  }, [map, position]);

  return null;
}

export default function PollutionMap({
  selectedCity,
  aqi,
  pm25,
  temperature,
  humidity,
  loading,
  weatherLoading,
}: PollutionMapProps) {
  const position = useMemo<[number, number]>(
    () => [selectedCity.latitude, selectedCity.longitude],
    [selectedCity.latitude, selectedCity.longitude]
  );

  const markerIcon = useMemo(
    () =>
      divIcon({
        className: "",
        html: '<div class="h-4 w-4 rounded-full border-2 border-white bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.75)]"></div>',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      }),
    []
  );

  const circleColor = getAQIColor(aqi);
  const circleRadius = getAQIRadius(aqi);

  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70">
      <MapContainer center={position} zoom={8} scrollWheelZoom={true} zoomControl={true} className="h-[560px] w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController position={position} />
        <Circle
          center={position}
          pathOptions={{
            fillColor: circleColor,
            color: circleColor,
            weight: 1.5,
            fillOpacity: 0.28,
            opacity: 0.65,
          }}
          radius={circleRadius}
        >
          <Popup>
            <div className="space-y-1 text-sm text-slate-900">
              <p className="font-semibold">{selectedCity.name}</p>
              <p>AQI: {loading ? "--" : (aqi ?? "--")}</p>
              <p>PM2.5: {loading ? "--" : `${pm25 ?? "--"} μg/m³`}</p>
              <p>Temperature: {weatherLoading ? "--" : `${temperature ?? "--"}°C`}</p>
              <p>Humidity: {weatherLoading ? "--" : `${humidity ?? "--"}%`}</p>
            </div>
          </Popup>
        </Circle>
        <Marker position={position} icon={markerIcon}>
          <Popup>
            <div className="space-y-1 text-sm text-slate-900">
              <p className="font-semibold">{selectedCity.name}</p>
              <p>AQI: {loading ? "--" : (aqi ?? "--")}</p>
              <p>PM2.5: {loading ? "--" : `${pm25 ?? "--"} μg/m³`}</p>
              <p>Temperature: {weatherLoading ? "--" : `${temperature ?? "--"}°C`}</p>
              <p>Humidity: {weatherLoading ? "--" : `${humidity ?? "--"}%`}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
