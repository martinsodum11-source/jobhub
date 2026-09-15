import Hero from '../components/Hero'
import FeaturedJob from '../components/FeaturedJob'
import JobCategories from '../components/JobCategories'

function Home({ savedJobs, toggleSaveJob }) {
  return (
    <>
      <Hero />

      <FeaturedJob
        savedJobs={savedJobs}
        toggleSaveJob={toggleSaveJob}
      />

      <JobCategories />
    </>
  )
}

export default Home