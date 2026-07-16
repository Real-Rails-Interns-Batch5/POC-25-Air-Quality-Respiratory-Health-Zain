export default function Footer() {
  return (
    <footer id="footer" className="border-t border-slate-800 bg-slate-950 px-6 py-10 text-slate-300 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-500">
            Project Name
          </p>
          <h3 className="mt-3 text-xl font-semibold text-white">
            Air Quality & Respiratory Health
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            A focused platform for monitoring environmental conditions and supporting respiratory risk awareness.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:min-w-[420px] lg:grid-cols-3">
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              Technology Stack
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>Next.js</li>
              <li>Tailwind CSS</li>
              <li>TypeScript</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              Data Sources
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>AQI feeds</li>
              <li>Weather APIs</li>
              <li>Sensor networks</li>
            </ul>
          </div>

          <div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-600 hover:text-white"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-6xl flex-col gap-3 border-t border-slate-800 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 Air Quality & Respiratory Health</span>
        <span>Built for enterprise monitoring workflows.</span>
      </div>
    </footer>
  );
}