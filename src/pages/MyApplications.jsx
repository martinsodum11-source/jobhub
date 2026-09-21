import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const API_URL =
  import.meta.env.VITE_API_URL ||
  'http://localhost:5000/api'

function MyApplications() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const token = localStorage.getItem('token')

        if (!token) {
          throw new Error(
            'You must be logged in to view your applications.'
          )
        }

        const response = await fetch(
          `${API_URL}/my-applications`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data.message ||
              'Failed to load your applications'
          )
        }

        setApplications(Array.isArray(data) ? data : [])
      } catch (error) {
        setError(
          error.message ||
            'Failed to load your applications'
        )
      } finally {
        setLoading(false)
      }
    }

    loadApplications()
  }, [])

  const getStatusClasses = (status) => {
    switch (status) {
      case 'Accepted':
        return 'border-emerald-200 bg-emerald-50 text-emerald-700'

      case 'Rejected':
        return 'border-red-200 bg-red-50 text-red-700'

      case 'Reviewed':
        return 'border-blue-200 bg-blue-50 text-blue-700'

      default:
        return 'border-amber-200 bg-amber-50 text-amber-700'
    }
  }

  const getStatusDot = (status) => {
    switch (status) {
      case 'Accepted':
        return 'bg-emerald-500'

      case 'Rejected':
        return 'bg-red-500'

      case 'Reviewed':
        return 'bg-blue-500'

      default:
        return 'bg-amber-500'
    }
  }

  const filteredApplications = useMemo(() => {
    if (filter === 'All') {
      return applications
    }

    return applications.filter(
      (application) => application.status === filter
    )
  }, [applications, filter])

  const stats = useMemo(() => {
    return {
      total: applications.length,
      pending: applications.filter(
        (application) =>
          application.status === 'Pending'
      ).length,
      reviewed: applications.filter(
        (application) =>
          application.status === 'Reviewed'
      ).length,
      accepted: applications.filter(
        (application) =>
          application.status === 'Accepted'
      ).length,
    }
  }, [applications])

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-4 w-32 rounded bg-slate-200" />

            <div className="mt-5 h-10 w-72 rounded bg-slate-200" />

            <div className="mt-3 h-5 w-96 max-w-full rounded bg-slate-200" />

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-28 rounded-2xl bg-white"
                />
              ))}
            </div>

            <div className="mt-10 space-y-5">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-56 rounded-2xl bg-white"
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">

        {/* Page Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Jobseeker dashboard
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              My Applications
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
              Keep track of your applications, monitor their progress,
              and stay up to date with your job search.
            </p>
          </div>

          <Link
            to="/jobs"
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
          >
            Browse jobs

            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14m-6-6 6 6-6 6"
              />
            </svg>
          </Link>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5">
            <div className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                  />
                  <path
                    strokeLinecap="round"
                    d="M12 8v4m0 4h.01"
                  />
                </svg>
              </div>

              <div>
                <h2 className="font-semibold text-red-900">
                  Unable to load applications
                </h2>

                <p className="mt-1 text-sm leading-6 text-red-700">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        {!error && (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  Total applications
                </p>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
                    />
                    <path
                      strokeLinecap="round"
                      d="M8 8h8M8 12h8M8 16h5"
                    />
                  </svg>
                </div>
              </div>

              <p className="mt-4 text-3xl font-bold text-slate-950">
                {stats.total}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  Pending
                </p>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                    />
                    <path
                      strokeLinecap="round"
                      d="M12 7v5l3 2"
                    />
                  </svg>
                </div>
              </div>

              <p className="mt-4 text-3xl font-bold text-slate-950">
                {stats.pending}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  Reviewed
                </p>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m5 12 4 4L19 6"
                    />
                  </svg>
                </div>
              </div>

              <p className="mt-4 text-3xl font-bold text-slate-950">
                {stats.reviewed}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  Accepted
                </p>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m5 12 4 4L19 6"
                    />
                  </svg>
                </div>
              </div>

              <p className="mt-4 text-3xl font-bold text-slate-950">
                {stats.accepted}
              </p>
            </div>
          </div>
        )}

        {/* Applications */}
        {!error && applications.length > 0 && (
          <section className="mt-10">
            <div className="flex flex-col gap-5 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-950">
                  Your applications
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {filteredApplications.length} application
                  {filteredApplications.length !== 1 ? 's' : ''} shown
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  'All',
                  'Pending',
                  'Reviewed',
                  'Accepted',
                  'Rejected',
                ].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setFilter(status)}
                    className={`rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                      filter === status
                        ? 'bg-slate-950 text-white'
                        : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-950'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {filteredApplications.length === 0 && (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-10 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                  <svg
                    className="h-7 w-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
                    />
                    <path
                      strokeLinecap="round"
                      d="M8 8h8M8 12h6"
                    />
                  </svg>
                </div>

                <h3 className="mt-5 text-lg font-semibold text-slate-950">
                  No {filter.toLowerCase()} applications
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  There are no applications with this status yet.
                </p>
              </div>
            )}

            <div className="mt-6 space-y-5">
              {filteredApplications.map((application) => {
                const job = application.job

                return (
                  <article
                    key={application._id}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-slate-300 hover:shadow-md"
                  >
                    <div className="p-6 sm:p-7">
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex gap-4">
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl font-bold text-blue-600">
                            {job?.company
                              ?.charAt(0)
                              ?.toUpperCase() || 'J'}
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-blue-600">
                              {job?.company || 'Unknown company'}
                            </p>

                            <h3 className="mt-1 text-xl font-bold tracking-tight text-slate-950">
                              {job?.title || 'Unknown job'}
                            </h3>

                            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                              <span className="inline-flex items-center gap-2">
                                <svg
                                  className="h-4 w-4"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.8"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z"
                                  />
                                  <circle
                                    cx="12"
                                    cy="10"
                                    r="2.2"
                                  />
                                </svg>

                                {job?.location || 'Unknown location'}
                              </span>

                              <span className="inline-flex items-center gap-2">
                                <svg
                                  className="h-4 w-4"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.8"
                                >
                                  <rect
                                    x="3"
                                    y="7"
                                    width="18"
                                    height="13"
                                    rx="2"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8 7V5h8v2M3 12h18"
                                  />
                                </svg>

                                {job?.type || 'Unknown type'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <span
                          className={`inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold ${getStatusClasses(
                            application.status
                          )}`}
                        >
                          <span
                            className={`h-2 w-2 rounded-full ${getStatusDot(
                              application.status
                            )}`}
                          />

                          {application.status || 'Pending'}
                        </span>
                      </div>

                      <div className="mt-7 grid gap-5 border-t border-slate-100 pt-6 sm:grid-cols-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Applied
                          </p>

                          <p className="mt-1.5 text-sm font-medium text-slate-900">
                            {application.createdAt
                              ? new Date(
                                  application.createdAt
                                ).toLocaleDateString(
                                  'en-US',
                                  {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                  }
                                )
                              : 'Not available'}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Applicant
                          </p>

                          <p className="mt-1.5 text-sm font-medium text-slate-900">
                            {application.fullName || 'Not available'}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Email
                          </p>

                          <p className="mt-1.5 truncate text-sm font-medium text-slate-900">
                            {application.email || 'Not available'}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 rounded-xl bg-slate-50 p-5">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Cover letter
                        </p>

                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                          {application.coverLetter ||
                            'No cover letter provided.'}
                        </p>
                      </div>

                      <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-wrap gap-3">
                          {application.resume && (
                            <a
                              href={application.resume}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                            >
                              <svg
                                className="h-4 w-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14 3v6h6"
                                />
                              </svg>

                              View resume
                            </a>
                          )}

                          {job?._id && (
                            <Link
                              to={`/jobs/${job._id}`}
                              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                            >
                              View job

                              <svg
                                className="h-4 w-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 12h14m-6-6 6 6-6 6"
                                />
                              </svg>
                            </Link>
                          )}
                        </div>

                        <span className="text-xs text-slate-400">
                          Application ID: {application._id?.slice(-8)}
                        </span>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
        )}

        {/* Empty state */}
        {!error && applications.length === 0 && (
          <section className="mt-10 rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <svg
                className="h-8 w-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 8h8M8 12h8M8 16h5"
                />
              </svg>
            </div>

            <h2 className="mt-6 text-2xl font-bold tracking-tight text-slate-950">
              Start your job search
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
              You haven't submitted any applications yet. Explore available
              opportunities and find a role that matches your skills.
            </p>

            <Link
              to="/jobs"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Explore available jobs

              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14m-6-6 6 6-6 6"
                />
              </svg>
            </Link>
          </section>
        )}
      </div>
    </main>
  )
}

export default MyApplications