import JobCard from '../components/JobCard'

function SavedJobs({ savedJobs, toggleSaveJob }) {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">

      <h1 className="text-4xl font-bold text-slate-900">
        Saved Jobs
      </h1>

      <p className="mt-2 text-slate-600">
        Jobs you've saved for later.
      </p>

      {savedJobs.length === 0 ? (
        <div className="mt-10 rounded-2xl border bg-white p-10 text-center">
          <p className="text-slate-500">
            You haven't saved any jobs yet.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {savedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={true}
              toggleSaveJob={toggleSaveJob}
            />
          ))}

        </div>
      )}

    </main>
  )
}

export default SavedJobs