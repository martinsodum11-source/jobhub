import { useEffect, useState } from 'react'
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

      setJobs(jobsData)
      setApplications(applicationsData)
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
      'Are you sure you want to delete this job?'
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
                status: data.application?.status || status,
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

  const rejectedApplications =
    applications.filter(
      (application) =>
        application.status === 'Rejected'
    ).length

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-slate-500">
            Loading dashboard...
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Employer Dashboard
            </h1>

            <p className="mt-2 text-slate-600">
              Manage your jobs and review applications.
            </p>
          </div>

          <Link
            to="/employer/post-job"
            className="rounded-lg bg-blue-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
          >
            + Post a Job
          </Link>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-lg bg-green-100 p-4 text-green-700">
            {success}
          </div>
        )}

        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Jobs
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {jobs.length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Applications
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {applications.length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Pending Applications
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {pendingApplications}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Accepted Applications
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {acceptedApplications}
            </p>
          </div>
        </div>

        <section className="mb-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">
              Your Jobs
            </h2>

            <span className="text-sm text-slate-500">
              {jobs.length} job
              {jobs.length !== 1 ? 's' : ''}
            </span>
          </div>

          {jobs.length === 0 ? (
            <div className="rounded-xl bg-white p-8 text-center shadow-sm">
              <p className="text-slate-600">
                You haven't posted any jobs yet.
              </p>

              <Link
                to="/employer/post-job"
                className="mt-4 inline-block text-blue-600 hover:underline"
              >
                Post your first job →
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="rounded-xl bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {job.title}
                      </h3>

                      <p className="mt-1 text-slate-600">
                        {job.company} • {job.location}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2 text-sm">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                          {job.type}
                        </span>

                        <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                          {job.category}
                        </span>

                        <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                          {job.salary}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Link
                        to={`/jobs/${job._id}`}
                        className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-100"
                      >
                        View
                      </Link>

                      <Link
                        to={`/employer/edit-job/${job._id}`}
                        className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
                      >
                        Edit
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteJob(job._id)
                        }
                        className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700"
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

        <section>
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-slate-900">
              Applications
            </h2>

            <p className="mt-1 text-slate-600">
              Review applications submitted for your
              jobs.
            </p>
          </div>

          {applications.length === 0 ? (
            <div className="rounded-xl bg-white p-8 text-center shadow-sm">
              <p className="text-slate-600">
                No applications yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-slate-200 text-left">
                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                      Applicant
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                      Job
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                      Email
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {applications.map(
                    (application) => (
                      <tr
                        key={application._id}
                        className="border-b border-slate-100 last:border-0"
                      >
                        <td className="px-6 py-4">
                          <p className="font-medium text-slate-900">
                            {application.fullName}
                          </p>

                          {application.phone && (
                            <p className="mt-1 text-sm text-slate-500">
                              {application.phone}
                            </p>
                          )}
                        </td>

                        <td className="px-6 py-4 text-slate-700">
                          {application.job?.title ||
                            'Job unavailable'}
                        </td>

                        <td className="px-6 py-4 text-slate-700">
                          {application.email}
                        </td>

                        <td className="px-6 py-4">
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
                            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 disabled:opacity-60"
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
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {rejectedApplications > 0 && (
          <p className="mt-6 text-sm text-slate-500">
            Rejected applications: {rejectedApplications}
          </p>
        )}
      </div>
    </main>
  )
}

export default EmployerDashboard