import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../api/authApi'

function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'jobseeker',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

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

    try {
      const data = await registerUser(formData)

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      navigate('/')
    } catch (error) {
      setError(error.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid-cols-2">

        {/* Left side */}
        <div className="hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xl font-bold"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm">
                J
              </span>

              JobHub
            </Link>

            <div className="mt-20 max-w-md">
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                Your next opportunity
              </p>

              <h1 className="mt-4 text-4xl font-bold leading-tight">
                Build your career with the right opportunities.
              </h1>

              <p className="mt-5 text-lg leading-8 text-slate-300">
                Create your JobHub account to discover jobs,
                connect with employers, and take the next step
                in your career.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 border-t border-slate-800 pt-8">
            <div>
              <p className="text-2xl font-bold">10K+</p>
              <p className="mt-1 text-sm text-slate-400">
                Opportunities
              </p>
            </div>

            <div>
              <p className="text-2xl font-bold">2K+</p>
              <p className="mt-1 text-sm text-slate-400">
                Employers
              </p>
            </div>

            <div>
              <p className="text-2xl font-bold">50+</p>
              <p className="mt-1 text-sm text-slate-400">
                Categories
              </p>
            </div>
          </div>
        </div>

        {/* Form side */}
        <div className="p-8 sm:p-10 lg:p-12">
          <div className="mx-auto max-w-md">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Get started
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                Create your account
              </h2>

              <p className="mt-2 text-slate-600">
                Join JobHub and start finding or posting opportunities.
              </p>
            </div>

            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
                <p className="text-sm font-medium text-red-700">
                  {error}
                </p>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Full name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
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
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <span className="text-xs text-slate-400">
                    Minimum 6 characters
                  </span>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    type={
                      showPassword
                        ? 'text'
                        : 'password'
                    }
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    placeholder="Create a password"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-20 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (current) => !current
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 px-2 text-sm font-semibold text-slate-500 hover:text-slate-900"
                  >
                    {showPassword
                      ? 'Hide'
                      : 'Show'}
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-semibold text-slate-700">
                  I am registering as
                </label>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label
                    className={`cursor-pointer rounded-xl border p-4 transition ${
                      formData.role === 'jobseeker'
                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-100'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="jobseeker"
                      checked={
                        formData.role === 'jobseeker'
                      }
                      onChange={handleChange}
                      className="sr-only"
                    />

                    <span className="block text-sm font-bold text-slate-900">
                      Job Seeker
                    </span>

                    <span className="mt-1 block text-xs leading-5 text-slate-500">
                      Find jobs and apply to opportunities.
                    </span>
                  </label>

                  <label
                    className={`cursor-pointer rounded-xl border p-4 transition ${
                      formData.role === 'employer'
                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-100'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="employer"
                      checked={
                        formData.role === 'employer'
                      }
                      onChange={handleChange}
                      className="sr-only"
                    />

                    <span className="block text-sm font-bold text-slate-900">
                      Employer
                    </span>

                    <span className="mt-1 block text-xs leading-5 text-slate-500">
                      Post jobs and find qualified talent.
                    </span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? 'Creating account...'
                  : 'Create account'}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
              >
                Log in
              </Link>
            </p>

            <p className="mt-6 text-center text-xs leading-5 text-slate-400">
              By creating an account, you agree to use
              JobHub responsibly and provide accurate
              information.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Register