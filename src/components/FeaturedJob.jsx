import JobCard from './JobCard'
import jobs from '../data/jobs'

function FeaturedJobs({ savedJobs, toggleSaveJob }) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Featured Jobs
          </h2>

          <p className="mt-2 text-slate-600">
            Explore some of the latest opportunities.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={savedJobs.some(
                (savedJob) => savedJob.id === job.id
              )}
              toggleSaveJob={toggleSaveJob}
            />
          ))}

        </div>

      </div>
    </section>
  )
}

export default FeaturedJobs