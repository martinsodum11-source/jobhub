import { Link } from 'react-router-dom'

function About() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              About JobHub
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Connecting talented people with meaningful opportunities.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              JobHub is a modern job marketplace designed to make it
              easier for people to discover opportunities and for
              employers to find the right talent.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              Our mission
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              Making the job search simpler.
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Finding the right job or the right candidate can be
              difficult when opportunities are scattered across
              different platforms. JobHub brings job seekers and
              employers together in one focused marketplace.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Job seekers can discover relevant roles, save
              opportunities, submit applications, and track their
              progress. Employers can create job listings, manage
              applications, and connect with potential candidates.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                      strokeLinecap="round"
                    />
                    <circle cx="9" cy="7" r="4" />
                    <path
                      d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <h3 className="mt-4 font-bold text-slate-900">
                  For job seekers
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Discover roles, save jobs, apply to opportunities,
                  and keep track of your applications.
                </p>
              </div>

              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <rect
                      x="3"
                      y="7"
                      width="18"
                      height="13"
                      rx="2"
                    />
                    <path
                      d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M3 12h18M10 12v2h4v-2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <h3 className="mt-4 font-bold text-slate-900">
                  For employers
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Publish roles, manage job listings, review
                  applicants, and organize your hiring process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              How JobHub works
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              One platform for the hiring journey.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 p-6">
              <span className="text-sm font-bold text-blue-600">
                01
              </span>

              <h3 className="mt-4 text-lg font-bold text-slate-900">
                Discover
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Search through job opportunities based on your
                interests, skills, location, and experience.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <span className="text-sm font-bold text-blue-600">
                02
              </span>

              <h3 className="mt-4 text-lg font-bold text-slate-900">
                Connect
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Job seekers can apply to roles while employers
                review candidates and manage applications.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <span className="text-sm font-bold text-blue-600">
                03
              </span>

              <h3 className="mt-4 text-lg font-bold text-slate-900">
                Move forward
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Keep applications organized and continue building
                meaningful professional connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open source */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="rounded-3xl bg-slate-950 px-8 py-12 text-white sm:px-12">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Open source
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Built with an open-source mindset.
            </h2>

            <p className="mt-5 leading-7 text-slate-300">
              JobHub is being built as an open-source project with
              the goal of creating a practical platform where
              developers can contribute, improve the product, and
              build useful features for job seekers and employers.
            </p>

            <Link
              to="/jobs"
              className="mt-8 inline-flex rounded-lg bg-white px-5 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Explore jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Ready to take the next step?
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Whether you're looking for your next opportunity or
            searching for your next hire, JobHub gives you a place
            to get started.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/jobs"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Find a job
            </Link>

            <Link
              to="/register"
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Create an account
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default About