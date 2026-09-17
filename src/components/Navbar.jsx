import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar({ savedJobs }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navigate = useNavigate()

  const token = localStorage.getItem('token')
  const savedUser = localStorage.getItem('user')

  const user = savedUser ? JSON.parse(savedUser) : null

  const isEmployer = user?.role === 'employer'
  const isJobSeeker = user?.role === 'jobseeker'

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    closeMenu()
    navigate('/')
  }

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto max-w-6xl px-6 py-4">

        {/* Top navigation */}

        <div className="flex items-center justify-between">

          <Link
            to="/"
            onClick={closeMenu}
            className="text-2xl font-bold text-blue-600"
          >
            JobHub
          </Link>

          {/* Desktop Navigation */}

          <div className="hidden items-center gap-6 md:flex">

            <Link
              to="/"
              className="text-slate-700 transition hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              to="/jobs"
              className="text-slate-700 transition hover:text-blue-600"
            >
              Jobs
            </Link>

            <Link
              to="/saved"
              className="text-slate-700 transition hover:text-blue-600"
            >
              Saved Jobs

              {savedJobs.length > 0 && (
                <span className="ml-2 rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-600">
                  {savedJobs.length}
                </span>
              )}
            </Link>

            <Link
              to="/about"
              className="text-slate-700 transition hover:text-blue-600"
            >
              About
            </Link>

            {/* Job Seeker Links */}

            {token && user && isJobSeeker && (
              <Link
                to="/my-applications"
                className="text-slate-700 transition hover:text-blue-600"
              >
                My Applications
              </Link>
            )}

            {/* Employer Links */}

            {token && user && isEmployer && (
              <>
                <Link
                  to="/employer/dashboard"
                  className="text-slate-700 transition hover:text-blue-600"
                >
                  Dashboard
                </Link>

                <Link
                  to="/employer/post-job"
                  className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
                >
                  Post a Job
                </Link>
              </>
            )}

            {/* User Section */}

            {token && user ? (
              <div className="flex items-center gap-4 border-l pl-6">

                <span className="font-medium text-slate-700">
                  Hi, {user.name}
                </span>

                <button
                  onClick={handleLogout}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  Logout
                </button>

              </div>
            ) : (
              <div className="flex items-center gap-3 border-l pl-6">

                <Link
                  to="/login"
                  className="font-medium text-slate-700 transition hover:text-blue-600"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
                >
                  Register
                </Link>

              </div>
            )}

          </div>

          {/* Mobile Menu Button */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-md border p-2 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? '✕' : '☰'}
          </button>

        </div>

        {/* Mobile Navigation */}

        {menuOpen && (
          <div className="mt-4 flex flex-col gap-4 border-t pt-4 md:hidden">

            <Link
              to="/"
              onClick={closeMenu}
              className="text-slate-700 transition hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              to="/jobs"
              onClick={closeMenu}
              className="text-slate-700 transition hover:text-blue-600"
            >
              Jobs
            </Link>

            <Link
              to="/saved"
              onClick={closeMenu}
              className="text-slate-700 transition hover:text-blue-600"
            >
              Saved Jobs

              {savedJobs.length > 0 && (
                <span className="ml-2 rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-600">
                  {savedJobs.length}
                </span>
              )}
            </Link>

            <Link
              to="/about"
              onClick={closeMenu}
              className="text-slate-700 transition hover:text-blue-600"
            >
              About
            </Link>

            {/* Mobile Job Seeker Link */}

            {token && user && isJobSeeker && (
              <Link
                to="/my-applications"
                onClick={closeMenu}
                className="text-slate-700 transition hover:text-blue-600"
              >
                My Applications
              </Link>
            )}

            {/* Mobile Employer Links */}

            {token && user && isEmployer && (
              <>
                <Link
                  to="/employer/dashboard"
                  onClick={closeMenu}
                  className="text-slate-700 transition hover:text-blue-600"
                >
                  Dashboard
                </Link>

                <Link
                  to="/employer/post-job"
                  onClick={closeMenu}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-center font-medium text-white transition hover:bg-blue-700"
                >
                  Post a Job
                </Link>
              </>
            )}

            {/* Mobile User Section */}

            {token && user ? (
              <>
                <div className="border-t pt-4">

                  <p className="font-medium text-slate-700">
                    Hi, {user.name}
                  </p>

                  <p className="mt-1 text-sm capitalize text-slate-500">
                    {user.role}
                  </p>

                </div>

                <button
                  onClick={handleLogout}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-left font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="font-medium text-slate-700 transition hover:text-blue-600"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-center font-medium text-white transition hover:bg-blue-700"
                >
                  Register
                </Link>
              </>
            )}

          </div>
        )}

      </div>
    </nav>
  )
}

export default Navbar