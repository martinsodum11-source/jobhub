import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function EmployerDashboard() {
  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])

  const [loadingJobs, setLoadingJobs] = useState(true)
  const [loadingApplications, setLoadingApplications] = useState(true)

  const [deletingJobId, setDeletingJobId] = useState(null)
  const [updatingApplicationId, setUpdatingApplicationId] =
    useState(null)

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const loadDashboard = async () => {
      const token = localStorage.getItem('token')

      if (!token) {
        setError(
          'You must be logged in to access the dashboard.'
        )

        setLoadingJobs(false)
        setLoadingApplications(false)

        return
      }

      try {
        const [jobsResponse, applicationsResponse] =
          await Promise.all([
            fetch('http://localhost:5000/api/employer/jobs', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),

            fetch(
              'http://localhost:5000/api/employer/applications',
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            ),
          ])

        const jobsData = await jobsResponse.json()
        const applicationsData =
          await applicationsResponse.json()

        if (!jobsResponse.ok) {
          throw new Error(
            jobsData.message || 'Failed to load jobs'
          )
        }

        if (!applicationsResponse.ok) {
          throw new Error(
            applicationsData.message ||
              'Failed to load applications'
          )
        }

        setJobs(jobsData)
        setApplications(applicationsData)
      } catch (error) {
        setError(
          error.message ||
            'Failed to load dashboard data'
        )
      } finally {
        setLoadingJobs(false)
        setLoadingApplications(false)
      }
    }

    loadDashboard()
  }, [])

  const handleDeleteJob = async (jobId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this job? This action cannot be undone.'
    )

    if (!confirmed) {
      return
    }

    setDeletingJobId(jobId)
    setError('')
    setSuccess('')

    try {
      const token = localStorage.getItem('token')

      const response = await fetch(
        `http://localhost:5000/api/jobs/${jobId}`,
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

      setApplications((currentApplications) =>
        currentApplications.filter(
          (application) =>
            application.job?._id !== jobId
        )
      )

      setSuccess('Job deleted successfully.')
    } catch (error) {
      setError(
        error.message || 'Failed to delete job'
      )
    } finally {
      setDeletingJobId(null)
    }
  }

  const handleStatusChange = async (
    applicationId,
    newStatus
  ) => {
    setUpdatingApplicationId(applicationId)
    setError('')
    setSuccess('')

    try {
      const token = localStorage.getItem('token')

      if (!token) {
        throw new Error(
          'You must be logged in.'
        )
      }

      const response = await fetch(
        `http://localhost:5000/api/employer/applications/${applicationId}/status`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: newStatus,
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
                status: data.application.status,
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
      setUpdatingApplicationId(null)
    }
  }

  const pendingApplications =
    applications.filter(
      (application) =>
        application.status === 'Pending'
    )

  const reviewedApplications =
    applications.filter(
      (application) =>
        application.status !== 'Pending'
    )

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Employer Dashboard
            </h1>

            <p className="mt-2 text-slate-600">
              Manage your jobs and applications.
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
          <div className="mt-6 rounded-lg bg-red-100 p-4 text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-6 rounded-lg bg-green-100 p-4 text-green-700">
            {success}
          </div>
        )}

        {/* Stats */}

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              My Jobs
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {jobs.length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Applications
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {applications.length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Pending Applications
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {pendingApplications.length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Reviewed Applications
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {reviewedApplications.length}
            </p>
          </div>

        </div>

        {/* My Jobs */}

        <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">

          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                My Jobs
              </h2>

              <p className="mt-1 text-slate-500">
                Jobs posted by your employer account.
              </p>
            </div>

            <Link
              to="/employer/post-job"
              className="text-sm font-semibold text-blue-600 hover:underline"
            >
              Post another job →
            </Link>

          </div>

          {loadingJobs && (
            <p className="text-slate-500">
              Loading your jobs...
            </p>
          )}

          {!loadingJobs &&
            jobs.length === 0 && (
              <div className="rounded-xl bg-slate-50 p-8 text-center">

                <p className="font-medium text-slate-700">
                  You haven't posted any jobs yet.
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Create your first job posting to start receiving applications.
                </p>

                <Link
                  to="/employer/post-job"
                  className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                >
                  Post Your First Job
                </Link>

              </div>
            )}

          {!loadingJobs &&
            jobs.length > 0 && (
              <div className="grid gap-4 md:grid-cols-2">

                {jobs.map((job) => (
                  <div
                    key={job._id}
                    className="rounded-xl border border-slate-200 p-5"
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {job.title}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {job.company}
                        </p>
                      </div>

                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                        {job.type}
                      </span>

                    </div>

                    <div className="mt-4 space-y-2 text-sm text-slate-600">
                      <p>📍 {job.location}</p>
                      <p>💰 {job.salary}</p>
                      <p>🎯 {job.experience}</p>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">

                      <Link
                        to={`/jobs/${job._id}`}
                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                      >
                        View Job
                      </Link>

                      <Link
                        to={`/employer/edit-job/${job._id}`}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          handleDeleteJob(job._id)
                        }
                        disabled={
                          deletingJobId === job._id
                        }
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {deletingJobId === job._id
                          ? 'Deleting...'
                          : 'Delete'}
                      </button>

                    </div>
                  </div>
                ))}

              </div>
            )}

        </section>

        {/* Applications */}

        <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">

          <div className="mb-6">

            <h2 className="text-2xl font-bold text-slate-900">
              Applications
            </h2>

            <p className="mt-1 text-slate-500">
              Applications received for your jobs.
            </p>

          </div>

          {loadingApplications && (
            <p className="text-slate-500">
              Loading applications...
            </p>
          )}

          {!loadingApplications &&
            applications.length === 0 && (
              <div className="rounded-xl bg-slate-50 p-8 text-center">

                <p className="font-medium text-slate-700">
                  No applications yet.
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Applications will appear here when someone applies to your jobs.
                </p>

              </div>
            )}

          {!loadingApplications &&
            applications.length > 0 && (
              <div className="overflow-x-auto">

                <table className="w-full min-w-[800px]">

                  <thead>
                    <tr className="border-b border-slate-200 text-left">

                      <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                        Applicant
                      </th>

                      <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                        Job
                      </th>

                      <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                        Email
                      </th>

                      <th className="px-4 py-3 text-sm font-semibold text-slate-600">
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

                          <td className="px-4 py-4">

                            <p className="font-medium text-slate-900">
                              {application.fullName}
                            </p>

                            <p className="text-sm text-slate-500">
                              {application.phone}
                            </p>

                          </td>

                          <td className="px-4 py-4">

                            <p className="font-medium text-slate-900">
                              {application.job?.title ||
                                'Unknown job'}
                            </p>

                            <p className="text-sm text-slate-500">
                              {application.job?.company ||
                                ''}
                            </p>

                          </td>

                          <td className="px-4 py-4 text-sm text-slate-600">
                            {application.email}
                          </td>

                          <td className="px-4 py-4">

                            <select
                              value={
                                application.status
                              }
                              onChange={(event) =>
                                handleStatusChange(
                                  application._id,
                                  event.target.value
                                )
                              }
                              disabled={
                                updatingApplicationId ===
                                application._id
                              }
                              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
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

      </div>
    </main>
  )
}

export default EmployerDashboard