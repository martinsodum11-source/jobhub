import { Link } from 'react-router-dom'

function JobCard({ job, isSaved, toggleSaveJob }) {
  if (!job) {
    return null
  }

  const jobId = job._id

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/60">
      {/* Company + Save */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-base font-bold text-blue-700 ring-1 ring-blue-100">
            {job.company?.charAt(0)?.toUpperCase() || '?'}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-slate-500">
              {job.company || 'Unknown company'}
            </p>

            <h3 className="mt-1 truncate text-lg font-bold tracking-tight text-slate-950">
              {job.title || 'Untitled job'}
            </h3>
          </div>
        </div>

        <button
          type="button"
          onClick={() => toggleSaveJob(job)}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition ${
            isSaved
              ? 'border-blue-200 bg-blue-50 text-blue-600'
              : 'border-slate-200 bg-white text-slate-400 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700'
          }`}
          aria-label={isSaved ? 'Remove saved job' : 'Save job'}
          aria-pressed={isSaved}
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill={isSaved ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 4.75A1.75 1.75 0 0 1 7.75 3h8.5A1.75 1.75 0 0 1 18 4.75V21l-6-3.75L6 21V4.75Z"
            />
          </svg>
        </button>
      </div>

      {/* Job information */}
      <div className="mt-6 flex flex-wrap gap-2">
        {job.location && (
          <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-600 ring-1 ring-slate-100">
            <svg
              className="h-3.5 w-3.5 text-slate-400"
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
          <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-600 ring-1 ring-slate-100">
            <svg
              className="h-3.5 w-3.5 text-slate-400"
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
                d="M8 6V4.5A1.5 1.5 0 0 1 9.5 3h5A1.5 1.5 0 0 1 16 4.5V6M3 11h18"
              />
            </svg>
            {job.type}
          </span>
        )}

        {job.experience && (
          <span className="inline-flex items-center rounded-md bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-600 ring-1 ring-slate-100">
            {job.experience}
          </span>
        )}
      </div>

      {/* Skills */}
      {Array.isArray(job.skills) && job.skills.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {job.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
            >
              {skill}
            </span>
          ))}

          {job.skills.length > 4 && (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
              +{job.skills.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Spacer keeps cards equal height */}
      <div className="flex-1" />

      {/* Footer */}
      <div className="mt-7 border-t border-slate-100 pt-5">
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Salary
            </p>

            <p className="mt-1 truncate text-sm font-bold text-slate-950">
              {job.salary || 'Salary not specified'}
            </p>
          </div>

          <Link
            to={`/jobs/${jobId}`}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:bg-blue-600"
          >
            View job

            <svg
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M13 6l6 6-6 6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}

export default JobCard