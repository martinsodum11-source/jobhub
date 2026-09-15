import { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar({ savedJobs }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <nav className="border-b bg-white">

      <div className="mx-auto max-w-6xl px-6 py-4">

        {/* Top section */}
        <div className="flex items-center justify-between">

          {/* Logo */}
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
              <span>
                Saved Jobs

                {savedJobs.length > 0 && (
                  <span className="ml-2 rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-600">
                    {savedJobs.length}
                  </span>
                )}
              </span>
            </Link>

            <Link
              to="/about"
              onClick={closeMenu}
              className="text-slate-700 transition hover:text-blue-600"
            >
              About
            </Link>

          </div>
        )}

      </div>

    </nav>
  )
}

export default Navbar