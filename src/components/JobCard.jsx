import { Link } from 'react-router-dom'

function JobCard({ job, isSaved, toggleSaveJob }) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Top */}
      <div className="flex items-start justify-between">

        <div className="flex items-center gap-3">

          {/* Company Logo */}
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-lg font-bold text-blue-600">
            {job.company.charAt(0)}
          </div>

          <div>
            <p className="text-sm font-medium text-blue-600">
              {job.company}
            </p>

            <h3 className="mt-1 text-xl font-bold text-slate-900">
              {job.title}
            </h3>
          </div>

        </div>

        {/* Save Button */}
        <button
          onClick={() => toggleSaveJob(job)}
          className="rounded-full p-2 text-xl transition hover:bg-slate-100"
          aria-label={isSaved ? 'Remove saved job' : 'Save job'}
        >
          {isSaved ? '❤️' : '♡'}
        </button>

      </div>

      {/* Job Information */}
      <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-600">

        <span>
          📍 {job.location}
        </span>

        <span>
          💼 {job.type}
        </span>

      </div>

      {/* Skills */}
      <div className="mt-5 flex flex-wrap gap-2">

        {job.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
          >
            {skill}
          </span>
        ))}

      </div>

      {/* Bottom */}
      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">

        <div>
          <p className="text-xs text-slate-500">
            Salary
          </p>

          <p className="font-semibold text-slate-900">
            {job.salary}
          </p>
        </div>

        <Link
          to={`/jobs/${job._id}`}
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          View Job
        </Link>

      </div>

    </article>
  )
}

export default JobCard