import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

function Navbar({ savedJobs = [] }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  const token = localStorage.getItem('token')
  const savedUser = localStorage.getItem('user')

  let user = null

  try {
    user = savedUser ? JSON.parse(savedUser) : null
  } catch {
    user = null
  }

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

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }

    return location.pathname.startsWith(path)
  }

  const navLinkClass = (path) => `
    relative flex items-center gap-2 py-2 text-sm font-medium transition
    ${
      isActive(path)
        ? 'text-blue-600'
        : 'text-slate-600 hover:text-slate-950'
    }
  `

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <nav>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Desktop / Main Navigation */}

          <div className="flex h-[72px] items-center justify-between">

            {/* Logo */}

            <Link
              to="/"
              onClick={closeMenu}
              className="group flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white shadow-sm transition duration-300 group-hover:scale-105 group-hover:bg-blue-700">
                J
              </div>

              <div className="leading-none">
                <span className="block text-xl font-bold tracking-tight text-slate-950">
                  Job<span className="text-blue-600">Hub</span>
                </span>

                <span className="mt-1 hidden text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400 sm:block">
                  Find your next opportunity
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}

            <div className="hidden items-center gap-7 lg:flex">

              <Link
                to="/"
                className={navLinkClass('/')}
              >
                Home

                {isActive('/') && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-blue-600" />
                )}
              </Link>

              <Link
                to="/jobs"
                className={navLinkClass('/jobs')}
              >
                Jobs

                {isActive('/jobs') && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-blue-600" />
                )}
              </Link>

              <Link
                to="/saved"
                className={navLinkClass('/saved')}
              >
                Saved Jobs

                {savedJobs.length > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-100 px-1.5 text-[11px] font-bold text-blue-700">
                    {savedJobs.length}
                  </span>
                )}

                {isActive('/saved') && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-blue-600" />
                )}
              </Link>

              <Link
                to="/about"
                className={navLinkClass('/about')}
              >
                About

                {isActive('/about') && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-blue-600" />
                )}
              </Link>

              {/* Jobseeker Navigation */}

              {token && user && isJobSeeker && (
                <Link
                  to="/my-applications"
                  className={navLinkClass('/my-applications')}
                >
                  My Applications

                  {isActive('/my-applications') && (
                    <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-blue-600" />
                  )}
                </Link>
              )}

              {/* Employer Navigation */}

              {token && user && isEmployer && (
                <>
                  <Link
                    to="/employer/dashboard"
                    className={navLinkClass('/employer/dashboard')}
                  >
                    Dashboard

                    {isActive('/employer/dashboard') && (
                      <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-blue-600" />
                    )}
                  </Link>

                  <Link
                    to="/employer/post-job"
                    className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-700 hover:shadow-md"
                  >
                    Post a Job
                  </Link>
                </>
              )}
            </div>

            {/* Desktop Account Area */}

            <div className="hidden items-center gap-3 lg:flex">

              {token && user ? (
                <div className="flex items-center gap-3">

                  <div className="flex items-center gap-3 border-l border-slate-200 pl-5">

                    {/* Avatar */}

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                      {user.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>

                    <div className="hidden xl:block">
                      <p className="max-w-[140px] truncate text-sm font-semibold text-slate-900">
                        {user.name}
                      </p>

                      <p className="text-xs capitalize text-slate-500">
                        {user.role}
                      </p>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                    >
                      Logout
                    </button>

                  </div>

                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                  >
                    Sign in
                  </Link>

                  <Link
                    to="/register"
                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-700 hover:shadow-md"
                  >
                    Get Started
                  </Link>
                </>
              )}

            </div>

            {/* Mobile Menu Button */}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 lg:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>

          </div>

          {/* Mobile Navigation */}

          {menuOpen && (
            <div className="border-t border-slate-200 py-5 lg:hidden">

              <div className="flex flex-col gap-1">

                <Link
                  to="/"
                  onClick={closeMenu}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive('/')
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Home
                </Link>

                <Link
                  to="/jobs"
                  onClick={closeMenu}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive('/jobs')
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Jobs
                </Link>

                <Link
                  to="/saved"
                  onClick={closeMenu}
                  className={`flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive('/saved')
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>Saved Jobs</span>

                  {savedJobs.length > 0 && (
                    <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-blue-100 px-2 text-xs font-bold text-blue-700">
                      {savedJobs.length}
                    </span>
                  )}
                </Link>

                <Link
                  to="/about"
                  onClick={closeMenu}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive('/about')
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  About
                </Link>

                {/* Mobile Jobseeker Links */}

                {token && user && isJobSeeker && (
                  <Link
                    to="/my-applications"
                    onClick={closeMenu}
                    className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
                      isActive('/my-applications')
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
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
                      className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
                        isActive('/employer/dashboard')
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      Employer Dashboard
                    </Link>

                    <Link
                      to="/employer/post-job"
                      onClick={closeMenu}
                      className="mt-2 rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      Post a Job
                    </Link>
                  </>
                )}

              </div>

              {/* Mobile Account Section */}

              <div className="mt-5 border-t border-slate-200 pt-5">

                {token && user ? (
                  <div>

                    <div className="flex items-center gap-3 px-2">

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                        {user.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {user.name}
                        </p>

                        <p className="text-xs capitalize text-slate-500">
                          {user.role}
                        </p>
                      </div>

                    </div>

                    <button
                      onClick={handleLogout}
                      className="mt-4 w-full rounded-lg border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      Log out
                    </button>

                  </div>
                ) : (
                  <div className="flex flex-col gap-2">

                    <Link
                      to="/login"
                      onClick={closeMenu}
                      className="rounded-lg px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      Sign in
                    </Link>

                    <Link
                      to="/register"
                      onClick={closeMenu}
                      className="rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      Get Started
                    </Link>

                  </div>
                )}

              </div>

            </div>
          )}

        </div>
      </nav>
    </header>
  )
}

export default Navbar