import { useEffect, useState } from 'react'
import JobCard from './JobCard'
import { getJobs } from '../api/jobsApi'

function FeaturedJobs({ savedJobs, toggleSaveJob }) {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await getJobs()
        setJobs(data)
      } catch (error) {
        setError('Unable to load jobs.')
      } finally {
        setLoading(false)
      }
    }

    loadJobs()
  }, [])

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

        {loading && (
          <p className="text-slate-500">
            Loading jobs...
          </p>
        )}

        {error && (
          <p className="text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                isSaved={savedJobs.some(
                  (savedJob) => savedJob._id === job._id
                )}
                toggleSaveJob={toggleSaveJob}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  )
}

export default FeaturedJobs