import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const API_URL =
  import.meta.env.VITE_API_URL ||
  'http://localhost:5000/api'

function JobseekerDashboard({ savedJobs = [] }) {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const user = JSON.parse(
    localStorage.getItem('user') || '{}'
  )

  const token = localStorage.getItem('token')

  useEffect(() => {
    const loadApplications = async () => {
      try {
        setLoading(true)
        setError('')

        if (!token) {
          throw new Error('You must be logged in.')
        }

        const response = await fetch(
          `${API_URL}/my-applications`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data.message ||
              'Failed to load your applications'
          )
        }

        setApplications(data)
      } catch (error) {
        setError(
          error.message ||
            'Failed to load your applications'
        )
      } finally {
        setLoading(false)
      }
    }

    loadApplications()
  }, [token])

  const pendingApplications = applications.filter(
    (application) =>
      application.status === 'Pending'
  ).length

  const acceptedApplications = applications.filter(
    (application) =>
      application.status === 'Accepted'
  ).length

  const rejectedApplications = applications.filter(
    (application) =>
      application.status === 'Rejected'
  ).length

  const reviewedApplications = applications.filter(
    (application) =>
      application.status === 'Reviewed'
  ).length

  const getStatusStyle = (status) => {
    if (status === 'Accepted') {
      return 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300'
    }

    if (status === 'Rejected') {
      return 'border-red-400/20 bg-red-400/10 text-red-300'
    }

    if (status === 'Reviewed') {
      return 'border-blue-400/20 bg-blue-400/10 text-blue-300'
    }

    return 'border-amber-400/20 bg-amber-400/10 text-amber-300'
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050816] px-4 py-8 text-white sm:px-6 lg:px-8 lg:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="h-10 w-64 rounded-xl bg-white/10" />

            <div className="mt-3 h-5 w-96 max-w-full rounded-lg bg-white/5" />

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-40 rounded-3xl border border-white/5 bg-white/5"
                />
              ))}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              <div className="h-96 rounded-3xl bg-white/5 lg:col-span-2" />
              <div className="h-96 rounded-3xl bg-white/5" />
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] px-4 py-6 text-white sm:px-6 lg:px-8 lg:py-10">

      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute -right-32 top-96 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">

        {/* Top Navigation */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-xl font-black shadow-lg shadow-blue-500/20">
              J
            </div>

            <div>
              <p className="text-sm font-bold">
                JobHub
              </p>

              <p className="text-xs text-slate-500">
                Jobseeker workspace
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              to="/jobs"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
            >
              Browse Jobs
            </Link>

            <Link
              to="/my-applications"
              className="rounded-xl border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300 transition hover:-translate-y-0.5 hover:bg-blue-500/20"
            >
              Applications
            </Link>
          </div>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#111936] via-[#0d1329] to-[#09111f] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)] sm:p-8 lg:p-10">

          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />

          <div className="absolute bottom-0 right-1/4 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

            <div className="max-w-3xl">

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-300">
                <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
                Jobseeker Dashboard
              </div>

              <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                Welcome back
                {user.name ? `, ${user.name}` : ''} 👋
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                Track your applications, discover new
                opportunities and stay ready for your
                next interview.
              </p>

            </div>

            <Link
              to="/jobs"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3.5 font-bold shadow-xl shadow-blue-900/30 transition duration-300 hover:-translate-y-1 hover:shadow-blue-500/20 sm:w-auto"
            >
              Find Jobs

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

          </div>
        </section>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Stats */}
        <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

          {/* Total */}
          <div className="group relative">

            <div className="absolute inset-x-5 bottom-[-8px] h-10 rounded-full bg-blue-500/20 blur-2xl transition duration-300 group-hover:bg-blue-500/30" />

            <div className="relative overflow-hidden rounded-3xl border border-blue-400/10 bg-gradient-to-br from-blue-500/20 via-blue-600/10 to-transparent p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)] transition duration-300 hover:-translate-y-2 hover:border-blue-400/30">

              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-blue-400/10 blur-2xl" />

              <div className="relative">

                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-300/10 bg-blue-400/10 text-xl shadow-inner">
                    📋
                  </div>

                  <span className="text-xs font-bold text-blue-300">
                    ALL
                  </span>
                </div>

                <p className="mt-6 text-sm text-slate-400">
                  Total Applications
                </p>

                <p className="mt-1 text-4xl font-black tracking-tight">
                  {applications.length}
                </p>

              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="group relative">

            <div className="absolute inset-x-5 bottom-[-8px] h-10 rounded-full bg-amber-500/20 blur-2xl" />

            <div className="relative overflow-hidden rounded-3xl border border-amber-400/10 bg-gradient-to-br from-amber-500/20 via-orange-600/10 to-transparent p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)] transition duration-300 hover:-translate-y-2 hover:border-amber-400/30">

              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-orange-400/10 blur-2xl" />

              <div className="relative">

                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-300/10 bg-amber-400/10 text-xl">
                    ⏳
                  </div>

                  <span className="text-xs font-bold text-amber-300">
                    WAITING
                  </span>
                </div>

                <p className="mt-6 text-sm text-slate-400">
                  Pending
                </p>

                <p className="mt-1 text-4xl font-black tracking-tight">
                  {pendingApplications}
                </p>

              </div>
            </div>
          </div>

          {/* Accepted */}
          <div className="group relative">

            <div className="absolute inset-x-5 bottom-[-8px] h-10 rounded-full bg-emerald-500/20 blur-2xl" />

            <div className="relative overflow-hidden rounded-3xl border border-emerald-400/10 bg-gradient-to-br from-emerald-500/20 via-green-600/10 to-transparent p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)] transition duration-300 hover:-translate-y-2 hover:border-emerald-400/30">

              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-emerald-400/10 blur-2xl" />

              <div className="relative">

                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-300/10 bg-emerald-400/10 text-xl">
                    ✓
                  </div>

                  <span className="text-xs font-bold text-emerald-300">
                    SUCCESS
                  </span>
                </div>

                <p className="mt-6 text-sm text-slate-400">
                  Accepted
                </p>

                <p className="mt-1 text-4xl font-black tracking-tight">
                  {acceptedApplications}
                </p>

              </div>
            </div>
          </div>

          {/* Saved */}
          <div className="group relative">

            <div className="absolute inset-x-5 bottom-[-8px] h-10 rounded-full bg-purple-500/20 blur-2xl" />

            <div className="relative overflow-hidden rounded-3xl border border-purple-400/10 bg-gradient-to-br from-purple-500/20 via-fuchsia-600/10 to-transparent p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)] transition duration-300 hover:-translate-y-2 hover:border-purple-400/30">

              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-purple-400/10 blur-2xl" />

              <div className="relative">

                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-purple-300/10 bg-purple-400/10 text-xl">
                    ❤️
                  </div>

                  <span className="text-xs font-bold text-purple-300">
                    SAVED
                  </span>
                </div>

                <p className="mt-6 text-sm text-slate-400">
                  Saved Jobs
                </p>

                <p className="mt-1 text-4xl font-black tracking-tight">
                  {savedJobs.length}
                </p>

              </div>
            </div>
          </div>

        </section>

        {/* Small stats row */}
        <div className="mt-5 flex flex-wrap gap-3 text-xs text-slate-500">
          <span className="rounded-full border border-white/5 bg-white/[0.03] px-3 py-1.5">
            {reviewedApplications} reviewed
          </span>

          <span className="rounded-full border border-white/5 bg-white/[0.03] px-3 py-1.5">
            {rejectedApplications} rejected
          </span>

          <span className="rounded-full border border-white/5 bg-white/[0.03] px-3 py-1.5">
            {applications.length} total applications
          </span>
        </div>

        {/* Main Content */}
        <section className="mt-10 grid gap-8 xl:grid-cols-3">

          {/* Applications */}
          <div className="xl:col-span-2">

            <div className="mb-5 flex items-end justify-between gap-4">

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
                  Your activity
                </p>

                <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                  Recent Applications
                </h2>
              </div>

              <Link
                to="/my-applications"
                className="shrink-0 text-sm font-semibold text-blue-400 transition hover:text-blue-300"
              >
                View all →
              </Link>

            </div>

            {applications.length === 0 ? (
              <div className="relative overflow-hidden rounded-3xl border border-dashed border-white/10 bg-white/[0.03] p-10 text-center">

                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] to-transparent" />

                <div className="relative">

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-400/10 bg-blue-500/10 text-3xl">
                    💼
                  </div>

                  <h3 className="mt-5 text-xl font-bold">
                    No applications yet
                  </h3>

                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                    Start exploring available jobs and
                    submit your first application.
                  </p>

                  <Link
                    to="/jobs"
                    className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold shadow-lg shadow-blue-900/20 transition hover:-translate-y-0.5 hover:bg-blue-500"
                  >
                    Browse Jobs
                  </Link>

                </div>
              </div>
            ) : (
              <div className="space-y-4">

                {applications.slice(0, 5).map(
                  (application) => (
                    <div
                      key={application._id}
                      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-[0_15px_40px_rgba(0,0,0,0.2)] transition duration-300 hover:-translate-y-1 hover:border-blue-400/20 hover:bg-white/[0.055] sm:p-6"
                    >

                      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-500 opacity-0 transition group-hover:opacity-100" />

                      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                        <div className="min-w-0">

                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-sm">
                              💼
                            </div>

                            <div className="min-w-0">
                              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                                Application
                              </p>

                              <h3 className="truncate text-lg font-bold">
                                {application.job?.title ||
                                  'Job unavailable'}
                              </h3>
                            </div>
                          </div>

                          <p className="mt-3 pl-0 text-sm text-slate-500 sm:pl-[52px]">
                            {application.job?.company ||
                              'Company unavailable'}
                          </p>

                        </div>

                        <div className="flex items-center gap-3">

                          <span
                            className={`rounded-full border px-4 py-2 text-xs font-bold ${getStatusStyle(
                              application.status
                            )}`}
                          >
                            {application.status ||
                              'Pending'}
                          </span>

                          {application.job?._id && (
                            <Link
                              to={`/jobs/${application.job._id}`}
                              className="hidden rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-400 transition hover:bg-white/10 hover:text-white sm:block"
                            >
                              View
                            </Link>
                          )}

                        </div>

                      </div>
                    </div>
                  )
                )}

              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">

            {/* Interview */}
            <div className="group relative overflow-hidden rounded-3xl border border-cyan-400/10 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)]">

              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />

              <div className="relative">

                <div className="flex items-center justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/10 text-2xl">
                    🎥
                  </div>

                  <span className="rounded-full border border-cyan-400/10 bg-cyan-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                    Interview
                  </span>

                </div>

                <h3 className="mt-6 text-xl font-bold">
                  Video Interviews
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Employers can send you structured video
                  interviews directly through JobHub.
                </p>

                <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-sm">
                      ✓
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-300">
                        No interview requests
                      </p>

                      <p className="mt-0.5 text-xs text-slate-600">
                        You're all caught up
                      </p>
                    </div>

                  </div>

                </div>

              </div>
            </div>

            {/* Saved Jobs */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)]">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Your collection
                  </p>

                  <h3 className="mt-1 text-xl font-bold">
                    Saved Jobs
                  </h3>
                </div>

                <span className="rounded-full border border-pink-400/10 bg-pink-500/10 px-3 py-1 text-sm font-bold text-pink-300">
                  {savedJobs.length}
                </span>

              </div>

              {savedJobs.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-dashed border-white/10 bg-black/10 p-5">

                  <p className="text-sm leading-6 text-slate-500">
                    You haven't saved any jobs yet.
                  </p>

                  <Link
                    to="/jobs"
                    className="mt-3 inline-block text-sm font-semibold text-blue-400 hover:text-blue-300"
                  >
                    Find jobs →
                  </Link>

                </div>
              ) : (
                <div className="mt-5 space-y-3">

                  {savedJobs.slice(0, 3).map((job) => (
                    <Link
                      key={job._id}
                      to={`/jobs/${job._id}`}
                      className="group block rounded-2xl border border-white/10 bg-black/10 p-4 transition duration-300 hover:-translate-y-1 hover:border-blue-400/20 hover:bg-white/5"
                    >

                      <div className="flex items-center justify-between gap-3">

                        <div className="min-w-0">
                          <p className="truncate font-semibold">
                            {job.title}
                          </p>

                          <p className="mt-1 truncate text-xs text-slate-600">
                            {job.company}
                          </p>
                        </div>

                        <span className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-blue-400">
                          →
                        </span>

                      </div>

                    </Link>
                  ))}

                </div>
              )}

              <Link
                to="/saved"
                className="mt-5 inline-block text-sm font-semibold text-blue-400 transition hover:text-blue-300"
              >
                View saved jobs →
              </Link>

            </div>
          </div>

        </section>

        {/* Bottom CTA */}
        <section className="relative mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-r from-[#10172f] via-[#101a38] to-[#111b35] p-6 shadow-[0_25px_70px_rgba(0,0,0,0.3)] sm:p-8">

          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <div className="mb-2 inline-flex rounded-full border border-blue-400/10 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
                Keep going
              </div>

              <h2 className="text-2xl font-black sm:text-3xl">
                Find your next opportunity.
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                New opportunities are waiting for you.
              </p>
            </div>

            <Link
              to="/jobs"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3.5 font-bold text-slate-950 shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-slate-100"
            >
              Explore Jobs →
            </Link>

          </div>
        </section>

      </div>
    </main>
  )
}

export default JobseekerDashboard