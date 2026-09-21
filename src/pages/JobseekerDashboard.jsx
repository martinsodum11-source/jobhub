import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const API_URL =
  import.meta.env.VITE_API_URL ||
  'http://localhost:5000/api'

function JobseekerDashboard({ savedJobs = [] }) {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const user = JSON.parse(
    localStorage.getItem('user') || '{}'
  )

  const token = localStorage.getItem('token')

  useEffect(() => {
    const loadApplications = async () => {
      try {
        setLoading(true)
        setError('')

        if (!token) {
          throw new Error('You must be logged in.')
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

        setApplications(data)
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
  }, [token])

  const pendingApplications = applications.filter(
    (application) =>
      application.status === 'Pending'
  ).length

  const acceptedApplications = applications.filter(
    (application) =>
      application.status === 'Accepted'
  ).length

  const rejectedApplications = applications.filter(
    (application) =>
      application.status === 'Rejected'
  ).length

  const reviewedApplications = applications.filter(
    (application) =>
      application.status === 'Reviewed'
  ).length

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Accepted':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200'

      case 'Rejected':
        return 'bg-red-50 text-red-700 border-red-200'

      case 'Reviewed':
        return 'bg-blue-50 text-blue-700 border-blue-200'

      default:
        return 'bg-amber-50 text-amber-700 border-amber-200'
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

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-8 w-64 rounded-lg bg-slate-200" />
          <div className="mt-3 h-5 w-96 max-w-full rounded-lg bg-slate-200" />

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-32 rounded-2xl border border-slate-200 bg-white"
              />
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="h-96 rounded-2xl bg-white lg:col-span-2" />
            <div className="h-96 rounded-2xl bg-white" />
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">

        {/* Page Header */}
        <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-blue-600">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              Jobseeker Dashboard
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Welcome back
              {user.name ? `, ${user.name}` : ''}
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Keep track of your applications, manage saved jobs,
              and discover your next career opportunity.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/my-applications"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              My Applications
            </Link>

            <Link
              to="/jobs"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Browse Jobs
            </Link>
          </div>
        </section>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Stats */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Total Applications */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect
                    x="4"
                    y="4"
                    width="16"
                    height="16"
                    rx="2"
                  />
                  <path d="M8 9h8M8 13h5M8 17h3" />
                </svg>
              </div>

              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Total
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Applications
            </p>

            <p className="mt-1 text-3xl font-bold text-slate-900">
              {applications.length}
            </p>
          </div>

          {/* Pending */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="12" r="8" />
                  <path d="M12 8v4l2.5 2" />
                </svg>
              </div>

              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Waiting
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Pending
            </p>

            <p className="mt-1 text-3xl font-bold text-slate-900">
              {pendingApplications}
            </p>
          </div>

          {/* Accepted */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="12" r="8" />
                  <path d="m8.5 12 2.3 2.3 4.7-5" />
                </svg>
              </div>

              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Success
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Accepted
            </p>

            <p className="mt-1 text-3xl font-bold text-slate-900">
              {acceptedApplications}
            </p>
          </div>

          {/* Saved */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M6 4.5A2.5 2.5 0 0 1 8.5 2h7A2.5 2.5 0 0 1 18 4.5V21l-6-3-6 3V4.5Z" />
                </svg>
              </div>

              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Saved
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Saved Jobs
            </p>

            <p className="mt-1 text-3xl font-bold text-slate-900">
              {savedJobs.length}
            </p>
          </div>
        </section>

        {/* Secondary Stats */}
        <div className="mt-4 flex flex-wrap gap-3">
          <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-500">
            {reviewedApplications} reviewed
          </div>

          <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-500">
            {rejectedApplications} rejected
          </div>

          <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-500">
            {applications.length} total applications
          </div>
        </div>

        {/* Main Content */}
        <section className="mt-8 grid gap-6 xl:grid-cols-3">

          {/* Recent Applications */}
          <div className="xl:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  Your activity
                </p>

                <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                  Recent Applications
                </h2>
              </div>

              <Link
                to="/my-applications"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                View all
              </Link>
            </div>

            {applications.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <rect
                      x="4"
                      y="5"
                      width="16"
                      height="15"
                      rx="2"
                    />
                    <path d="M8 5V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1M8 10h8M8 14h5" />
                  </svg>
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  No applications yet
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Start exploring available opportunities and
                  submit your first application.
                </p>

                <Link
                  to="/jobs"
                  className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Browse Jobs
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {applications.slice(0, 5).map(
                  (application) => (
                    <div
                      key={application._id}
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div className="flex min-w-0 items-center gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg font-bold text-blue-600">
                            {application.job?.company
                              ?.charAt(0)
                              ?.toUpperCase() || 'J'}
                          </div>

                          <div className="min-w-0">
                            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                              Application
                            </p>

                            <h3 className="mt-1 truncate text-base font-bold text-slate-900">
                              {application.job?.title ||
                                'Job unavailable'}
                            </h3>

                            <p className="mt-1 truncate text-sm text-slate-500">
                              {application.job?.company ||
                                'Company unavailable'}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                              application.status
                            )}`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${getStatusDot(
                                application.status
                              )}`}
                            />

                            {application.status ||
                              'Pending'}
                          </span>

                          {application.job?._id && (
                            <Link
                              to={`/jobs/${application.job._id}`}
                              className="hidden rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 sm:block"
                            >
                              View
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">

            {/* Profile Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-lg font-bold text-white">
                  {user.name
                    ?.charAt(0)
                    ?.toUpperCase() || 'U'}
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-lg font-bold text-slate-900">
                    {user.name || 'Jobseeker'}
                  </h3>

                  <p className="mt-1 truncate text-sm text-slate-500">
                    {user.email || 'Your JobHub profile'}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-800">
                  Keep your profile ready
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  A complete profile can help employers understand
                  your experience and skills.
                </p>
              </div>
            </div>

            {/* Saved Jobs */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Your collection
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-slate-900">
                    Saved Jobs
                  </h3>
                </div>

                <span className="rounded-full bg-violet-50 px-3 py-1 text-sm font-bold text-violet-600">
                  {savedJobs.length}
                </span>
              </div>

              {savedJobs.length === 0 ? (
                <div className="mt-5 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm leading-6 text-slate-500">
                    You haven't saved any jobs yet.
                  </p>

                  <Link
                    to="/jobs"
                    className="mt-3 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Find jobs
                  </Link>
                </div>
              ) : (
                <div className="mt-5 space-y-3">
                  {savedJobs
                    .slice(0, 3)
                    .map((job) => (
                      <Link
                        key={job._id}
                        to={`/jobs/${job._id}`}
                        className="group block rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50/30"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-900">
                              {job.title}
                            </p>

                            <p className="mt-1 truncate text-xs text-slate-500">
                              {job.company}
                            </p>
                          </div>

                          <span className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600">
                            →
                          </span>
                        </div>
                      </Link>
                    ))}
                </div>
              )}

              <Link
                to="/saved"
                className="mt-5 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                View saved jobs
              </Link>
            </div>
          </div>
        </section>

        {/* Career CTA */}
        <section className="mt-8 overflow-hidden rounded-2xl border border-blue-100 bg-blue-600 p-6 text-white shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-blue-100">
                Keep moving forward
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                Find your next opportunity.
              </h2>

              <p className="mt-2 text-sm leading-6 text-blue-100">
                Explore new roles from companies looking for
                talented people like you.
              </p>
            </div>

            <Link
              to="/jobs"
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
            >
              Explore Jobs
            </Link>
          </div>
        </section>

      </div>
    </main>
  )
}

export default JobseekerDashboard