import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import JobCard from '../components/JobCard'
import { getJobs } from '../api/jobsApi'

const jobTypes = [
  'All',
  'Full-time',
  'Part-time',
  'Contract',
  'Internship',
]

const locations = [
  'All',
  'Remote',
  'Lagos, Nigeria',
  'Abuja, Nigeria',
]

const categories = [
  'All',
  'Frontend Development',
  'Backend Development',
  'Design',
  'Mobile Development',
  'Data Science',
  'DevOps',
]

function Jobs({ savedJobs = [], toggleSaveJob }) {
  const [searchParams, setSearchParams] = useSearchParams()

  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [search, setSearch] = useState(
    searchParams.get('search') || ''
  )

  const [type, setType] = useState(
    searchParams.get('type') || 'All'
  )

  const [location, setLocation] = useState(
    searchParams.get('location') || 'All'
  )

  const [category, setCategory] = useState(
    searchParams.get('category') || 'All'
  )

  const [sortBy, setSortBy] = useState('Newest')

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true)
        setError('')

        const data = await getJobs()

        setJobs(Array.isArray(data) ? data : [])
      } catch (error) {
        setError('Unable to load jobs right now.')
      } finally {
        setLoading(false)
      }
    }

    loadJobs()
  }, [])

  const updateFilters = (newFilters) => {
    const filters = {
      search,
      type,
      location,
      category,
      ...newFilters,
    }

    const params = {}

    if (filters.search.trim()) {
      params.search = filters.search.trim()
    }

    if (filters.type !== 'All') {
      params.type = filters.type
    }

    if (filters.location !== 'All') {
      params.location = filters.location
    }

    if (filters.category !== 'All') {
      params.category = filters.category
    }

    setSearchParams(params)
  }

  const clearFilters = () => {
    setSearch('')
    setType('All')
    setLocation('All')
    setCategory('All')
    setSearchParams({})
  }

  const filteredJobs = useMemo(() => {
    const searchText = search.trim().toLowerCase()

    const results = jobs.filter((job) => {
      const title = job.title?.toLowerCase() || ''
      const company = job.company?.toLowerCase() || ''
      const skills = Array.isArray(job.skills)
        ? job.skills
        : []

      const matchesSearch =
        !searchText ||
        title.includes(searchText) ||
        company.includes(searchText) ||
        skills.some((skill) =>
          skill.toLowerCase().includes(searchText)
        )

      const matchesType =
        type === 'All' || job.type === type

      const matchesLocation =
        location === 'All' || job.location === location

      const matchesCategory =
        category === 'All' || job.category === category

      return (
        matchesSearch &&
        matchesType &&
        matchesLocation &&
        matchesCategory
      )
    })

    if (sortBy === 'Newest') {
      return [...results].reverse()
    }

    if (sortBy === 'Oldest') {
      return [...results]
    }

    if (sortBy === 'Title') {
      return [...results].sort((a, b) =>
        (a.title || '').localeCompare(b.title || '')
      )
    }

    return results
  }, [
    jobs,
    search,
    type,
    location,
    category,
    sortBy,
  ])

  const hasActiveFilters =
    search.trim() ||
    type !== 'All' ||
    location !== 'All' ||
    category !== 'All'

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Page header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />

              <span className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-600">
                Job marketplace
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Find your next opportunity
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
              Search thousands of opportunities and find a role
              that matches your skills, experience, and career goals.
            </p>
          </div>
        </div>
      </section>

      {/* Search + filters */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <div className="-mt-1 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/40 sm:p-5">
            {/* Search */}
            <div className="flex flex-col gap-3 lg:flex-row">
              <div className="flex min-w-0 flex-1 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50">
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
                  value={search}
                  onChange={(e) => {
                    const value = e.target.value

                    setSearch(value)

                    updateFilters({
                      search: value,
                    })
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      updateFilters({ search })
                    }
                  }}
                  placeholder="Search by job title, company or skill..."
                  className="w-full bg-transparent py-3.5 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>

              <button
                type="button"
                onClick={() => updateFilters({ search })}
                className="rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Search jobs
              </button>
            </div>

            {/* Filter controls */}
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label
                  htmlFor="job-type"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  Job type
                </label>

                <select
                  id="job-type"
                  value={type}
                  onChange={(e) => {
                    const value = e.target.value

                    setType(value)

                    updateFilters({
                      type: value,
                    })
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                >
                  {jobTypes.map((item) => (
                    <option key={item} value={item}>
                      {item === 'All' ? 'All job types' : item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="job-location"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  Location
                </label>

                <select
                  id="job-location"
                  value={location}
                  onChange={(e) => {
                    const value = e.target.value

                    setLocation(value)

                    updateFilters({
                      location: value,
                    })
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                >
                  {locations.map((item) => (
                    <option key={item} value={item}>
                      {item === 'All'
                        ? 'All locations'
                        : item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="job-category"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  Category
                </label>

                <select
                  id="job-category"
                  value={category}
                  onChange={(e) => {
                    const value = e.target.value

                    setCategory(value)

                    updateFilters({
                      category: value,
                    })
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item === 'All'
                        ? 'All categories'
                        : item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="sort-jobs"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  Sort by
                </label>

                <select
                  id="sort-jobs"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                >
                  <option value="Newest">Newest</option>
                  <option value="Oldest">Oldest</option>
                  <option value="Title">Job title</option>
                </select>
              </div>
            </div>

            {/* Active filters */}
            {hasActiveFilters && (
              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
                <span className="mr-1 text-xs font-medium text-slate-500">
                  Active filters:
                </span>

                {search.trim() && (
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    {search}
                  </span>
                )}

                {type !== 'All' && (
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    {type}
                  </span>
                )}

                {location !== 'All' && (
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    {location}
                  </span>
                )}

                {category !== 'All' && (
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    {category}
                  </span>
                )}

                <button
                  type="button"
                  onClick={clearFilters}
                  className="ml-1 text-xs font-semibold text-slate-500 underline underline-offset-2 transition hover:text-slate-900"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Results header */}
        {!loading && !error && (
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-950">
                {filteredJobs.length}{' '}
                {filteredJobs.length === 1 ? 'job' : 'jobs'} found
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Browse opportunities that match your search.
              </p>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="w-fit text-sm font-semibold text-blue-600 transition hover:text-blue-700"
              >
                Reset filters
              </button>
            )}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-64 animate-pulse rounded-2xl border border-slate-200 bg-white"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-100 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4M12 16h.01"
                />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-900">
              We couldn't load the jobs
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {error}
            </p>
          </div>
        )}

        {/* Jobs */}
        {!loading &&
          !error &&
          filteredJobs.length > 0 && (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.map((job) => {
                const isSaved = savedJobs.some(
                  (savedJob) =>
                    savedJob._id === job._id
                )

                return (
                  <JobCard
                    key={job._id}
                    job={job}
                    isSaved={isSaved}
                    toggleSaveJob={toggleSaveJob}
                  />
                )
              })}
            </div>
          )}

        {/* Empty state */}
        {!loading &&
          !error &&
          filteredJobs.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path
                    strokeLinecap="round"
                    d="m20 20-4-4"
                  />
                </svg>
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-950">
                No jobs match your search
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Try changing your search terms or removing some
                filters to see more opportunities.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
              >
                Clear all filters
              </button>
            </div>
          )}
      </section>
    </main>
  )
}

export default Jobs