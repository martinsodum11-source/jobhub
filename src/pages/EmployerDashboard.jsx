import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const API_URL =
  import.meta.env.VITE_API_URL ||
  'http://localhost:5000/api'

function EmployerDashboard() {
  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [updatingApplication, setUpdatingApplication] =
    useState(null)

  const token = localStorage.getItem('token')

  const loadDashboard = async () => {
    try {
      setLoading(true)
      setError('')

      if (!token) {
        throw new Error('You must be logged in.')
      }

      const [jobsResponse, applicationsResponse] =
        await Promise.all([
          fetch(`${API_URL}/employer/jobs`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),

          fetch(`${API_URL}/employer/applications`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ])

      const jobsData = await jobsResponse.json()
      const applicationsData =
        await applicationsResponse.json()

      if (!jobsResponse.ok) {
        throw new Error(
          jobsData.message ||
            'Failed to fetch your jobs'
        )
      }

      if (!applicationsResponse.ok) {
        throw new Error(
          applicationsData.message ||
            'Failed to fetch applications'
        )
      }

      setJobs(Array.isArray(jobsData) ? jobsData : [])
      setApplications(
        Array.isArray(applicationsData)
          ? applicationsData
          : []
      )
    } catch (error) {
      setError(
        error.message ||
          'Failed to load employer dashboard'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboard()
  }, [])

  const handleDeleteJob = async (jobId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this job? This action cannot be undone.'
    )

    if (!confirmed) {
      return
    }

    try {
      setError('')
      setSuccess('')

      const response = await fetch(
        `${API_URL}/jobs/${jobId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to delete job'
        )
      }

      setJobs((currentJobs) =>
        currentJobs.filter(
          (job) => job._id !== jobId
        )
      )

      setSuccess('Job deleted successfully.')
    } catch (error) {
      setError(
        error.message || 'Failed to delete job'
      )
    }
  }

  const handleStatusChange = async (
    applicationId,
    status
  ) => {
    try {
      setUpdatingApplication(applicationId)
      setError('')
      setSuccess('')

      const response = await fetch(
        `${API_URL}/employer/applications/${applicationId}/status`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message ||
            'Failed to update application status'
        )
      }

      setApplications((currentApplications) =>
        currentApplications.map((application) =>
          application._id === applicationId
            ? {
                ...application,
                status:
                  data.application?.status ||
                  status,
              }
            : application
        )
      )

      setSuccess(
        'Application status updated successfully.'
      )
    } catch (error) {
      setError(
        error.message ||
          'Failed to update application status'
      )
    } finally {
      setUpdatingApplication(null)
    }
  }

  const stats = useMemo(() => {
    const pending = applications.filter(
      (application) =>
        application.status === 'Pending'
    ).length

    const reviewed = applications.filter(
      (application) =>
        application.status === 'Reviewed'
    ).length

    const accepted = applications.filter(
      (application) =>
        application.status === 'Accepted'
    ).length

    const rejected = applications.filter(
      (application) =>
        application.status === 'Rejected'
    ).length

    return {
      jobs: jobs.length,
      applications: applications.length,
      pending,
      reviewed,
      accepted,
      rejected,
    }
  }, [jobs, applications])

  const recentApplications = useMemo(() => {
    return [...applications]
      .sort(
        (a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
      )
      .slice(0, 5)
  }, [applications])

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

            <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
              <div className="h-80 rounded-2xl bg-white" />
              <div className="h-80 rounded-2xl bg-white" />
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">

        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Employer workspace
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Employer Dashboard
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
              Manage your open positions, review candidates, and
              keep your hiring process organized in one place.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={loadDashboard}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
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
                  d="M20 11a8.1 8.1 0 0 0-15.7-2M4 5v4h4M4 13a8.1 8.1 0 0 0 15.7 2M20 19v-4h-4"
                />
              </svg>
              Refresh
            </button>

            <Link
              to="/employer/post-job"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
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
                  d="M12 5v14M5 12h14"
                />
              </svg>
              Post a Job
            </Link>
          </div>
        </div>

        {/* Alerts */}
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
                  Something went wrong
                </h2>

                <p className="mt-1 text-sm leading-6 text-red-700">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <div className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
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

              <div>
                <h2 className="font-semibold text-emerald-900">
                  Action completed
                </h2>

                <p className="mt-1 text-sm leading-6 text-emerald-700">
                  {success}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Jobs posted
              </p>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <svg
                  className="h-5 w-5"
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
              </div>
            </div>

            <p className="mt-4 text-3xl font-bold text-slate-950">
              {stats.jobs}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Total positions
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Applications
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
              {stats.applications}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Candidates received
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Pending review
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

            <p className="mt-1 text-xs text-slate-400">
              Applications awaiting review
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

            <p className="mt-1 text-xs text-slate-400">
              Candidates accepted
            </p>
          </div>
        </section>

        {/* Main Dashboard */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.35fr_1fr]">

          {/* Jobs */}
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-lg font-bold text-slate-950">
                  Your Jobs
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Manage your current job listings.
                </p>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {jobs.length} listing
                {jobs.length !== 1 ? 's' : ''}
              </span>
            </div>

            {jobs.length === 0 ? (
              <div className="px-6 py-14 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <svg
                    className="h-7 w-7"
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
                </div>

                <h3 className="mt-5 font-semibold text-slate-950">
                  No jobs posted yet
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  Create your first job listing and start
                  receiving applications from candidates.
                </p>

                <Link
                  to="/employer/post-job"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Post your first job
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {jobs.map((job) => (
                  <div
                    key={job._id}
                    className="p-6 transition hover:bg-slate-50/70"
                  >
                    <div className="flex flex-col gap-5">
                      <div className="flex gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-600">
                          {job.company
                            ?.charAt(0)
                            ?.toUpperCase() || 'J'}
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-base font-bold text-slate-950">
                            {job.title}
                          </h3>

                          <p className="mt-1 text-sm text-slate-500">
                            {job.company} · {job.location}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-2">
                            {job.type && (
                              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                {job.type}
                              </span>
                            )}

                            {job.category && (
                              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                {job.category}
                              </span>
                            )}

                            {job.salary && (
                              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                {job.salary}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                        <Link
                          to={`/jobs/${job._id}`}
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white hover:border-slate-300"
                        >
                          View
                        </Link>

                        <Link
                          to={`/employer/edit-job/${job._id}`}
                          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                          Edit
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteJob(job._id)
                          }
                          className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Recent Applications */}
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-lg font-bold text-slate-950">
                  Recent Applicants
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Latest candidates to review.
                </p>
              </div>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                {applications.length}
              </span>
            </div>

            {recentApplications.length === 0 ? (
              <div className="px-6 py-14 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                  <svg
                    className="h-7 w-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <circle
                      cx="9"
                      cy="8"
                      r="3"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 20a6 6 0 0 1 12 0M16 11a3 3 0 1 0 0-6M18 14a4 4 0 0 1 3 4"
                    />
                  </svg>
                </div>

                <h3 className="mt-5 font-semibold text-slate-950">
                  No applications yet
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Applications will appear here when candidates
                  apply to your jobs.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentApplications.map((application) => (
                  <div
                    key={application._id}
                    className="p-5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-600">
                        {application.fullName
                          ?.charAt(0)
                          ?.toUpperCase() || 'A'}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <h3 className="truncate text-sm font-semibold text-slate-950">
                              {application.fullName ||
                                'Unknown applicant'}
                            </h3>

                            <p className="mt-1 truncate text-xs text-slate-500">
                              {application.email}
                            </p>
                          </div>

                          <span
                            className={`inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
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
                        </div>

                        <p className="mt-3 text-xs text-slate-500">
                          Applied for{' '}
                          <span className="font-medium text-slate-700">
                            {application.job?.title ||
                              'Job unavailable'}
                          </span>
                        </p>

                        <div className="mt-4 flex items-center justify-between gap-3">
                          <p className="text-xs text-slate-400">
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
                              : 'Date unavailable'}
                          </p>

                          <a
                            href={
                              application.resume || '#'
                            }
                            target="_blank"
                            rel="noreferrer"
                            onClick={(event) => {
                              if (!application.resume) {
                                event.preventDefault()
                              }
                            }}
                            className={`text-xs font-semibold ${
                              application.resume
                                ? 'text-blue-600 hover:underline'
                                : 'cursor-not-allowed text-slate-300'
                            }`}
                          >
                            View resume
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Applications Management */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-950">
                Manage Applications
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Review candidates and update their application
                status.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs font-medium">
              <span className="rounded-full bg-amber-50 px-3 py-1.5 text-amber-700">
                {stats.pending} Pending
              </span>

              <span className="rounded-full bg-blue-50 px-3 py-1.5 text-blue-700">
                {stats.reviewed} Reviewed
              </span>

              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-emerald-700">
                {stats.accepted} Accepted
              </span>

              <span className="rounded-full bg-red-50 px-3 py-1.5 text-red-700">
                {stats.rejected} Rejected
              </span>
            </div>
          </div>

          {applications.length === 0 ? (
            <div className="px-6 py-14 text-center">
              <p className="text-sm text-slate-500">
                No applications have been submitted yet.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop */}
              <div className="hidden overflow-x-auto md:block">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/70 text-left">
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Applicant
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Position
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Contact
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Applied
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {applications.map((application) => (
                      <tr
                        key={application._id}
                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-600">
                              {application.fullName
                                ?.charAt(0)
                                ?.toUpperCase() || 'A'}
                            </div>

                            <div>
                              <p className="font-semibold text-slate-900">
                                {application.fullName}
                              </p>

                              {application.phone && (
                                <p className="mt-1 text-xs text-slate-400">
                                  {application.phone}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <p className="max-w-[220px] font-medium text-slate-800">
                            {application.job?.title ||
                              'Job unavailable'}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {application.job?.company ||
                              ''}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <p className="max-w-[200px] truncate text-sm text-slate-600">
                            {application.email}
                          </p>

                          {application.resume && (
                            <a
                              href={application.resume}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-1 inline-block text-xs font-semibold text-blue-600 hover:underline"
                            >
                              View resume
                            </a>
                          )}
                        </td>

                        <td className="px-6 py-5 text-sm text-slate-500">
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
                            : '—'}
                        </td>

                        <td className="px-6 py-5">
                          <select
                            value={
                              application.status ||
                              'Pending'
                            }
                            disabled={
                              updatingApplication ===
                              application._id
                            }
                            onChange={(event) =>
                              handleStatusChange(
                                application._id,
                                event.target.value
                              )
                            }
                            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            <option value="Pending">
                              Pending
                            </option>

                            <option value="Reviewed">
                              Reviewed
                            </option>

                            <option value="Accepted">
                              Accepted
                            </option>

                            <option value="Rejected">
                              Rejected
                            </option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile */}
              <div className="divide-y divide-slate-100 md:hidden">
                {applications.map((application) => (
                  <div
                    key={application._id}
                    className="p-5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 font-bold text-blue-600">
                        {application.fullName
                          ?.charAt(0)
                          ?.toUpperCase() || 'A'}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-semibold text-slate-950">
                              {application.fullName}
                            </h3>

                            <p className="mt-1 text-xs text-slate-500">
                              {application.email}
                            </p>
                          </div>

                          <span
                            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
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
                        </div>

                        <div className="mt-4 rounded-xl bg-slate-50 p-4">
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Applied for
                          </p>

                          <p className="mt-1 text-sm font-semibold text-slate-800">
                            {application.job?.title ||
                              'Job unavailable'}
                          </p>
                        </div>

                        <div className="mt-4 flex flex-col gap-3">
                          <select
                            value={
                              application.status ||
                              'Pending'
                            }
                            disabled={
                              updatingApplication ===
                              application._id
                            }
                            onChange={(event) =>
                              handleStatusChange(
                                application._id,
                                event.target.value
                              )
                            }
                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 disabled:opacity-60"
                          >
                            <option value="Pending">
                              Pending
                            </option>

                            <option value="Reviewed">
                              Reviewed
                            </option>

                            <option value="Accepted">
                              Accepted
                            </option>

                            <option value="Rejected">
                              Rejected
                            </option>
                          </select>

                          {application.resume && (
                            <a
                              href={application.resume}
                              target="_blank"
                              rel="noreferrer"
                              className="text-center text-sm font-semibold text-blue-600 hover:underline"
                            >
                              View applicant resume
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  )
}

export default EmployerDashboard