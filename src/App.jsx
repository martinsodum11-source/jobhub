import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import Jobs from './pages/Jobs'
import JobDetails from './pages/JobDetails'
import About from './pages/About'
import SavedJobs from './pages/SavedJobs'
import Apply from './pages/Apply'
import Register from './pages/Register'
import Login from './pages/Login'
import MyApplications from './pages/MyApplications'
import JobseekerDashboard from './pages/JobseekerDashboard'
import EmployerDashboard from './pages/EmployerDashboard'
import PostJob from './pages/PostJob'
import EditJob from './pages/EditJob'

function App() {
  const [savedJobs, setSavedJobs] = useState([])

  const toggleSaveJob = (job) => {
    if (!job || !job._id) {
      return
    }

    setSavedJobs((currentSavedJobs) => {
      const alreadySaved = currentSavedJobs.some(
        (savedJob) => savedJob._id === job._id
      )

      if (alreadySaved) {
        return currentSavedJobs.filter(
          (savedJob) => savedJob._id !== job._id
        )
      }

      return [...currentSavedJobs, job]
    })
  }

  return (
    <>
      <Navbar savedJobs={savedJobs} />

      <Routes>

        {/* Public routes */}
        <Route
          path="/"
          element={
            <Home
              savedJobs={savedJobs}
              toggleSaveJob={toggleSaveJob}
            />
          }
        />

        <Route
          path="/jobs"
          element={
            <Jobs
              savedJobs={savedJobs}
              toggleSaveJob={toggleSaveJob}
            />
          }
        />

        <Route
          path="/jobs/:id"
          element={<JobDetails />}
        />

        <Route
          path="/saved"
          element={
            <SavedJobs
              savedJobs={savedJobs}
              toggleSaveJob={toggleSaveJob}
            />
          }
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        {/* Jobseeker routes */}
        <Route
          element={
            <ProtectedRoute allowedRole="jobseeker" />
          }
        >
          <Route
            path="/dashboard"
            element={
              <JobseekerDashboard
                savedJobs={savedJobs}
              />
            }
          />

          <Route
            path="/jobs/:id/apply"
            element={<Apply />}
          />

          <Route
            path="/my-applications"
            element={<MyApplications />}
          />
        </Route>

        {/* Employer routes */}
        <Route
          element={
            <ProtectedRoute allowedRole="employer" />
          }
        >
          <Route
            path="/employer/dashboard"
            element={<EmployerDashboard />}
          />

          <Route
            path="/employer/post-job"
            element={<PostJob />}
          />

          <Route
            path="/employer/edit-job/:id"
            element={<EditJob />}
          />
        </Route>

      </Routes>

      <Footer />
    </>
  )
}

export default App