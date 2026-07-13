export default function Hero() {
  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-sky-900 to-slate-800 text-slate-100 flex items-center">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
          {/* Left: Text Card */}
          <div className="w-full lg:w-1/2">
            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-12 shadow-xl">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/6 text-sky-200 border border-white/6">
                Real Rails Healthcare Intelligence
              </span>

              <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                Air Quality &amp; Respiratory Health Correlation Analyzer
              </h1>

              <p className="mt-4 text-slate-200 text-sm sm:text-base max-w-xl">
                Monitor live AQI, PM2.5, weather conditions and respiratory health risk across Gulf
                countries using real-time environmental APIs.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-sky-500 hover:bg-sky-400 active:translate-y-0.5 transition transform text-white font-semibold shadow-md">
                  Launch Dashboard
                </button>

                <button className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-transparent border border-white/10 text-slate-100 hover:bg-white/3 transition">
                  View Live Map
                </button>
              </div>
            </div>
          </div>

          {/* Right: Mockup */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-[340px] sm:w-[420px] lg:w-[520px] aspect-[16/10] rounded-3xl bg-gradient-to-br from-slate-800/60 via-sky-900/40 to-slate-900/60 border border-white/8 shadow-2xl overflow-hidden">
              {/* Ambient glow */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -left-24 -top-24 w-56 h-56 rounded-full bg-blue-600/20 blur-3xl" />
                <div className="absolute -right-24 -bottom-24 w-72 h-72 rounded-full bg-sky-400/10 blur-3xl" />
              </div>

              {/* Top bar */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-700/60 border border-white/6 flex items-center justify-center text-xs font-semibold">AQ</div>
                  <div>
                    <div className="text-xs text-slate-300">Gulf Live</div>
                    <div className="text-sm font-medium">Updated 2m ago</div>
                  </div>
                </div>
                <div className="text-xs text-slate-300">Mockup</div>
              </div>

              {/* Content grid */}
              <div className="p-4 grid grid-cols-2 gap-3">
                {/* AQI Gauge placeholder */}
                <div className="col-span-2 sm:col-span-1 bg-white/5 border border-white/6 rounded-xl p-4 flex flex-col items-center justify-center">
                  <div className="text-sm text-slate-300">AQI</div>
                  <div className="mt-3 text-4xl font-bold text-emerald-300">42</div>
                  <div className="mt-1 text-xs text-slate-300">Good</div>
                </div>

                {/* PM2.5 */}
                <div className="bg-white/4 border border-white/6 rounded-xl p-3">
                  <div className="text-xs text-slate-300">PM2.5</div>
                  <div className="mt-2 text-2xl font-semibold">12 µg/m³</div>
                  <div className="mt-1 text-xs text-slate-400">24-hr avg</div>
                </div>

                {/* Temperature */}
                <div className="bg-white/4 border border-white/6 rounded-xl p-3">
                  <div className="text-xs text-slate-300">Temperature</div>
                  <div className="mt-2 text-2xl font-semibold">29°C</div>
                  <div className="mt-1 text-xs text-slate-400">Feels like 31°C</div>
                </div>

                {/* Wind Speed */}
                <div className="bg-white/4 border border-white/6 rounded-xl p-3">
                  <div className="text-xs text-slate-300">Wind</div>
                  <div className="mt-2 text-2xl font-semibold">8 km/h</div>
                  <div className="mt-1 text-xs text-slate-400">NE</div>
                </div>

                {/* Health Risk */}
                <div className="col-span-2 bg-gradient-to-r from-rose-600/20 to-yellow-400/10 border border-white/6 rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-200">Respiratory Health Risk</div>
                    <div className="mt-1 text-lg font-bold">Low</div>
                  </div>
                  <div className="text-xs text-slate-300">Population: Gulf Region</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}