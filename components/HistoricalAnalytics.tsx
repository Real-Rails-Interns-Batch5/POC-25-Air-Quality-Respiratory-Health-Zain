"use client";

const cards = [
  { title: "Daily AQI Trend", description: "Hourly variation across the latest monitoring cycle." },
  { title: "Weekly Comparison", description: "Current week versus previous week performance." },
  { title: "Monthly Trend", description: "Seasonal movement and recurring exposure patterns." },
  { title: "Pollutant Breakdown", description: "PM2.5, PM10, ozone, and NO₂ comparison." },
  { title: "AQI Forecast", description: "Short-term outlook for operational planning." },
  { title: "Health Recommendations", description: "Actionable guidance tailored to current conditions." },
];

export default function HistoricalAnalytics() {
  return (
    <section id="historical" className="rounded-[2rem] border border-slate-800 bg-slate-950 px-4 py-6 text-slate-100 shadow-2xl shadow-black/20 sm:px-8 sm:py-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-500">Historical Analytics</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Context for planning and response</h2>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <div key={card.title} className="rounded-[1.5rem] border border-slate-800/80 bg-slate-900/70 p-5 transition duration-300 hover:border-cyan-500/30 hover:bg-slate-900">
              <div className="h-24 rounded-[1.25rem] border border-slate-800/80 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-blue-500/10" />
              <h3 className="mt-4 text-lg font-semibold text-white">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
