import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getJobById } from '../api/jobsApi'
import { submitApplication } from '../api/applicationsApi'

function Apply() {
  const { id } = useParams()
  const navigate = useNavigate()

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
        throw new Error(
          'You must be logged in to apply for a job.'
        )
      }

      const user = JSON.parse(savedUser)

      if (user.role !== 'jobseeker') {
        throw new Error(
          'Only job seekers can apply for jobs.'
        )
      }

      await submitApplication({
        job: id,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        coverLetter: formData.coverLetter,
        resume: formData.resume,
      }, token)

      setSuccess(
        'Your application has been submitted successfully!'
      )

      setFormData({
        fullName: '',
        email: '',
        phone: '',
        coverLetter: '',
        resume: '',
      })
    } catch (error) {
      setError(
        error.message ||
          'Failed to submit application.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-slate-500">
            Loading...
          </p>
        </div>
      </main>
    )
  }

  if (!job) {
    return (
      <main className="min-h-screen px-6 py-16">
        <div className="mx-auto max-w-3xl">

          <p className="text-red-600">
            {error || 'Job not found.'}
          </p>

          <Link
            to="/jobs"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            ← Back to jobs
          </Link>

        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-3xl">

        <Link
          to={`/jobs/${job._id}`}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          ← Back to job
        </Link>

        <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm">

          <div className="mb-8">

            <p className="font-medium text-blue-600">
              {job.company}
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Apply for {job.title}
            </h1>

            <p className="mt-2 text-slate-500">
              {job.location} · {job.type}
            </p>

          </div>

          {success && (
            <div className="mb-6 rounded-lg bg-green-100 p-4 text-green-700">
              {success}
            </div>
          )}

          {error && (
            <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-700">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Phone
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Enter your phone number"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Cover Letter
              </label>

              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                required
                rows="7"
                placeholder="Tell the employer why you're a good fit for this job..."
                className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Resume
              </label>

              <input
                type="text"
                name="resume"
                value={formData.resume}
                onChange={handleChange}
                placeholder="Paste your resume link"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />

              <p className="mt-2 text-sm text-slate-500">
                Resume file upload will be added later.
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting
                ? 'Submitting...'
                : 'Submit Application'}
            </button>

          </form>

        </div>
      </div>
    </main>
  )
}

export default Apply