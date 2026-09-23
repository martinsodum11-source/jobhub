import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_URL } from '../api/config'

function EmployerDashboard() {
  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const token = localStorage.getItem('token')

  const user = JSON.parse(
    localStorage.getItem('user') || 'null'
  )

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError('')

      if (!token) {
        throw new Error(
          'You must be logged in to access the employer dashboard.'
        )
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      }

      const [
        jobsResponse,
        applicationsResponse,
      ] = await Promise.all([
        fetch(`${API_URL}/employer/jobs`, {
          headers,
        }),

        fetch(
          `${API_URL}/employer/applications`,
          {
            headers,
          }
        ),
      ])

      const jobsData =
        await jobsResponse.json()

      const applicationsData =
        await applicationsResponse.json()

      if (!jobsResponse.ok) {
        throw new Error(
          jobsData.message ||
            'Failed to load your jobs.'
        )
      }

      if (!applicationsResponse.ok) {
        throw new Error(
          applicationsData.message ||
            'Failed to load applications.'
        )
      }

      setJobs(
        Array.isArray(jobsData)
          ? jobsData
          : []
      )

      setApplications(
        Array.isArray(applicationsData)
          ? applicationsData
          : []
      )
    } catch (error) {
      setError(
        error.message ||
          'Failed to load dashboard data.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const pendingApplications =
    applications.filter(
      (application) =>
        application.status === 'Pending'
    ).length

  const acceptedApplications =
    applications.filter(
      (application) =>
        application.status === 'Accepted'
    ).length

  const reviewedApplications =
    applications.filter(
      (application) =>
        application.status === 'Reviewed'
    ).length

  const recentApplications =
    applications.slice(0, 5)

  const getStatusClasses = (status) => {
    if (status === 'Accepted') {
      return 'bg-emerald-50 text-emerald-700'
    }

    if (status === 'Rejected') {
      return 'bg-red-50 text-red-700'
    }

    if (status === 'Reviewed') {
      return 'bg-blue-50 text-blue-700'
    }

    return 'bg-amber-50 text-amber-700'
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
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <div className="flex flex-col gap-5 border-b border-slate-200 pb-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              Employer workspace
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              Welcome back
              {user?.name
                ? `, ${user.name}`
                : ''}
            </h1>

            <p className="mt-2 text-slate-600">
              Manage your job postings and review
              applicants from one place.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={fetchDashboardData}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Refresh
            </button>

            <Link
              to="/employer/post-job"
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Post a Job
            </Link>
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Active jobs
            </p>

            <p className="mt-4 text-3xl font-bold text-slate-900">
              {loading ? '—' : jobs.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Applications
            </p>

            <p className="mt-4 text-3xl font-bold text-slate-900">
              {loading
                ? '—'
                : applications.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Pending review
            </p>

            <p className="mt-4 text-3xl font-bold text-slate-900">
              {loading
                ? '—'
                : pendingApplications}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Accepted
            </p>

            <p className="mt-4 text-3xl font-bold text-slate-900">
              {loading
                ? '—'
                : acceptedApplications}
            </p>
          </div>

        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Your Jobs
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Manage your current job postings.
                </p>
              </div>

              <Link
                to="/employer/post-job"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Post new
              </Link>
            </div>

            {loading ? (
              <div className="space-y-4 p-6">
                {[1, 2, 3].map(
                  (item) => (
                    <div
                      key={item}
                      className="animate-pulse rounded-xl border border-slate-100 p-5"
                    >
                      <div className="h-5 w-1/2 rounded bg-slate-200" />
                      <div className="mt-3 h-4 w-1/3 rounded bg-slate-200" />
                    </div>
                  )
                )}
              </div>
            ) : jobs.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <h3 className="font-semibold text-slate-900">
                  No jobs posted yet
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Create your first job posting
                  to start receiving applications.
                </p>

                <Link
                  to="/employer/post-job"
                  className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Post a Job
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {jobs.map((job) => (
                  <div
                    key={job._id}
                    className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {job.title}
                      </h3>

                      <div className="mt-2 flex flex-wrap gap-2 text-sm text-slate-500">
                        <span>
                          {job.location}
                        </span>

                        <span>•</span>

                        <span>
                          {job.type}
                        </span>

                        {job.category && (
                          <>
                            <span>•</span>

                            <span>
                              {job.category}
                            </span>
                          </>
                        )}
                      </div>

                      <p className="mt-2 text-xs text-slate-400">
                        Posted{' '}
                        {formatDate(
                          job.createdAt
                        )}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        to={`/jobs/${job._id}`}
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                      >
                        View
                      </Link>

                      <Link
                        to={`/employer/edit-job/${job._id}`}
                        className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="font-semibold text-slate-900">
                Recent Applicants
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Review your latest applications.
              </p>
            </div>

            {loading ? (
              <div className="space-y-4 p-6">
                {[1, 2, 3].map(
                  (item) => (
                    <div
                      key={item}
                      className="animate-pulse"
                    >
                      <div className="h-5 w-2/3 rounded bg-slate-200" />
                      <div className="mt-2 h-4 w-1/2 rounded bg-slate-200" />
                    </div>
                  )
                )}
              </div>
            ) : recentApplications.length ===
              0 ? (
              <div className="px-6 py-12 text-center">
                <h3 className="font-semibold text-slate-900">
                  No applications yet
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Applications from job seekers
                  will appear here.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentApplications.map(
                  (application) => (
                    <div
                      key={application._id}
                      className="p-5"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 font-semibold text-blue-700">
                          {application.applicant?.name
                            ?.charAt(0)
                            ?.toUpperCase() ||
                            application.fullName
                              ?.charAt(0)
                              ?.toUpperCase() ||
                            'A'}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                            <div>
                              <h3 className="font-semibold text-slate-900">
                                {application
                                  .applicant
                                  ?.name ||
                                  application.fullName ||
                                  'Applicant'}
                              </h3>

                              <p className="mt-1 truncate text-sm text-slate-500">
                                {application
                                  .applicant
                                  ?.email ||
                                  application.email ||
                                  'No email'}
                              </p>
                            </div>

                            <span
                              className={`inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                                application.status
                              )}`}
                            >
                              {application.status ||
                                'Pending'}
                            </span>

                          </div>

                          <p className="mt-3 text-sm text-slate-600">
                            Applied for{' '}
                            <span className="font-medium text-slate-800">
                              {application.job
                                ?.title ||
                                'Job'}
                            </span>
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {formatDate(
                              application.createdAt
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}

            {applications.length > 0 && (
              <div className="border-t border-slate-200 p-5">
                <Link
                  to="/employer/applications"
                  className="block rounded-xl border border-slate-300 px-4 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  View all applications
                </Link>
              </div>
            )}
          </div>

        </section>

        <section className="mt-8 rounded-2xl bg-slate-900 px-6 py-8 text-white sm:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>
              <h2 className="text-xl font-bold">
                Ready to find your next hire?
              </h2>

              <p className="mt-2 max-w-xl text-sm text-slate-300">
                Publish a clear, professional job
                listing and start connecting with
                qualified candidates.
              </p>
            </div>

            <Link
              to="/employer/post-job"
              className="w-fit rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Post a Job
            </Link>

          </div>
        </section>

      </div>
    </main>
  )
}

export default EmployerDashboard