import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Hero() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    navigate(`/jobs?search=${encodeURIComponent(search)}`)
  }

  return (
    <section className="bg-slate-950 px-6 py-24 text-white">

      <div className="mx-auto max-w-6xl">

        <div className="mx-auto max-w-4xl text-center">

          <div className="mb-6 inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
            🚀 Discover your next opportunity
          </div>

          <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            Find a Job That
            <span className="text-blue-500">
              {' '}Moves You Forward
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Search thousands of opportunities from companies
            around the world and find the role that's right for you.
          </p>

          {/* Search */}
          <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-3 rounded-xl bg-white p-2 sm:flex-row">

            <input
              type="text"
              placeholder="Job title, skill or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch()
                }
              }}
              className="min-w-0 flex-1 rounded-lg px-4 py-3 text-slate-900 outline-none"
            />

            <button
              onClick={handleSearch}
              className="rounded-lg bg-blue-600 px-8 py-3 font-semibold transition hover:bg-blue-700"
            >
              Search Jobs
            </button>

          </div>

          <p className="mt-4 text-sm text-slate-500">
            Try searching: React, Designer, Backend Developer
          </p>

        </div>

        {/* Stats */}
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-6 border-t border-slate-800 pt-10 md:grid-cols-4">

          <div className="text-center">
            <p className="text-3xl font-bold">
              10K+
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Jobs
            </p>
          </div>

          <div className="text-center">
            <p className="text-3xl font-bold">
              2K+
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Companies
            </p>
          </div>

          <div className="text-center">
            <p className="text-3xl font-bold">
              50+
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Categories
            </p>
          </div>

          <div className="text-center">
            <p className="text-3xl font-bold">
              24/7
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Opportunities
            </p>
          </div>

        </div>

      </div>

    </section>
  )
}

export default Hero