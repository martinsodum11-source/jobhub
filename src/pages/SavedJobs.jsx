import JobCard from '../components/JobCard'

function SavedJobs({ savedJobs, toggleSaveJob }) {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Your collection
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Saved Jobs
          </h1>

          <p className="mt-2 text-slate-600">
            Jobs you've saved for later.
          </p>
        </div>

        {/* Empty State */}
        {savedJobs.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl">
              ♡
            </div>

            <h2 className="mt-5 text-2xl font-bold text-slate-900">
              No saved jobs yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-slate-500">
              When you find a job you like, click the heart
              icon to save it here.
            </p>
          </div>
        ) : (
          <>
            {/* Count */}
            <div className="mt-8 flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                {savedJobs.length}{' '}
                {savedJobs.length === 1
                  ? 'saved job'
                  : 'saved jobs'}
              </p>
            </div>

            {/* Saved Jobs */}
            <div className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {savedJobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  isSaved={true}
                  toggleSaveJob={toggleSaveJob}
                />
              ))}
            </div>
          </>
        )}

      </div>
    </main>
  )
}

export default SavedJobs