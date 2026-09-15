import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import Jobs from './pages/Jobs'
import JobDetails from './pages/JobDetails'
import About from './pages/About'
import SavedJobs from './pages/SavedJobs'
import Apply from './pages/Apply'

function App() {
  const [savedJobs, setSavedJobs] = useState([])

  const toggleSaveJob = (job) => {
    setSavedJobs((currentSavedJobs) => {
      const alreadySaved = currentSavedJobs.some(
        (savedJob) => savedJob.id === job.id
      )

      if (alreadySaved) {
        return currentSavedJobs.filter(
          (savedJob) => savedJob.id !== job.id
        )
      }

      return [...currentSavedJobs, job]
    })
  }

  return (
    <>
      <Navbar savedJobs={savedJobs} />

      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={
            <Home
              savedJobs={savedJobs}
              toggleSaveJob={toggleSaveJob}
            />
          }
        />

        {/* Jobs */}
        <Route
          path="/jobs"
          element={
            <Jobs
              savedJobs={savedJobs}
              toggleSaveJob={toggleSaveJob}
            />
          }
        />

        {/* Job Details */}
        <Route
          path="/jobs/:id"
          element={<JobDetails />}
        />

        {/* Apply */}
        <Route
          path="/jobs/:id/apply"
          element={<Apply />}
        />

        {/* Saved Jobs */}
        <Route
          path="/saved"
          element={
            <SavedJobs
              savedJobs={savedJobs}
              toggleSaveJob={toggleSaveJob}
            />
          }
        />

        {/* About */}
        <Route
          path="/about"
          element={<About />}
        />

      </Routes>

      <Footer />
    </>
  )
}

export default App