import LiveAQICard from "@/components/LiveAQICard";
import ScrollLink from "@/components/ScrollLink";
import type { City } from "@/lib/cities";

interface HeroProps {
  selectedCity: City;
  onCityChange: (city: City) => void;
}

export default function Hero({ selectedCity, onCityChange }: HeroProps) {
  return (
    <section
      id="hero"
      className="min-h-[72vh] w-full bg-gradient-to-br from-slate-900 via-sky-900 to-slate-800 text-slate-100 flex items-center py-8 sm:py-10 lg:py-12"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          {/* Left */}
          <div className="w-full lg:w-1/2 animate-fade-in">
            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-12 shadow-2xl">

              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-300 border border-sky-400/20">
                🌍 Enterprise Air Quality Intelligence
              </span>

              <h1 className="mt-6 text-4xl lg:text-6xl font-extrabold leading-tight">
                Air Quality & Respiratory Health Intelligence Platform
              </h1>

              <p className="mt-6 text-slate-300 text-base leading-8 max-w-xl">
                Monitor live AQI, PM2.5, weather conditions and respiratory
                health risk through a resilient enterprise dashboard powered by
                real environmental data from the Open-Meteo Air Quality API.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">

<ScrollLink href="#analytics" className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 transition-all duration-300 transform-gpu hover:scale-[1.02] font-semibold shadow-lg shadow-sky-500/20">
                Explore Analytics
              </ScrollLink>

              <ScrollLink href="#heatmap" className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all duration-300 transform-gpu hover:scale-[1.02]">
                Explore Air Quality Map
              </ScrollLink>

              </div>

              <div className="mt-8 flex items-center gap-2 text-sm text-slate-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Live environmental data powered by Open-Meteo
              </div>

            </div>
          </div>

          {/* Right */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="w-[340px] sm:w-[420px] lg:w-[520px]">
              <LiveAQICard selectedCity={selectedCity} onCityChange={onCityChange} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}