import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getJobById } from '../api/jobsApi'
import { submitApplication } from '../api/applicationsApi'

function Apply() {
  const { id } = useParams()

  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
    resume: '',
  })

  useEffect(() => {
    const loadJob = async () => {
      try {
        const data = await getJobById(id)
        setJob(data)
      } catch (error) {
        setError('Unable to load this job.')
      } finally {
        setLoading(false)
      }
    }

    loadJob()
  }, [id])

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setSubmitting(true)
    setError('')
    setSuccess('')

    try {
      const token = localStorage.getItem('token')
      const savedUser = localStorage.getItem('user')

      if (!token || !savedUser) {
        throw new Error('You must be logged in to apply for a job.')
      }

      const user = JSON.parse(savedUser)

      if (user.role !== 'jobseeker') {
        throw new Error('Only job seekers can apply for jobs.')
      }

      await submitApplication(
        {
          job: id,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          coverLetter: formData.coverLetter,
          resume: formData.resume,
        },
        token
      )

      setSuccess('Your application has been submitted successfully.')

      setFormData({
        fullName: '',
        email: '',
        phone: '',
        coverLetter: '',
        resume: '',
      })
    } catch (error) {
      setError(error.message || 'Failed to submit application.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-4 w-28 rounded bg-slate-200" />

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
              <div className="rounded-2xl border border-slate-200 bg-white p-8">
                <div className="h-8 w-2/3 rounded bg-slate-200" />
                <div className="mt-3 h-4 w-1/3 rounded bg-slate-200" />

                <div className="mt-10 space-y-6">
                  <div className="h-12 rounded-lg bg-slate-100" />
                  <div className="h-12 rounded-lg bg-slate-100" />
                  <div className="h-12 rounded-lg bg-slate-100" />
                  <div className="h-40 rounded-lg bg-slate-100" />
                  <div className="h-12 rounded-lg bg-slate-100" />
                </div>
              </div>

              <div className="h-80 rounded-2xl border border-slate-200 bg-white" />
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (!job) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <svg
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v4m0 4h.01M10.3 3.8 2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0Z"
              />
            </svg>
          </div>

          <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-950">
            Job unavailable
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            {error || 'We could not find the job you are trying to apply for.'}
          </p>

          <Link
            to="/jobs"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 12H5m7 7-7-7 7-7"
              />
            </svg>
            Browse jobs
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            to={`/jobs/${job._id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 12H5m7 7-7-7 7-7"
              />
            </svg>
            Back to job
          </Link>

          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-2xl font-bold text-blue-600">
              {job.company?.charAt(0)?.toUpperCase() || 'J'}
            </div>

            <div>
              <p className="text-sm font-semibold text-blue-600">
                {job.company}
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                Apply for {job.title}
              </h1>

              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z"
                    />
                    <circle cx="12" cy="10" r="2.2" />
                  </svg>
                  {job.location}
                </span>

                <span className="inline-flex items-center gap-2">
                  <svg
                    className="h-4 w-4"
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V5h8v2M3 12h18"
                    />
                  </svg>
                  {job.type}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="border-b border-slate-200 pb-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Application
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                Tell us about yourself
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Complete the form below to send your application directly to
                the employer.
              </p>
            </div>

            {success && (
              <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
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
                        d="m5 12 4 4L19 6"
                      />
                    </svg>
                  </div>

                  <div>
                    <h3 className="font-semibold text-emerald-900">
                      Application submitted
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-emerald-700">
                      {success}
                    </p>

                    <Link
                      to="/my-applications"
                      className="mt-3 inline-flex text-sm font-semibold text-emerald-800 hover:underline"
                    >
                      View my applications →
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5">
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4m0 4h.01"
                      />
                      <circle cx="12" cy="12" r="9" />
                    </svg>
                  </div>

                  <div>
                    <h3 className="font-semibold text-red-900">
                      Something went wrong
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-red-700">
                      {error}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-7">
              <div>
                <h3 className="text-base font-semibold text-slate-950">
                  Personal information
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Use the information you want the employer to contact you
                  with.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Full name
                  </label>

                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Phone number
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+234 800 000 0000"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>

              <div className="border-t border-slate-200 pt-7">
                <h3 className="text-base font-semibold text-slate-950">
                  Your application
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Give the employer a clear idea of why you are interested in
                  this role.
                </p>
              </div>

              <div>
                <label
                  htmlFor="coverLetter"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Cover letter
                </label>

                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  required
                  rows="9"
                  placeholder="Tell the employer about your experience, relevant skills, and why you're interested in this position..."
                  className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <p className="mt-2 text-xs text-slate-400">
                  Keep your message focused on the role and the value you can
                  bring to the company.
                </p>
              </div>

              <div>
                <label
                  htmlFor="resume"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Resume link
                </label>

                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 3v6h6M8 13h8M8 17h5"
                      />
                    </svg>
                  </div>

                  <input
                    id="resume"
                    type="url"
                    name="resume"
                    value={formData.resume}
                    onChange={handleChange}
                    placeholder="https://drive.google.com/..."
                    className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  Add a public link to your resume. Direct file uploads can be
                  added later.
                </p>
              </div>

              <div className="border-t border-slate-200 pt-7">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <svg
                        className="h-5 w-5 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="9"
                          className="opacity-30"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                        <path
                          d="M21 12a9 9 0 0 0-9-9"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </svg>
                      Submitting application...
                    </>
                  ) : (
                    <>
                      Submit application
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 12h14m-6-6 6 6-6 6"
                        />
                      </svg>
                    </>
                  )}
                </button>

                <p className="mt-3 text-center text-xs leading-5 text-slate-400">
                  By submitting your application, your information will be
                  shared with the employer for recruitment purposes.
                </p>
              </div>
            </form>
          </section>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-base font-bold text-slate-950">
                Job summary
              </h2>

              <div className="mt-5 space-y-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Position
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {job.title}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Company
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {job.company}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Location
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {job.location}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Employment type
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {job.type}
                  </p>
                </div>

                {job.salary && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Salary
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {job.salary}
                    </p>
                  </div>
                )}
              </div>

              <Link
                to={`/jobs/${job._id}`}
                className="mt-6 flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                View full job details
              </Link>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16v-4m0-4h.01"
                  />
                  <circle cx="12" cy="12" r="9" />
                </svg>
              </div>

              <h3 className="mt-4 font-semibold text-slate-950">
                Before you apply
              </h3>

              <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-600">
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  Make sure your contact information is correct.
                </li>

                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  Highlight experience that matches the role.
                </li>

                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  Check that your resume link can be opened by the employer.
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default Apply