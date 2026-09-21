import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getJobById } from '../api/jobsApi'

function JobDetails() {
  const { id } = useParams()

  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadJob = async () => {
      try {
        setLoading(true)
        setError('')

        const data = await getJobById(id)
        setJob(data)
      } catch (error) {
        setError('Unable to load this job right now.')
      } finally {
        setLoading(false)
      }
    }

    loadJob()
  }, [id])

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6 h-5 w-28 animate-pulse rounded bg-slate-200" />

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <div className="h-20 w-20 animate-pulse rounded-2xl bg-slate-200" />

              <div className="flex-1">
                <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
                <div className="mt-3 h-9 max-w-lg animate-pulse rounded bg-slate-200" />
                <div className="mt-4 h-4 max-w-md animate-pulse rounded bg-slate-100" />
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
            <div className="space-y-6">
              <div className="h-72 animate-pulse rounded-2xl bg-white" />
              <div className="h-56 animate-pulse rounded-2xl bg-white" />
            </div>

            <div className="h-64 animate-pulse rounded-2xl bg-white" />
          </div>
        </div>
      </main>
    )
  }

  if (error || !job) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4M12 16h.01"
              />
              <circle cx="12" cy="12" r="9" />
            </svg>
          </div>

          <h1 className="mt-5 text-xl font-bold text-slate-950">
            Job unavailable
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {error || 'This job could not be found.'}
          </p>

          <Link
            to="/jobs"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
          >
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
                d="M19 12H5M11 18l-6-6 6-6"
              />
            </svg>

            Back to jobs
          </Link>
        </div>
      </main>
    )
  }

  const requirements = Array.isArray(job.requirements)
    ? job.requirements
    : []

  const benefits = Array.isArray(job.benefits)
    ? job.benefits
    : []

  const skills = Array.isArray(job.skills)
    ? job.skills
    : []

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-950"
          >
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
                d="M19 12H5M11 18l-6-6 6-6"
              />
            </svg>

            Back to jobs
          </Link>

          <div className="mt-8 flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-start gap-5">
              {/* Company logo */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-xl font-bold text-blue-700 ring-1 ring-blue-100 sm:h-20 sm:w-20 sm:text-2xl">
                {job.company?.charAt(0)?.toUpperCase() || '?'}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-blue-600">
                  {job.company || 'Unknown company'}
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  {job.title || 'Untitled job'}
                </h1>

                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                  {job.location && (
                    <span className="inline-flex items-center gap-2">
                      <svg
                        className="h-4 w-4 text-slate-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"
                        />
                        <circle cx="12" cy="9" r="2.25" />
                      </svg>

                      {job.location}
                    </span>
                  )}

                  {job.type && (
                    <span className="inline-flex items-center gap-2">
                      <svg
                        className="h-4 w-4 text-slate-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <rect
                          x="3"
                          y="6"
                          width="18"
                          height="13"
                          rx="2"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 6V4.5A1.5 1.5 0 0 1 9.5 3h5A1.5 1.5 0 0 1 16 4.5V6"
                        />
                      </svg>

                      {job.type}
                    </span>
                  )}

                  {job.experience && (
                    <span className="inline-flex items-center gap-2">
                      <svg
                        className="h-4 w-4 text-slate-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <circle cx="12" cy="12" r="8.5" />
                        <path
                          strokeLinecap="round"
                          d="M12 7v5l3 2"
                        />
                      </svg>

                      {job.experience}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <Link
              to={`/jobs/${job._id}/apply`}
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
            >
              Apply for this job
            </Link>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          {/* Main column */}
          <div className="space-y-6">
            {/* Description */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold tracking-tight text-slate-950">
                About the role
              </h2>

              <p className="mt-5 whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-base">
                {job.description ||
                  'No job description has been provided.'}
              </p>
            </section>

            {/* Requirements */}
            {requirements.length > 0 && (
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-xl font-bold tracking-tight text-slate-950">
                  What we're looking for
                </h2>

                <ul className="mt-6 space-y-4">
                  {requirements.map((requirement, index) => (
                    <li
                      key={`${requirement}-${index}`}
                      className="flex gap-3 text-sm leading-6 text-slate-600 sm:text-base"
                    >
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <svg
                          className="h-3 w-3"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m5 12 4 4L19 6"
                          />
                        </svg>
                      </span>

                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Benefits */}
            {benefits.length > 0 && (
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-xl font-bold tracking-tight text-slate-950">
                  Benefits
                </h2>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {benefits.map((benefit, index) => (
                    <div
                      key={`${benefit}-${index}`}
                      className="flex items-start gap-3 rounded-xl bg-slate-50 p-4"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm ring-1 ring-slate-100">
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
                            d="m5 12 4 4L19 6"
                          />
                        </svg>
                      </span>

                      <span className="pt-1 text-sm font-medium text-slate-700">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-xl font-bold tracking-tight text-slate-950">
                  Skills & expertise
                </h2>

                <div className="mt-5 flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg bg-blue-50 px-3.5 py-2 text-sm font-medium text-blue-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            {/* Apply card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
              <h2 className="text-lg font-bold text-slate-950">
                Interested in this role?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Submit your application and take the next step in
                your career.
              </p>

              <Link
                to={`/jobs/${job._id}/apply`}
                className="mt-6 flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Apply now
              </Link>

              <p className="mt-3 text-center text-xs text-slate-400">
                Application takes only a few minutes.
              </p>
            </div>

            {/* Job overview */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-950">
                Job overview
              </h2>

              <div className="mt-5 space-y-5">
                {job.salary && (
                  <div className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <circle cx="12" cy="12" r="9" />
                        <path
                          strokeLinecap="round"
                          d="M15 8.5c-.6-.6-1.5-1-2.7-1-1.5 0-2.5.8-2.5 1.8 0 2.8 5.3 1.2 5.3 4 0 1.1-1.1 2-2.7 2-1.2 0-2.3-.4-3-1.1"
                        />
                        <path
                          strokeLinecap="round"
                          d="M12 6v12"
                        />
                      </svg>
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Salary
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">
                        {job.salary}
                      </p>
                    </div>
                  </div>
                )}

                {job.location && (
                  <div className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
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
                          d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"
                        />
                        <circle cx="12" cy="9" r="2.25" />
                      </svg>
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Location
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">
                        {job.location}
                      </p>
                    </div>
                  </div>
                )}

                {job.type && (
                  <div className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <rect
                          x="3"
                          y="6"
                          width="18"
                          height="13"
                          rx="2"
                        />
                        <path
                          strokeLinecap="round"
                          d="M8 6V4.5A1.5 1.5 0 0 1 9.5 3h5A1.5 1.5 0 0 1 16 4.5V6"
                        />
                      </svg>
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Job type
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">
                        {job.type}
                      </p>
                    </div>
                  </div>
                )}

                {job.experience && (
                  <div className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <circle cx="12" cy="12" r="8.5" />
                        <path
                          strokeLinecap="round"
                          d="M12 7v5l3 2"
                        />
                      </svg>
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Experience
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">
                        {job.experience}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Company card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Hiring company
              </p>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-700">
                  {job.company?.charAt(0)?.toUpperCase() || '?'}
                </div>

                <div className="min-w-0">
                  <p className="truncate font-semibold text-slate-950">
                    {job.company || 'Unknown company'}
                  </p>

                  <p className="text-sm text-slate-500">
                    Hiring on JobHub
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default JobDetails