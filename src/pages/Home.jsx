import Hero from '../components/Hero'
import FeaturedJobs from '../components/FeaturedJobs'
import JobCategories from '../components/JobCategories'

function Home({ savedJobs = [], toggleSaveJob }) {
  return (
    <main className="min-h-screen bg-slate-50">
      <Hero />

      <FeaturedJobs
        savedJobs={savedJobs}
        toggleSaveJob={toggleSaveJob}
      />

      <JobCategories />
    </main>
  )
}

export default Home