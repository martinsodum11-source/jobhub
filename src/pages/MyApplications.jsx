import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const API_URL =
  import.meta.env.VITE_API_URL ||
  'https://jobhub-xgkf.onrender.com/api'

function MyApplications() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true)
        setError('')

        const token = localStorage.getItem('token')

        if (!token) {
          setError('Please log in to view your applications.')
          return
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
              'Failed to fetch applications'
          )
        }

        setApplications(
          Array.isArray(data)
            ? data
            : data.applications || []
        )
      } catch (error) {
        setError(
          error.message ||
            'Failed to fetch applications'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [])

  const filteredApplications = useMemo(() => {
    if (filter === 'All') {
      return applications
    }

    return applications.filter(
      (application) =>
        application.status === filter
    )
  }, [applications, filter])

  const stats = useMemo(() => {
    return {
      total: applications.length,
      pending: applications.filter(
        (application) =>
          application.status === 'pending'
      ).length,
      reviewed: applications.filter(
        (application) =>
          application.status === 'reviewed'
      ).length,
      accepted: applications.filter(
        (application) =>
          application.status === 'accepted'
      ).length,
    }
  }, [applications])

  const getStatusStyles = (status) => {
    switch (status) {
      case 'accepted':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200'

      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-200'

      case 'reviewed':
        return 'bg-blue-50 text-blue-700 border-blue-200'

      default:
        return 'bg-amber-50 text-amber-700 border-amber-200'
    }
  }

  const formatStatus = (status) => {
    if (!status) {
      return 'Pending'
    }

    return status.charAt(0).toUpperCase() +
      status.slice(1)
  }

  const formatDate = (date) => {
    if (!date) {
      return 'Recently'
    }

    return new Date(date).toLocaleDateString(
      'en-US',
      {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }
    )
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
                Jobseeker workspace
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                My applications
              </h1>

              <p className="mt-2 max-w-2xl text-slate-600">
                Track the jobs you've applied for and
                monitor your application progress.
              </p>
            </div>

            <Link
              to="/jobs"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Browse jobs
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Total applications
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {stats.total}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Pending
            </p>

            <p className="mt-2 text-3xl font-bold text-amber-600">
              {stats.pending}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Reviewed
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-600">
              {stats.reviewed}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Accepted
            </p>

            <p className="mt-2 text-3xl font-bold text-emerald-600">
              {stats.accepted}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Application history
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review the status of your applications.
            </p>
          </div>

          <select
            value={filter}
            onChange={(event) =>
              setFilter(event.target.value)
            }
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500"
          >
            <option value="All">All applications</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {loading && (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-slate-600">
              Loading your applications...
            </p>
          </div>
        )}

        {error && !loading && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          filteredApplications.length === 0 && (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-10 text-center">
              <h3 className="text-lg font-semibold text-slate-900">
                No applications found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                You haven't submitted any applications
                matching this filter yet.
              </p>

              <Link
                to="/jobs"
                className="mt-6 inline-flex rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Find jobs
              </Link>
            </div>
          )}

        {!loading &&
          !error &&
          filteredApplications.length > 0 && (
            <div className="mt-6 space-y-4">
              {filteredApplications.map(
                (application) => {
                  const job =
                    application.job || {}

                  return (
                    <article
                      key={application._id}
                      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                    >
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-600">
                            {job.company
                              ? job.company
                                  .charAt(0)
                                  .toUpperCase()
                              : 'J'}
                          </div>

                          <div>
                            <h3 className="text-lg font-bold text-slate-900">
                              {job.title ||
                                'Job application'}
                            </h3>

                            <p className="mt-1 text-sm font-medium text-slate-600">
                              {job.company ||
                                'Company'}
                            </p>

                            <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-500">
                              {job.location && (
                                <span>
                                  {job.location}
                                </span>
                              )}

                              {job.type && (
                                <span>
                                  • {job.type}
                                </span>
                              )}

                              <span>
                                • Applied{' '}
                                {formatDate(
                                  application.createdAt
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        <span
                          className={`inline-flex w-fit rounded-full border px-3 py-1.5 text-sm font-semibold ${getStatusStyles(
                            application.status
                          )}`}
                        >
                          {formatStatus(
                            application.status
                          )}
                        </span>
                      </div>

                      {application.coverLetter && (
                        <div className="mt-6 border-t border-slate-100 pt-5">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Cover letter
                          </p>

                          <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                            {application.coverLetter}
                          </p>
                        </div>
                      )}

                      <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-100 pt-5">
                        {job._id && (
                          <Link
                            to={`/jobs/${job._id}`}
                            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                          >
                            View job
                          </Link>
                        )}

                        {application.resume && (
                          <a
                            href={application.resume}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                          >
                            View resume
                          </a>
                        )}
                      </div>
                    </article>
                  )
                }
              )}
            </div>
          )}
      </section>
    </main>
  )
}

export default MyApplications