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
        const data = await getJobById(id)
        setJob(data)
      } catch (error) {
        setError('Unable to load this job.')
      } finally {
        setLoading(false)
      }
    }

    loadJob()
  }, [id])

  if (loading) {
    return (
      <main className="min-h-screen px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-slate-500">Loading job...</p>
        </div>
      </main>
    )
  }

  if (error || !job) {
    return (
      <main className="min-h-screen px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-red-600">
            {error || 'Job not found.'}
          </p>

          <Link
            to="/jobs"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            ← Back to jobs
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">

        {/* Back */}
        <Link
          to="/jobs"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          ← Back to jobs
        </Link>

        {/* Header */}
        <section className="mt-6 rounded-2xl bg-white p-8 shadow-sm">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-blue-100 text-2xl font-bold text-blue-600">
                {job.company.charAt(0)}
              </div>

              <div>
                <p className="font-medium text-blue-600">
                  {job.company}
                </p>

                <h1 className="mt-1 text-3xl font-bold text-slate-900">
                  {job.title}
                </h1>
              </div>

            </div>

            <Link
              to={`/jobs/${job._id}/apply`}
              className="rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
            >
              Apply Now
            </Link>

          </div>

          {/* Job information */}
          <div className="mt-8 grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2">

            <div>
              <p className="text-sm text-slate-500">Location</p>
              <p className="mt-1 font-medium text-slate-900">
                📍 {job.location}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Job Type</p>
              <p className="mt-1 font-medium text-slate-900">
                💼 {job.type}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Salary</p>
              <p className="mt-1 font-medium text-slate-900">
                💰 {job.salary}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Experience</p>
              <p className="mt-1 font-medium text-slate-900">
                🎯 {job.experience}
              </p>
            </div>

          </div>

        </section>

        {/* Description */}
        <section className="mt-6 rounded-2xl bg-white p-8 shadow-sm">

          <h2 className="text-2xl font-bold text-slate-900">
            Job Description
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            {job.description}
          </p>

        </section>

        {/* Requirements */}
        <section className="mt-6 rounded-2xl bg-white p-8 shadow-sm">

          <h2 className="text-2xl font-bold text-slate-900">
            Requirements
          </h2>

          <ul className="mt-4 space-y-3">
            {job.requirements.map((requirement) => (
              <li
                key={requirement}
                className="flex gap-3 text-slate-600"
              >
                <span className="text-blue-600">✓</span>
                {requirement}
              </li>
            ))}
          </ul>

        </section>

        {/* Benefits */}
        <section className="mt-6 rounded-2xl bg-white p-8 shadow-sm">

          <h2 className="text-2xl font-bold text-slate-900">
            Benefits
          </h2>

          <ul className="mt-4 space-y-3">
            {job.benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex gap-3 text-slate-600"
              >
                <span className="text-green-600">✓</span>
                {benefit}
              </li>
            ))}
          </ul>

        </section>

        {/* Skills */}
        <section className="mt-6 rounded-2xl bg-white p-8 shadow-sm">

          <h2 className="text-2xl font-bold text-slate-900">
            Skills
          </h2>

          <div className="mt-4 flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
              >
                {skill}
              </span>
            ))}
          </div>

        </section>

      </div>
    </main>
  )
}

export default JobDetails