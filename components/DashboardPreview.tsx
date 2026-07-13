const stats = [
  { label: "Current AQI", value: "72", note: "Moderate" },
  { label: "PM2.5", value: "34 μg/m³", note: "Elevated" },
  { label: "Resp. Risk", value: "Low", note: "Stable" },
  { label: "Monitoring", value: "128 sites", note: "Online" },
];

const alerts = [
  { zone: "North District", severity: "High", type: "PM2.5 spike", time: "2 min ago" },
  { zone: "Harbor Loop", severity: "Medium", type: "NO₂ increase", time: "11 min ago" },
  { zone: "Central Hub", severity: "Low", type: "Temperature drift", time: "19 min ago" },
];

const trendBars = [48, 58, 62, 55, 68, 72, 64];
const heatmap = ["#1f2937", "#2f3e52", "#334155", "#475569", "#0f766e", "#0f766e", "#b45309", "#dc2626", "#1d4ed8"];

export default function DashboardPreview() {
  return (
    <section className="rounded-[2rem] border border-slate-800 bg-slate-950 p-6 text-slate-100 shadow-2xl shadow-black/20 sm:p-8">
      <div className="flex flex-col gap-4 border-b border-slate-800 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-500">
            Air quality command center
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Respiratory Health Analytics
          </h2>
        </div>
        <div className="flex items-center gap-2 self-start rounded-full border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-300 lg:self-auto">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          Live • Updated 2 min ago
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {['Last 24h', 'North Zone', 'All pollutants', 'Export'].map((filter) => (
          <button
            key={filter}
            className="rounded-full border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-300 transition hover:border-slate-700 hover:text-white"
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">AQI Trend</p>
              <p className="text-sm text-slate-400">Weekly movement across monitored districts</p>
            </div>
            <span className="rounded-full border border-emerald-800/70 bg-emerald-950/70 px-3 py-1 text-sm text-emerald-300">
              Stable
            </span>
          </div>

          <div className="mt-6 flex h-48 items-end gap-2 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
            {trendBars.map((height, index) => (
              <div key={index} className="flex flex-1 flex-col items-center justify-end gap-2">
                <div
                  className="w-full rounded-t-md bg-slate-600"
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between text-xs uppercase tracking-[0.25em] text-slate-500">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-white">Live Statistics</p>
              <span className="text-sm text-slate-400">Updated now</span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {stats.map((item) => (
                <div key={item.label} className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{item.label}</p>
                  <p className="mt-2 text-xl font-semibold text-white">{item.value}</p>
                  <p className="mt-1 text-sm text-slate-400">{item.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-white">Pollution Heatmap</p>
              <span className="text-sm text-slate-400">Peak exposure</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {heatmap.map((color, index) => (
                <div
                  key={index}
                  className="h-12 rounded-lg border border-slate-800"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-white">Recent Alerts</p>
            <p className="text-sm text-slate-400">Priority incidents from the last hour</p>
          </div>
          <button className="text-sm text-slate-400 transition hover:text-white">
            View all
          </button>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-slate-800">
          <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
            <thead className="bg-slate-950/70 text-slate-400">
              <tr>
                <th className="px-4 py-3 font-medium">Zone</th>
                <th className="px-4 py-3 font-medium">Severity</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900/70">
              {alerts.map((alert) => (
                <tr key={alert.zone}>
                  <td className="px-4 py-3 text-white">{alert.zone}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs ${
                        alert.severity === "High"
                          ? "bg-rose-950/70 text-rose-300"
                          : alert.severity === "Medium"
                            ? "bg-amber-950/70 text-amber-300"
                            : "bg-emerald-950/70 text-emerald-300"
                      }`}
                    >
                      {alert.severity}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{alert.type}</td>
                  <td className="px-4 py-3 text-slate-400">{alert.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}