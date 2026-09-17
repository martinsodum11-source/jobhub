import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function MyApplications() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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
          'http://localhost:5000/api/my-applications',
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
  }, [])

  const getStatusClasses = (status) => {
    if (status === 'Accepted') {
      return 'bg-green-100 text-green-700'
    }

    if (status === 'Rejected') {
      return 'bg-red-100 text-red-700'
    }

    if (status === 'Reviewed') {
      return 'bg-blue-100 text-blue-700'
    }

    return 'bg-yellow-100 text-yellow-700'
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <p className="text-slate-500">
            Loading your applications...
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-5xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            My Applications
          </h1>

          <p className="mt-2 text-slate-600">
            Track the jobs you have applied for and
            check their current status.
          </p>
        </div>

        {error && (
          <div className="rounded-lg bg-red-100 p-4 text-red-700">
            {error}
          </div>
        )}

        {!error && applications.length === 0 && (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl">
              📄
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              No applications yet
            </h2>

            <p className="mt-2 text-slate-500">
              You haven't applied for any jobs yet.
            </p>

            <Link
              to="/jobs"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Browse Jobs
            </Link>

          </div>
        )}

        {!error && applications.length > 0 && (
          <div className="space-y-5">

            {applications.map((application) => (
              <div
                key={application._id}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >

                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

                  <div>

                    <p className="text-sm font-medium text-blue-600">
                      {application.job?.company ||
                        'Unknown company'}
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-slate-900">
                      {application.job?.title ||
                        'Unknown job'}
                    </h2>

                    <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
                      <span>
                        📍{' '}
                        {application.job?.location ||
                          'Unknown location'}
                      </span>

                      <span>
                        💼{' '}
                        {application.job?.type ||
                          'Unknown type'}
                      </span>
                    </div>

                  </div>

                  <span
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusClasses(
                      application.status
                    )}`}
                  >
                    {application.status}
                  </span>

                </div>

                <div className="mt-6 grid gap-5 border-t border-slate-100 pt-5 md:grid-cols-2">

                  <div>
                    <p className="text-sm text-slate-500">
                      Applied
                    </p>

                    <p className="mt-1 font-medium text-slate-900">
                      {new Date(
                        application.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Applicant
                    </p>

                    <p className="mt-1 font-medium text-slate-900">
                      {application.fullName}
                    </p>
                  </div>

                </div>

                <div className="mt-6 border-t border-slate-100 pt-5">

                  <p className="text-sm font-medium text-slate-700">
                    Cover Letter
                  </p>

                  <p className="mt-2 leading-6 text-slate-600">
                    {application.coverLetter}
                  </p>

                </div>

                {application.resume && (
                  <div className="mt-5">

                    <a
                      href={application.resume}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      View Resume →
                    </a>

                  </div>
                )}

                {application.job?._id && (
                  <div className="mt-6">

                    <Link
                      to={`/jobs/${application.job._id}`}
                      className="inline-block rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                    >
                      View Job
                    </Link>

                  </div>
                )}

              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  )
}

export default MyApplications