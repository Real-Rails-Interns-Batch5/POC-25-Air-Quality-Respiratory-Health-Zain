export default function StatsCards() {
  const cards = [
    {
      title: 'AQI',
      value: '72',
      subtitle: 'Good',
      change: '+6.2%',
      icon: (
        <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v2m0 16v2M4.93 4.93l1.414 1.414M17.657 17.657l1.414 1.414M2 12h2m16 0h2M4.93 19.07l1.414-1.414M17.657 6.343l1.414-1.414" />
        </svg>
      ),
    },
    {
      title: 'PM2.5',
      value: '12 µg/m³',
      subtitle: 'Low',
      change: '-3.1%',
      icon: (
        <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v6a9 9 0 009 9h0a9 9 0 009-9V7" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 3v4M8 3v4" />
        </svg>
      ),
    },
    {
      title: 'Respiratory Risk',
      value: 'Moderate',
      subtitle: 'Population at risk',
      change: '+1.8%',
      icon: (
        <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.567 3-3.5S13.657 4 12 4 9 5.567 9 7.5 10.343 11 12 11z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 21c0-3.866 3.582-7 8-7s8 3.134 8 7" />
        </svg>
      ),
    },
    {
      title: 'Weather',
      value: '22°C • Clear',
      subtitle: 'Light breeze',
      change: '+0.4%',
      icon: (
        <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2m0 14v2m8.485-10.485l-1.414 1.414M4.929 19.071l-1.414-1.414M21 12h-2M5 12H3m15.071 6.071l-1.414-1.414M6.343 6.343L4.93 4.93" />
          <circle cx="12" cy="12" r="3" className="fill-current text-yellow-400" />
        </svg>
      ),
    },
  ];

  return (
    <section className="p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c) => (
            <div
              key={c.title}
              className="relative bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-white to-gray-50 rounded-md shadow-sm">{c.icon}</div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">{c.title}</p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-gray-100">{c.value}</p>
                    <p className="text-sm text-gray-400 mt-1">{c.subtitle}</p>
                  </div>
                </div>
                <div className={`flex flex-col items-end justify-center`}> 
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${c.change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {c.change}
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-3 left-5 right-5 h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}