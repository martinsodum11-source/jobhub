import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const API_URL =
  import.meta.env.VITE_API_URL ||
  'http://localhost:5000/api'

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
        throw new Error(
          'You must be logged in to post a job.'
        )
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
        `${API_URL}/jobs`,
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
      setError(
        error.message || 'Failed to create job'
      )
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'

  const textareaClass =
    'mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Link
                  to="/employer/dashboard"
                  className="transition hover:text-blue-600"
                >
                  Employer Dashboard
                </Link>

                <span>/</span>

                <span className="font-medium text-slate-700">
                  Post a Job
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Post a new job
              </h1>

              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
                Tell candidates about the role, your expectations,
                and what your company offers.
              </p>
            </div>

            <Link
              to="/employer/dashboard"
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
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

              Dashboard
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">

          {/* Form */}
          <div>
            {success && (
              <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
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
                        d="m5 12 4 4L19 6"
                      />
                    </svg>
                  </div>

                  <div>
                    <h2 className="font-semibold text-emerald-900">
                      Job published
                    </h2>

                    <p className="mt-1 text-sm text-emerald-700">
                      Your job has been posted successfully.
                      Redirecting you to the job listing...
                    </p>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                      />

                      <path
                        strokeLinecap="round"
                        d="M12 8v4m0 4h.01"
                      />
                    </svg>
                  </div>

                  <div>
                    <h2 className="font-semibold text-red-900">
                      Unable to publish job
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-red-700">
                      {error}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Basic Information */}
              <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-6 py-5 sm:px-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
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
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 7V5h8v2M3 12h18"
                        />
                      </svg>
                    </div>

                    <div>
                      <h2 className="font-bold text-slate-950">
                        Job information
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Start with the essential details candidates
                        need to understand the role.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 p-6 sm:p-8">
                  <div>
                    <label
                      htmlFor="title"
                      className="text-sm font-semibold text-slate-800"
                    >
                      Job title
                    </label>

                    <input
                      id="title"
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Senior React Developer"
                      className={inputClass}
                    />

                    <p className="mt-2 text-xs text-slate-400">
                      Use a clear title that candidates will
                      immediately understand.
                    </p>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="company"
                        className="text-sm font-semibold text-slate-800"
                      >
                        Company
                      </label>

                      <input
                        id="company"
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        placeholder="e.g. TechFlow"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="location"
                        className="text-sm font-semibold text-slate-800"
                      >
                        Location
                      </label>

                      <input
                        id="location"
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Remote or Lagos, Nigeria"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="type"
                        className="text-sm font-semibold text-slate-800"
                      >
                        Employment type
                      </label>

                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className={inputClass}
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
                      <label
                        htmlFor="salary"
                        className="text-sm font-semibold text-slate-800"
                      >
                        Salary
                      </label>

                      <input
                        id="salary"
                        type="text"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        required
                        placeholder="e.g. $2,000 - $3,500"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="category"
                        className="text-sm font-semibold text-slate-800"
                      >
                        Job category
                      </label>

                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      >
                        <option value="">
                          Select a category
                        </option>

                        <option value="Frontend Development">
                          Frontend Development
                        </option>

                        <option value="Backend Development">
                          Backend Development
                        </option>

                        <option value="Design">
                          Design
                        </option>

                        <option value="Mobile Development">
                          Mobile Development
                        </option>

                        <option value="Data Science">
                          Data Science
                        </option>

                        <option value="DevOps">
                          DevOps
                        </option>

                        <option value="Product Management">
                          Product Management
                        </option>

                        <option value="Marketing">
                          Marketing
                        </option>

                        <option value="Customer Support">
                          Customer Support
                        </option>

                        <option value="Other">
                          Other
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="experience"
                        className="text-sm font-semibold text-slate-800"
                      >
                        Experience level
                      </label>

                      <select
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      >
                        <option value="">
                          Select experience level
                        </option>

                        <option value="Entry Level">
                          Entry Level
                        </option>

                        <option value="Junior">
                          Junior
                        </option>

                        <option value="Intermediate">
                          Intermediate
                        </option>

                        <option value="Senior">
                          Senior
                        </option>

                        <option value="Lead">
                          Lead
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="deadline"
                      className="text-sm font-semibold text-slate-800"
                    >
                      Application deadline
                    </label>

                    <input
                      id="deadline"
                      type="date"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />

                    <p className="mt-2 text-xs text-slate-400">
                      Choose the final date candidates can submit
                      their applications.
                    </p>
                  </div>
                </div>
              </section>

              {/* Description */}
              <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-6 py-5 sm:px-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
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
                          d="M6 4h12M6 8h12M6 12h8M6 16h12M6 20h8"
                        />
                      </svg>
                    </div>

                    <div>
                      <h2 className="font-bold text-slate-950">
                        About the role
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Give candidates a clear picture of what
                        they'll be doing.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <label
                    htmlFor="description"
                    className="text-sm font-semibold text-slate-800"
                  >
                    Job description
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="9"
                    placeholder="Describe the role, responsibilities, team, day-to-day work, and what success looks like..."
                    className={textareaClass}
                  />

                  <p className="mt-2 text-xs text-slate-400">
                    Be specific about the role and the impact the
                    person will have.
                  </p>
                </div>
              </section>

              {/* Requirements */}
              <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-6 py-5 sm:px-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
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
                          d="M9 11l3 3L21 5"
                        />

                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
                        />
                      </svg>
                    </div>

                    <div>
                      <h2 className="font-bold text-slate-950">
                        Candidate requirements
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Define the experience and qualifications
                        you're looking for.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 p-6 sm:p-8">
                  <div>
                    <label
                      htmlFor="requirements"
                      className="text-sm font-semibold text-slate-800"
                    >
                      Requirements
                    </label>

                    <textarea
                      id="requirements"
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleChange}
                      required
                      rows="7"
                      placeholder={`Enter one requirement per line.

Example:
2+ years of React experience
Strong JavaScript knowledge
Experience with Git
Good communication skills`}
                      className={textareaClass}
                    />

                    <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
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
                          d="M12 20h9"
                        />

                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"
                        />
                      </svg>

                      Enter each requirement on a new line.
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="skills"
                      className="text-sm font-semibold text-slate-800"
                    >
                      Required skills
                    </label>

                    <input
                      id="skills"
                      type="text"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      required
                      placeholder="React, JavaScript, Tailwind CSS, Git"
                      className={inputClass}
                    />

                    <p className="mt-2 text-xs text-slate-400">
                      Separate each skill with a comma.
                    </p>
                  </div>
                </div>
              </section>

              {/* Benefits */}
              <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-6 py-5 sm:px-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
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
                          d="M12 3v18M3 12h18"
                        />

                        <rect
                          x="4"
                          y="5"
                          width="16"
                          height="14"
                          rx="2"
                        />
                      </svg>
                    </div>

                    <div>
                      <h2 className="font-bold text-slate-950">
                        Benefits & perks
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Highlight what makes this opportunity
                        attractive to candidates.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <label
                    htmlFor="benefits"
                    className="text-sm font-semibold text-slate-800"
                  >
                    Benefits
                  </label>

                  <textarea
                    id="benefits"
                    name="benefits"
                    value={formData.benefits}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder={`Enter one benefit per line.

Example:
Remote work
Health insurance
Flexible working hours
Professional development budget`}
                    className={textareaClass}
                  />

                  <p className="mt-2 text-xs text-slate-400">
                    Enter each benefit on a new line.
                  </p>
                </div>
              </section>

              {/* Submit */}
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Link
                  to="/employer/dashboard"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin"
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

                      Publishing...
                    </>
                  ) : (
                    <>
                      Publish Job

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
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-5">

              {/* Hiring Tips */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                      />

                      <path
                        strokeLinecap="round"
                        d="M12 11v5"
                      />

                      <path
                        strokeLinecap="round"
                        d="M12 8h.01"
                      />
                    </svg>
                  </div>

                  <h2 className="font-bold text-slate-950">
                    Hiring tips
                  </h2>
                </div>

                <div className="mt-5 space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Write a clear title
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Avoid vague titles. Use the actual position
                      name candidates search for.
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Be specific
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Explain the responsibilities and skills
                      needed for the role.
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Show the value
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Mention benefits, flexibility, growth, and
                      other things candidates care about.
                    </p>
                  </div>
                </div>
              </div>

              {/* Publishing Checklist */}
              <div className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                  Before publishing
                </p>

                <h2 className="mt-2 text-lg font-bold">
                  Make your listing count
                </h2>

                <div className="mt-5 space-y-3">
                  {[
                    'Clear job title',
                    'Accurate location',
                    'Salary information',
                    'Required experience',
                    'Detailed description',
                    'Relevant skills',
                    'Application deadline',
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10">
                        <svg
                          className="h-3 w-3 text-blue-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m5 12 4 4L19 6"
                          />
                        </svg>
                      </div>

                      <span className="text-sm text-slate-300">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Privacy note */}
              <div className="rounded-2xl border border-slate-200 bg-slate-100 p-5">
                <div className="flex gap-3">
                  <svg
                    className="mt-0.5 h-5 w-5 shrink-0 text-slate-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3 5 6v5c0 4.5 2.8 8.3 7 10 4.2-1.7 7-5.5 7-10V6l-7-3Z"
                    />

                    <path
                      strokeLinecap="round"
                      d="m9 12 2 2 4-4"
                    />
                  </svg>

                  <p className="text-xs leading-5 text-slate-500">
                    Review your information carefully before
                    publishing. Candidates will see the details
                    included in this listing.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default PostJob