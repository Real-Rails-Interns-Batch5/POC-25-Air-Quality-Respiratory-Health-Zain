import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/60 bg-[#020617]/95 backdrop-blur-xl shadow-black/20">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-500 text-white shadow-lg shadow-sky-500/20">
            <span className="text-lg font-semibold">A</span>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
              AirCare
            </p>
            <p className="text-sm font-semibold text-slate-100">
              Intelligence
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {[
            { label: "Dashboard", href: "#dashboard" },
            { label: "Live Map", href: "#live-map" },
            { label: "Analytics", href: "#analytics" },
            { label: "About", href: "#about" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-slate-300 transition duration-200 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="outline"
            className="hidden rounded-full border-slate-700 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-600 hover:bg-white/10 md:inline-flex"
          >
            <Link href="https://github.com" target="_blank" rel="noreferrer">
              GitHub
            </Link>
          </Button>
          <Button className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition duration-200 hover:-translate-y-[1px] hover:bg-sky-400">
            Launch Dashboard
          </Button>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 pb-3 pt-2 md:hidden">
        {[
          { label: "Dashboard", href: "#dashboard" },
          { label: "Live Map", href: "#live-map" },
          { label: "Analytics", href: "#analytics" },
          { label: "About", href: "#about" },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="rounded-full border border-slate-800 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200 transition hover:border-slate-600 hover:bg-white/10"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
