import {
  Activity,
  BarChart3,
  CloudSun,
  Cpu,
  Map,
  ShieldAlert,
} from "lucide-react";

const features = [
  {
    title: "Live AQI",
    description:
      "Monitor real-time air quality signals with clear, enterprise-ready status updates.",
    icon: Activity,
  },
  {
    title: "Weather Integration",
    description:
      "Combine meteorological context with pollution data to improve situational awareness.",
    icon: CloudSun,
  },
  {
    title: "Health Risk Prediction",
    description:
      "Surface respiratory exposure trends before they become operational issues.",
    icon: ShieldAlert,
  },
  {
    title: "Interactive Maps",
    description:
      "Explore hotspots and monitor affected regions with spatially aware dashboards.",
    icon: Map,
  },
  {
    title: "Historical Trends",
    description:
      "Review weekly and monthly patterns to support long-term planning and reporting.",
    icon: BarChart3,
  },
  {
    title: "API Driven",
    description:
      "Integrate seamlessly with your existing observability stack through robust endpoints.",
    icon: Cpu,
  },
];

export default function Features() {
  return (
    <section className="rounded-[2rem] border border-slate-800 bg-slate-950 px-6 py-10 text-slate-100 shadow-2xl shadow-black/20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-500">
            Platform capabilities
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
            Built for operational clarity.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-400">
            A focused set of tools for monitoring air quality, understanding risk, and responding with confidence.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 transition hover:border-slate-700"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-950 text-slate-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{feature.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}