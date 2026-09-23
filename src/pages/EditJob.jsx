import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getJobById } from '../api/jobsApi'
import { API_URL } from '../api/config'

function EditJob() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    salary: '',
    category: '',
    experience: '',
    posted: '',
    deadline: '',
    description: '',
    requirements: '',
    benefits: '',
    skills: '',
  })

  useEffect(() => {
    const loadJob = async () => {
      try {
        const job = await getJobById(id)

        setFormData({
          title: job.title || '',
          company: job.company || '',
          location: job.location || '',
          type: job.type || 'Full-time',
          salary: job.salary || '',
          category: job.category || '',
          experience: job.experience || '',
          posted: job.posted || '',
          deadline: job.deadline || '',
          description: job.description || '',
          requirements: (job.requirements || []).join('\n'),
          benefits: (job.benefits || []).join('\n'),
          skills: (job.skills || []).join(', '),
        })
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

      if (!token) {
        throw new Error('You must be logged in.')
      }

      const jobData = {
        ...formData,

        requirements: formData.requirements
          .split('\n')
          .map((item) => item.trim())
          .filter(Boolean),

        benefits: formData.benefits
          .split('\n')
          .map((item) => item.trim())
          .filter(Boolean),

        skills: formData.skills
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
      }

      const response = await fetch(
        `${API_URL}/jobs/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(jobData),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to update job'
        )
      }

      setSuccess('Job updated successfully!')

      setTimeout(() => {
        navigate(`/jobs/${id}`)
      }, 1000)
    } catch (error) {
      setError(
        error.message || 'Failed to update job'
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <p className="text-slate-500">
            Loading job...
          </p>
        </div>
      </main>
    )
  }

  if (error && !formData.title) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-xl bg-red-100 p-4 text-red-700">
            {error}
          </div>

          <Link
            to="/employer/dashboard"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            ← Back to dashboard
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">

        <Link
          to="/employer/dashboard"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          ← Back to dashboard
        </Link>

        <div className="mb-8 mt-6">
          <h1 className="text-3xl font-bold text-slate-900">
            Edit Job
          </h1>

          <p className="mt-2 text-slate-600">
            Update the details of your job posting.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm">

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
                Job Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Company
              </label>

              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Location
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Job Type
              </label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="Full-time">
                  Full-time
                </option>

                <option value="Part-time">
                  Part-time
                </option>

                <option value="Contract">
                  Contract
                </option>

                <option value="Internship">
                  Internship
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Salary
              </label>

              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Experience Level
              </label>

              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Posted
              </label>

              <input
                type="text"
                name="posted"
                value={formData.posted}
                onChange={handleChange}
                required
                placeholder="e.g. Just now"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Application Deadline
              </label>

              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Job Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="7"
                className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Requirements
              </label>

              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                required
                rows="6"
                className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />

              <p className="mt-2 text-sm text-slate-500">
                One requirement per line.
              </p>
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Benefits
              </label>

              <textarea
                name="benefits"
                value={formData.benefits}
                onChange={handleChange}
                required
                rows="5"
                className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />

              <p className="mt-2 text-sm text-slate-500">
                One benefit per line.
              </p>
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Skills
              </label>

              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />

              <p className="mt-2 text-sm text-slate-500">
                Separate skills with commas.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">

              <button
                type="submit"
                disabled={submitting}
                className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting
                  ? 'Saving Changes...'
                  : 'Save Changes'}
              </button>

              <Link
                to="/employer/dashboard"
                className="flex-1 rounded-lg border border-slate-300 px-6 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Cancel
              </Link>

            </div>

          </form>
        </div>
      </div>
    </main>
  )
}

export default EditJob