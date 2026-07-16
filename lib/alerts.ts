export type AlertSeverity = "Low" | "Medium" | "High";

export interface EnvironmentalAlert {
  id: string;
  severity: AlertSeverity;
  title: string;
  description: string;
  time: string;
}

interface GenerateAlertsInput {
  aqi: number | null;
  pm25: number | null;
  windSpeed: number | null;
  humidity: number | null;
  weatherCondition?: string | null;
  minutesAgo?: number;
}

function formatTime(minutesAgo = 0) {
  if (minutesAgo <= 0) {
    return "Just now";
  }

  return `Updated ${minutesAgo} minutes ago`;
}

export function generateAlerts({
  aqi,
  pm25,
  windSpeed,
  humidity,
  weatherCondition,
  minutesAgo = 0,
}: GenerateAlertsInput): EnvironmentalAlert[] {
  const alerts: EnvironmentalAlert[] = [];
  const time = formatTime(minutesAgo);

  if (aqi === null || Number.isNaN(aqi)) {
    return alerts;
  }

  if (aqi <= 50) {
    alerts.push({
      id: "aqi-good",
      severity: "Low",
      title: "Air Quality Good",
      description: "Outdoor activities are safe.",
      time,
    });
  } else if (aqi <= 100) {
    alerts.push({
      id: "aqi-moderate",
      severity: "Medium",
      title: "Moderate Air Pollution",
      description: "Sensitive individuals should reduce prolonged outdoor exposure.",
      time,
    });
  } else if (aqi <= 150) {
    alerts.push({
      id: "aqi-unhealthy",
      severity: "High",
      title: "Unhealthy Air Quality",
      description: "Wear a mask outdoors and avoid strenuous exercise.",
      time,
    });
  } else {
    alerts.push({
      id: "aqi-hazardous",
      severity: "High",
      title: "Hazardous Air Conditions",
      description: "Stay indoors when possible. Use air purifiers and avoid outdoor activities.",
      time,
    });
  }

  if (pm25 !== null && !Number.isNaN(pm25) && pm25 > 35) {
    alerts.push({
      id: "pm25-high",
      severity: "Medium",
      title: "High PM2.5",
      description: "Fine particle concentration exceeds WHO recommendations.",
      time,
    });
  }

  if (windSpeed !== null && !Number.isNaN(windSpeed) && windSpeed < 5) {
    alerts.push({
      id: "wind-dispersion",
      severity: "Low",
      title: "Poor Pollution Dispersion",
      description: "Low wind speed may allow pollutants to accumulate.",
      time,
    });
  }

  if (humidity !== null && !Number.isNaN(humidity) && humidity > 80) {
    alerts.push({
      id: "humidity-high",
      severity: "Low",
      title: "High Humidity",
      description: "High humidity may increase respiratory discomfort.",
      time,
    });
  }

  const normalizedCondition = weatherCondition?.toLowerCase() ?? "";
  if (normalizedCondition.includes("rain") || normalizedCondition.includes("drizzle")) {
    alerts.push({
      id: "weather-rain",
      severity: "Low",
      title: "Rain Detected",
      description: "Rain may temporarily reduce airborne particulate pollution.",
      time,
    });
  }

  return alerts;
}
