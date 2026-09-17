import Hero from '../components/Hero'
import FeaturedJobs from '../components/FeaturedJobs'
import JobCategories from '../components/JobCategories'

function Home({ savedJobs, toggleSaveJob }) {
  return (
    <>
      <Hero />

      <FeaturedJobs
        savedJobs={savedJobs}
        toggleSaveJob={toggleSaveJob}
      />

      <JobCategories />
    </>
  )
}

export default Home