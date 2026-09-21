import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

        {/* Main Footer */}

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}

          <div className="lg:col-span-1">

            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
                J
              </div>

              <span className="text-2xl font-bold tracking-tight">
                Job<span className="text-blue-500">Hub</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
              Connecting talented people with meaningful opportunities
              and helping companies find the people they need to grow.
            </p>

            <div className="mt-6 flex items-center gap-3">

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 text-slate-400 transition hover:border-slate-700 hover:bg-slate-900 hover:text-white"
              >
                in
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 text-slate-400 transition hover:border-slate-700 hover:bg-slate-900 hover:text-white"
              >
                X
              </a>

              <a
                href="#"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 text-slate-400 transition hover:border-slate-700 hover:bg-slate-900 hover:text-white"
              >
                GH
              </a>

            </div>

          </div>

          {/* For Job Seekers */}

          <div>

            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              For Job Seekers
            </h3>

            <div className="mt-5 flex flex-col gap-3">

              <Link
                to="/jobs"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                Browse Jobs
              </Link>

              <Link
                to="/saved"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                Saved Jobs
              </Link>

              <Link
                to="/my-applications"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                My Applications
              </Link>

              <Link
                to="/register"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                Create an Account
              </Link>

            </div>

          </div>

          {/* For Employers */}

          <div>

            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              For Employers
            </h3>

            <div className="mt-5 flex flex-col gap-3">

              <Link
                to="/employer/post-job"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                Post a Job
              </Link>

              <Link
                to="/employer/dashboard"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                Employer Dashboard
              </Link>

              <Link
                to="/register"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                Create an Employer Account
              </Link>

            </div>

          </div>

          {/* Company */}

          <div>

            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>

            <div className="mt-5 flex flex-col gap-3">

              <Link
                to="/about"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                About JobHub
              </Link>

              <Link
                to="/jobs"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                Explore Opportunities
              </Link>

              <a
                href="mailto:support@jobhub.com"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                Contact Support
              </a>

            </div>

          </div>

        </div>

        {/* Bottom Footer */}

        <div className="mt-14 flex flex-col gap-5 border-t border-slate-800 pt-7 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} JobHub. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-5">

            <a
              href="#"
              className="text-sm text-slate-500 transition hover:text-white"
            >
              Privacy
            </a>

            <a
              href="#"
              className="text-sm text-slate-500 transition hover:text-white"
            >
              Terms
            </a>

            <a
              href="#"
              className="text-sm text-slate-500 transition hover:text-white"
            >
              Help
            </a>

          </div>

        </div>

      </div>
    </footer>
  )
}

export default Footer 