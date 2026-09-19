import { Link } from 'react-router-dom'

function JobCard({ job, isSaved, toggleSaveJob }) {
  if (!job) {
    return null
  }

  const jobId = job._id

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      
      <div className="flex items-start justify-between gap-4">

        <div className="flex min-w-0 items-center gap-3">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-lg font-bold text-blue-600">
            {job.company?.charAt(0)?.toUpperCase() || '?'}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-blue-600">
              {job.company || 'Unknown company'}
            </p>

            <h3 className="mt-1 truncate text-xl font-bold text-slate-900">
              {job.title || 'Untitled job'}
            </h3>
          </div>

        </div>

        <button
          type="button"
          onClick={() => toggleSaveJob(job)}
          className="shrink-0 rounded-full p-2 text-xl transition hover:bg-slate-100"
          aria-label={
            isSaved
              ? 'Remove saved job'
              : 'Save job'
          }
        >
          {isSaved ? '❤️' : '♡'}
        </button>

      </div>

      <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-600">
        <span>
          📍 {job.location || 'Location unavailable'}
        </span>

        <span>
          💼 {job.type || 'Job type unavailable'}
        </span>
      </div>

      {Array.isArray(job.skills) &&
        job.skills.length > 0 && (
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
        )}

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-5">

        <div className="min-w-0">
          <p className="text-xs text-slate-500">
            Salary
          </p>

          <p className="truncate font-semibold text-slate-900">
            {job.salary || 'Salary not specified'}
          </p>
        </div>

        <Link
          to={`/jobs/${jobId}`}
          className="shrink-0 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          View Job
        </Link>

      </div>

    </article>
  )
}

export default JobCard