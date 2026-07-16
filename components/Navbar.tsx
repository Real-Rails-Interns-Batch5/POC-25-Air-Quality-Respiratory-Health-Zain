"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ScrollLink from "@/components/ScrollLink";

export default function Navbar() {
  const links = [
    { label: "Dashboard", href: "#dashboard" },
    { label: "Heatmap", href: "#heatmap" },
    { label: "Operations", href: "#operations" },
    { label: "Historical", href: "#historical" },
  ];

  const [activeSection, setActiveSection] = useState("hero");
  const sectionIds = useMemo(() => ["hero", ...links.map((item) => item.href.slice(1))], [links]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-120px 0px -60% 0px",
        threshold: 0.15,
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return (
    <>
     

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
              <p className="text-sm font-semibold text-slate-100">Intelligence</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((item) => {
              const sectionId = item.href.slice(1);
              const isActive = activeSection === sectionId;
              return (
                <ScrollLink
                  key={item.label}
                  href={item.href}
                  className={`relative text-sm font-medium transition duration-200 ${isActive ? "text-white" : "text-slate-300 hover:text-white"} after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-sky-400 after:transition-all after:duration-300 hover:after:w-full ${isActive ? "after:w-full" : ""}`}
                >
                  {item.label}
                </ScrollLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="View GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-white/5 text-slate-200 transition hover:border-slate-600 hover:bg-white/10 hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.9.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.38-3.88-1.38-.53-1.35-1.3-1.71-1.3-1.71-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.69.42.36.79 1.07.79 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12 24 5.73 18.27.5 12 .5Z" />
              </svg>
            </Link>
            <ScrollLink
              href="#analytics"
              className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition duration-200 hover:-translate-y-[1px] hover:bg-sky-400"
            >
              Analytics
            </ScrollLink>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 pb-3 pt-2 md:hidden">
          {links.map((item) => {
            const sectionId = item.href.slice(1);
            const isActive = activeSection === sectionId;
            return (
              <ScrollLink
                key={item.label}
                href={item.href}
                className={`rounded-full border border-slate-800 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200 transition duration-200 ${isActive ? "border-sky-400 text-white" : "hover:border-slate-600 hover:bg-white/10"}`}
              >
                {item.label}
              </ScrollLink>
            );
          })}
        </div>
      </header>
    </>
  );
}
