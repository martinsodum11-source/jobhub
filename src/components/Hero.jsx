import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Hero() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    const query = search.trim()

    if (!query) {
      navigate('/jobs')
      return
    }

    navigate(`/jobs?search=${encodeURIComponent(query)}`)
  }

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          {/* Eyebrow */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm font-medium text-slate-300 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            Your next opportunity starts here
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-7xl">
            Find work that
            <span className="block text-blue-500">
              moves your career forward.
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
            Discover opportunities from growing companies and established
            teams. Search for your next role, apply with confidence, and take
            the next step in your career.
          </p>

          {/* Search */}
          <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-slate-200/10 bg-white p-2 shadow-2xl shadow-black/20">
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex min-w-0 flex-1 items-center rounded-xl border border-transparent bg-slate-50 px-4 transition focus-within:border-blue-200 focus-within:bg-white">
                <svg
                  className="mr-3 h-5 w-5 shrink-0 text-slate-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path
                    strokeLinecap="round"
                    d="m20 20-4-4"
                  />
                </svg>

                <input
                  type="text"
                  placeholder="Job title, skill or keyword"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch()
                    }
                  }}
                  className="w-full bg-transparent py-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 sm:text-base"
                />
              </div>

              <button
                onClick={handleSearch}
                className="rounded-xl bg-blue-600 px-7 py-4 text-sm font-semibold text-white transition duration-200 hover:bg-blue-700 active:scale-[0.98] sm:px-9"
              >
                Search jobs
              </button>
            </div>
          </div>

          {/* Popular searches */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="text-slate-500">Popular:</span>

            {['React Developer', 'UI/UX Designer', 'Backend Developer'].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => {
                    setSearch(item)
                    navigate(`/jobs?search=${encodeURIComponent(item)}`)
                  }}
                  className="rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-slate-400 transition hover:border-slate-700 hover:bg-slate-900 hover:text-white"
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>

        {/* Trust / platform stats */}
        <div className="mx-auto mt-20 max-w-5xl border-t border-slate-800 pt-10">
          <div className="grid grid-cols-2 divide-x divide-slate-800 md:grid-cols-4">
            <div className="px-4 text-center">
              <p className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                10K+
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-wider text-slate-500 sm:text-sm">
                Job opportunities
              </p>
            </div>

            <div className="px-4 text-center">
              <p className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                2K+
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-wider text-slate-500 sm:text-sm">
                Companies
              </p>
            </div>

            <div className="mt-8 border-l-0 px-4 text-center md:mt-0 md:border-l md:border-slate-800">
              <p className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                50+
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-wider text-slate-500 sm:text-sm">
                Career categories
              </p>
            </div>

            <div className="mt-8 px-4 text-center md:mt-0">
              <p className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                24/7
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-wider text-slate-500 sm:text-sm">
                New opportunities
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero