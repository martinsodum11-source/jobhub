import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import JobCard from './JobCard'
import { getJobs } from '../api/jobsApi'

function FeaturedJobs({ savedJobs = [], toggleSaveJob }) {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setError('')
        const data = await getJobs()

        setJobs(Array.isArray(data) ? data.slice(0, 6) : [])
      } catch (error) {
        setError('Unable to load jobs right now.')
      } finally {
        setLoading(false)
      }
    }

    loadJobs()
  }, [])

  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              <span className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-600">
                Featured opportunities
              </span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Explore roles worth your attention
            </h2>

            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
              Discover recently posted opportunities from companies looking
              for talented people like you.
            </p>
          </div>

          <Link
            to="/jobs"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
          >
            View all jobs
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M13 6l6 6-6 6"
              />
            </svg>
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-64 animate-pulse rounded-2xl border border-slate-200 bg-slate-50"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-100 bg-red-50 px-6 py-10 text-center">
            <p className="font-semibold text-red-700">{error}</p>
            <p className="mt-2 text-sm text-red-500">
              Please try again in a moment.
            </p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && jobs.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-14 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200">
              <svg
                className="h-5 w-5 text-slate-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2"
                />
                <path
                  strokeLinecap="round"
                  d="M8 5V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1M3 10h18"
                />
              </svg>
            </div>

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              No featured jobs yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Check back soon for new opportunities.
            </p>
          </div>
        )}

        {/* Jobs */}
        {!loading && !error && jobs.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                isSaved={savedJobs.some(
                  (savedJob) => savedJob._id === job._id
                )}
                toggleSaveJob={toggleSaveJob}
              />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        {!loading && !error && jobs.length > 0 && (
          <div className="mt-10 text-center">
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
            >
              Browse all available jobs
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14M13 6l6 6-6 6"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturedJobs