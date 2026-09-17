import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function PostJob() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    salary: '',
    category: '',
    experience: '',
    posted: 'Just now',
    deadline: '',
    description: '',
    requirements: '',
    benefits: '',
    skills: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const token = localStorage.getItem('token')

      if (!token) {
        throw new Error('You must be logged in to post a job.')
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
        'http://localhost:5000/api/jobs',
        {
          method: 'POST',
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
          data.message || 'Failed to create job'
        )
      }

      setSuccess('Job posted successfully!')

      setTimeout(() => {
        navigate(`/jobs/${data.job._id}`)
      }, 1000)
    } catch (error) {
      setError(error.message || 'Failed to create job')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Post a Job
          </h1>

          <p className="mt-2 text-slate-600">
            Create a new job opportunity for people using JobHub.
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

            {/* Job Title */}
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
                placeholder="e.g. Senior React Developer"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* Company */}
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
                placeholder="e.g. TechFlow"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* Location */}
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
                placeholder="e.g. Remote or Lagos, Nigeria"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* Job Type */}
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
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            {/* Salary */}
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
                placeholder="e.g. $2,000 - $3,500"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* Category */}
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
                placeholder="e.g. Frontend Development"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* Experience */}
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
                placeholder="e.g. Junior, Intermediate, Senior"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* Deadline */}
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

            {/* Description */}
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
                placeholder="Describe the role, responsibilities, and what the person will be doing..."
                className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* Requirements */}
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
                placeholder={`Enter one requirement per line.\nExample:\n2+ years of React experience\nGood knowledge of JavaScript\nExperience with Git`}
                className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />

              <p className="mt-2 text-sm text-slate-500">
                Enter each requirement on a new line.
              </p>
            </div>

            {/* Benefits */}
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
                placeholder={`Enter one benefit per line.\nExample:\nRemote work\nHealth insurance\nFlexible working hours`}
                className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />

              <p className="mt-2 text-sm text-slate-500">
                Enter each benefit on a new line.
              </p>
            </div>

            {/* Skills */}
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
                placeholder="React, JavaScript, Tailwind CSS, Git"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />

              <p className="mt-2 text-sm text-slate-500">
                Separate skills with commas.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Posting Job...' : 'Post Job'}
            </button>

          </form>

        </div>

      </div>
    </main>
  )
}

export default PostJob  