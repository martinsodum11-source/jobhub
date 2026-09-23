import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { API_URL } from '../api/config'

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
  const [searchParams] = useSearchParams()

  const initialSearch = searchParams.get('search') || ''
  const initialCategory =
    searchParams.get('category') || 'All'

  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [search, setSearch] = useState(initialSearch)
  const [category, setCategory] = useState(
    initialCategory
  )
  const [jobType, setJobType] = useState('All')
  const [location, setLocation] = useState('All')
  const [sortBy, setSortBy] = useState('Newest')

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(
          `${API_URL}/jobs`
        )

        if (!response.ok) {
          throw new Error(
            'Failed to load jobs'
          )
        }

        const data = await response.json()

        setJobs(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error(
          'Failed to fetch jobs:',
          error
        )

        setError(
          'Unable to load jobs right now. Please try again.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  const filteredJobs = useMemo(() => {
    let result = [...jobs]

    const searchValue =
      search.trim().toLowerCase()

    if (searchValue) {
      result = result.filter((job) => {
        const title =
          job.title?.toLowerCase() || ''

        const company =
          job.company?.toLowerCase() || ''

        const jobLocation =
          job.location?.toLowerCase() || ''

        const description =
          job.description?.toLowerCase() || ''

        const skills = Array.isArray(job.skills)
          ? job.skills
              .join(' ')
              .toLowerCase()
          : ''

        return (
          title.includes(searchValue) ||
          company.includes(searchValue) ||
          jobLocation.includes(searchValue) ||
          description.includes(searchValue) ||
          skills.includes(searchValue)
        )
      })
    }

    if (category !== 'All') {
      result = result.filter(
        (job) =>
          job.category === category
      )
    }

    if (jobType !== 'All') {
      result = result.filter(
        (job) => job.type === jobType
      )
    }

    if (location !== 'All') {
      result = result.filter((job) => {
        const jobLocation =
          job.location?.toLowerCase() || ''

        if (location === 'Remote') {
          return jobLocation.includes('remote')
        }

        return (
          jobLocation ===
          location.toLowerCase()
        )
      })
    }

    if (sortBy === 'Newest') {
      result.sort((a, b) => {
        const dateA = new Date(
          a.createdAt || 0
        ).getTime()

        const dateB = new Date(
          b.createdAt || 0
        ).getTime()

        return dateB - dateA
      })
    }

    if (sortBy === 'Oldest') {
      result.sort((a, b) => {
        const dateA = new Date(
          a.createdAt || 0
        ).getTime()

        const dateB = new Date(
          b.createdAt || 0
        ).getTime()

        return dateA - dateB
      })
    }

    if (sortBy === 'Salary') {
      result.sort((a, b) => {
        const salaryA =
          a.salary?.match(
            /[\d,]+/
          )?.[0] || '0'

        const salaryB =
          b.salary?.match(
            /[\d,]+/
          )?.[0] || '0'

        const numberA = Number(
          salaryA.replace(/,/g, '')
        )

        const numberB = Number(
          salaryB.replace(/,/g, '')
        )

        return numberB - numberA
      })
    }

    return result
  }, [
    jobs,
    search,
    category,
    jobType,
    location,
    sortBy,
  ])

  const isSaved = (job) => {
    return savedJobs.some(
      (savedJob) =>
        savedJob._id === job._id
    )
  }

  const clearFilters = () => {
    setSearch('')
    setCategory('All')
    setJobType('All')
    setLocation('All')
    setSortBy('Newest')
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Job marketplace
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Find your next opportunity
            </h1>

            <p className="mt-4 text-lg leading-8 text-slate-600">
              Explore opportunities from
              companies looking for talented
              people like you.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 lg:flex-row">
            <div className="flex flex-1 items-center rounded-xl border border-slate-200 bg-white px-4">
              <svg
                className="mr-3 h-5 w-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                />
              </svg>

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search jobs, companies or skills"
                className="w-full bg-transparent py-3 text-sm text-slate-900 outline-none"
              />
            </div>

            <select
              value={location}
              onChange={(event) =>
                setLocation(
                  event.target.value
                )
              }
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500"
            >
              {locations.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item === 'All'
                    ? 'All locations'
                    : item}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => {}}
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">
                Filters
              </h2>

              <button
                type="button"
                onClick={clearFilters}
                className="text-xs font-medium text-blue-600 hover:text-blue-700"
              >
                Clear
              </button>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Category
              </label>

              <select
                value={category}
                onChange={(event) =>
                  setCategory(
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500"
              >
                {categories.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Job type
              </label>

              <select
                value={jobType}
                onChange={(event) =>
                  setJobType(
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500"
              >
                {jobTypes.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Location
              </label>

              <select
                value={location}
                onChange={(event) =>
                  setLocation(
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500"
              >
                {locations.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </aside>

          <div>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {loading
                    ? 'Loading jobs...'
                    : `${filteredJobs.length} ${
                        filteredJobs.length === 1
                          ? 'job'
                          : 'jobs'
                      } found`}
                </p>
              </div>

              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(
                    event.target.value
                  )
                }
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500"
              >
                <option value="Newest">
                  Newest
                </option>
                <option value="Oldest">
                  Oldest
                </option>
                <option value="Salary">
                  Highest salary
                </option>
              </select>
            </div>

            {loading && (
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-52 animate-pulse rounded-2xl border border-slate-200 bg-white"
                  />
                ))}
              </div>
            )}

            {!loading && error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
                <h2 className="font-semibold text-red-900">
                  Something went wrong
                </h2>

                <p className="mt-2 text-sm text-red-700">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    window.location.reload()
                  }
                  className="mt-5 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
                >
                  Try again
                </button>
              </div>
            )}

            {!loading &&
              !error &&
              filteredJobs.length === 0 && (
                <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                    <svg
                      className="h-7 w-7 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                      />
                    </svg>
                  </div>

                  <h2 className="mt-5 text-lg font-semibold text-slate-900">
                    No jobs found
                  </h2>

                  <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                    Try changing your search or
                    clearing some filters.
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Clear filters
                  </button>
                </div>
              )}

            {!loading &&
              !error &&
              filteredJobs.length > 0 && (
                <div className="space-y-4">
                  {filteredJobs.map((job) => (
                    <article
                      key={job._id}
                      className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/60"
                    >
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
                          {job.company
                            ?.charAt(0)
                            ?.toUpperCase() ||
                            'J'}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <Link
                                to={`/jobs/${job._id}`}
                                className="text-xl font-semibold text-slate-900 transition hover:text-blue-600"
                              >
                                {job.title}
                              </Link>

                              <p className="mt-1 font-medium text-slate-600">
                                {job.company}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                toggleSaveJob?.(
                                  job
                                )
                              }
                              className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
                                isSaved(job)
                                  ? 'border-blue-200 bg-blue-50 text-blue-600'
                                  : 'border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-600'
                              }`}
                            >
                              {isSaved(job)
                                ? 'Saved'
                                : 'Save'}
                            </button>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                            <span>
                              {job.location ||
                                'Location not specified'}
                            </span>

                            <span>
                              {job.type ||
                                'Job type not specified'}
                            </span>

                            <span>
                              {job.experience ||
                                'Experience not specified'}
                            </span>

                            {job.salary && (
                              <span className="font-medium text-slate-700">
                                {job.salary}
                              </span>
                            )}
                          </div>

                          {Array.isArray(
                            job.skills
                          ) &&
                            job.skills.length >
                              0 && (
                              <div className="mt-4 flex flex-wrap gap-2">
                                {job.skills
                                  .slice(0, 5)
                                  .map(
                                    (skill) => (
                                      <span
                                        key={skill}
                                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                                      >
                                        {skill}
                                      </span>
                                    )
                                  )}
                              </div>
                            )}

                          <div className="mt-5 flex items-center justify-between">
                            <span className="text-xs text-slate-400">
                              {job.posted ||
                                'Recently posted'}
                            </span>

                            <Link
                              to={`/jobs/${job._id}`}
                              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                            >
                              View job →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Jobs