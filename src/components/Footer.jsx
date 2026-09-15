import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import jobs from '../data/jobs'

function Apply() {
  const { id } = useParams()

  const job = jobs.find(
    (job) => job.id === Number(id)
  )

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value, files } = e.target

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(formData)

    setSubmitted(true)
  }

  if (!job) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-16 text-center">

        <h1 className="text-3xl font-bold text-slate-900">
          Job not found
        </h1>

        <p className="mt-3 text-slate-600">
          The job you're applying for doesn't exist.
        </p>

        <Link
          to="/jobs"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
        >
          Back to Jobs
        </Link>

      </main>
    )
  }

  if (submitted) {
    return (
      <main className="bg-slate-50 px-6 py-16">

        <div className="mx-auto max-w-2xl rounded-2xl border bg-white p-10 text-center shadow-sm">

          <div className="text-5xl">
            ✅
          </div>

          <h1 className="mt-5 text-3xl font-bold text-slate-900">
            Application Submitted!
          </h1>

          <p className="mt-3 text-slate-600">
            Your application for{' '}
            <span className="font-semibold">
              {job.title}
            </span>{' '}
            at{' '}
            <span className="font-semibold">
              {job.company}
            </span>{' '}
            has been submitted successfully.
          </p>

          <Link
            to="/jobs"
            className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Browse More Jobs
          </Link>

        </div>

      </main>
    )
  }

  return (
    <main className="bg-slate-50 px-6 py-12">

      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8">

          <Link
            to={`/jobs/${job.id}`}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            ← Back to Job
          </Link>

          <div className="mt-6">

            <p className="text-sm font-medium text-blue-600">
              Applying to {job.company}
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
              {job.title}
            </h1>

            <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-500">
              <span>📍 {job.location}</span>
              <span>💼 {job.type}</span>
              <span>💰 {job.salary}</span>
            </div>

          </div>

        </div>

        {/* Application Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border bg-white p-6 shadow-sm md:p-8"
        >

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Your Information
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Fill in your details to apply for this position.
            </p>
          </div>

          {/* Name */}
          <div className="mt-8">
            <label
              htmlFor="name"
              className="font-medium text-slate-900"
            >
              Full Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="John Doe"
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Email */}
          <div className="mt-6">
            <label
              htmlFor="email"
              className="font-medium text-slate-900"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Phone */}
          <div className="mt-6">
            <label
              htmlFor="phone"
              className="font-medium text-slate-900"
            >
              Phone Number
            </label>

            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+234 800 000 0000"
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Resume */}
          <div className="mt-6">
            <label
              htmlFor="resume"
              className="font-medium text-slate-900"
            >
              Upload Resume
            </label>

            <input
              id="resume"
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-medium file:text-blue-600"
            />

            <p className="mt-2 text-sm text-slate-500">
              PDF, DOC or DOCX files are accepted.
            </p>
          </div>

          {/* Cover Letter */}
          <div className="mt-6">
            <label
              htmlFor="coverLetter"
              className="font-medium text-slate-900"
            >
              Cover Letter
            </label>

            <textarea
              id="coverLetter"
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              required
              rows="7"
              placeholder="Tell the company why you're a good fit for this position..."
              className="mt-2 w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />

            <p className="mt-2 text-sm text-slate-500">
              Explain your experience and why you're interested in the role.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-8 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Submit Application
          </button>

        </form>

      </div>

    </main>
  )
}

export default Apply