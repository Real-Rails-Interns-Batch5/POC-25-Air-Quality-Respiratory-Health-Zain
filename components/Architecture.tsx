const stages = [
  {
    title: "Live APIs",
    description: "Ingest AQI, weather, and sensor feeds from external sources.",
  },
  {
    title: "Processing Layer",
    description: "Normalize, validate, and transform incoming data into a reliable stream.",
  },
  {
    title: "Analytics Engine",
    description: "Model trends, calculate risk indicators, and trigger insights.",
  },
  {
    title: "Dashboard",
    description: "Present live metrics, alerts, and contextual summaries to operators.",
  },
];

export default function Architecture() {
  return (
    <section className="rounded-[2rem] border border-slate-800 bg-slate-950 px-6 py-10 text-slate-100 shadow-2xl shadow-black/20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-500">
            System architecture
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
            A clear path from data to decision.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-400">
            The platform is structured as a sequential flow that turns environmental signals into operational insight.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 lg:flex-row lg:justify-between lg:gap-0">
          {stages.map((stage, index) => (
            <div key={stage.title} className="flex w-full flex-col items-center lg:w-auto">
              <div className="w-full max-w-[240px] rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-black/10">
                <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Step {index + 1}
                </div>
                <h3 className="mt-3 text-lg font-semibold text-white">{stage.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{stage.description}</p>
              </div>
              {index < stages.length - 1 && (
                <div className="my-2 flex items-center justify-center text-slate-500 lg:my-0 lg:mx-3 lg:h-16 lg:w-8">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 rotate-90 lg:rotate-0">
                    <path
                      d="M6 9l6 6 6-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}