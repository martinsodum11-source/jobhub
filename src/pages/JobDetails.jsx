import { Link, useParams } from 'react-router-dom'
import jobs from '../data/jobs'

function JobDetails() {
  const { id } = useParams()

  const job = jobs.find(
    (job) => job.id === Number(id)
  )

  if (!job) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-16 text-center">

        <h1 className="text-3xl font-bold text-slate-900">
          Job not found
        </h1>

        <p className="mt-3 text-slate-600">
          The job you're looking for doesn't exist.
        </p>

        <Link
          to="/jobs"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
        >
          Back to Jobs
        </Link>

      </main>
    )
  }

  return (
    <main className="bg-slate-50 px-6 py-12">

      <div className="mx-auto max-w-6xl">

        {/* Back */}
        <Link
          to="/jobs"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          ← Back to Jobs
        </Link>

        {/* Job Header */}
        <div className="mt-6 rounded-2xl border bg-white p-8 shadow-sm">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-4">

              {/* Company Logo */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-2xl font-bold text-blue-600">
                {job.company.charAt(0)}
              </div>

              <div>
                <p className="font-medium text-blue-600">
                  {job.company}
                </p>

                <h1 className="mt-1 text-3xl font-bold text-slate-900 md:text-4xl">
                  {job.title}
                </h1>
              </div>

            </div>

            {/* Apply */}
            <Link
              to={`/jobs/${job.id}/apply`}
              className="rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
            >
              Apply Now
            </Link>

          </div>

          {/* Job Information */}
          <div className="mt-8 flex flex-wrap gap-3 border-t pt-6">

            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">
              📍 {job.location}
            </span>

            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">
              💼 {job.type}
            </span>

            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">
              💰 {job.salary}
            </span>

            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">
              🎯 {job.experience}
            </span>

            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">
              📁 {job.category}
            </span>

          </div>

        </div>

        {/* Main Content */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">

          {/* Left */}
          <div className="space-y-6 md:col-span-2">

            {/* Description */}
            <section className="rounded-2xl border bg-white p-8 shadow-sm">

              <h2 className="text-2xl font-bold text-slate-900">
                Job Description
              </h2>

              <p className="mt-4 leading-8 text-slate-600">
                {job.description}
              </p>

            </section>

            {/* Requirements */}
            <section className="rounded-2xl border bg-white p-8 shadow-sm">

              <h2 className="text-2xl font-bold text-slate-900">
                Requirements
              </h2>

              <ul className="mt-5 space-y-3">

                {job.requirements.map((requirement) => (
                  <li
                    key={requirement}
                    className="flex gap-3 text-slate-600"
                  >
                    <span className="text-blue-600">
                      ✓
                    </span>

                    <span>
                      {requirement}
                    </span>
                  </li>
                ))}

              </ul>

            </section>

            {/* Benefits */}
            <section className="rounded-2xl border bg-white p-8 shadow-sm">

              <h2 className="text-2xl font-bold text-slate-900">
                Benefits
              </h2>

              <ul className="mt-5 space-y-3">

                {job.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex gap-3 text-slate-600"
                  >
                    <span className="text-green-600">
                      ✓
                    </span>

                    <span>
                      {benefit}
                    </span>
                  </li>
                ))}

              </ul>

            </section>

          </div>

          {/* Sidebar */}
          <aside className="h-fit rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold text-slate-900">
              Job Summary
            </h2>

            <div className="mt-6 space-y-5">

              <div>
                <p className="text-sm text-slate-500">
                  Company
                </p>

                <p className="font-medium text-slate-900">
                  {job.company}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Location
                </p>

                <p className="font-medium text-slate-900">
                  {job.location}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Job Type
                </p>

                <p className="font-medium text-slate-900">
                  {job.type}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Experience
                </p>

                <p className="font-medium text-slate-900">
                  {job.experience}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Salary
                </p>

                <p className="font-medium text-slate-900">
                  {job.salary}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Posted
                </p>

                <p className="font-medium text-slate-900">
                  {job.posted}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Application Deadline
                </p>

                <p className="font-medium text-slate-900">
                  {job.deadline}
                </p>
              </div>

            </div>

            {/* Apply */}
            <Link
              to={`/jobs/${job.id}/apply`}
              className="mt-8 block w-full rounded-lg bg-blue-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
            >
              Apply Now
            </Link>

          </aside>

        </div>

      </div>

    </main>
  )
}

export default JobDetails