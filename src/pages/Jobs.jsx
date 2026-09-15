import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import JobCard from '../components/JobCard'
import jobs from '../data/jobs'

function Jobs({ savedJobs, toggleSaveJob }) {
  const [searchParams, setSearchParams] = useSearchParams()

  const [search, setSearch] = useState(
    searchParams.get('search') || ''
  )

  const [type, setType] = useState(
    searchParams.get('type') || 'All'
  )

  const [location, setLocation] = useState(
    searchParams.get('location') || 'All'
  )

  const [category, setCategory] = useState(
    searchParams.get('category') || 'All'
  )

  const filteredJobs = jobs.filter((job) => {
    const searchText = search.toLowerCase()

    const matchesSearch =
      job.title.toLowerCase().includes(searchText) ||
      job.company.toLowerCase().includes(searchText) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(searchText)
      )

    const matchesType =
      type === 'All' || job.type === type

    const matchesLocation =
      location === 'All' || job.location === location

    const matchesCategory =
      category === 'All' || job.category === category

    return (
      matchesSearch &&
      matchesType &&
      matchesLocation &&
      matchesCategory
    )
  })

  const updateFilters = (newFilters) => {
    const filters = {
      search,
      type,
      location,
      category,
      ...newFilters,
    }

    const params = {}

    if (filters.search) {
      params.search = filters.search
    }

    if (filters.type !== 'All') {
      params.type = filters.type
    }

    if (filters.location !== 'All') {
      params.location = filters.location
    }

    if (filters.category !== 'All') {
      params.category = filters.category
    }

    setSearchParams(params)
  }

  const clearFilters = () => {
    setSearch('')
    setType('All')
    setLocation('All')
    setCategory('All')
    setSearchParams({})
  }

  return (
    <main className="bg-slate-50 px-6 py-12">

      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Explore opportunities
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Find Jobs
          </h1>

          <p className="mt-2 text-slate-600">
            Search and filter opportunities that match your skills.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-8 rounded-2xl border bg-white p-5 shadow-sm">

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

            {/* Search */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Search
              </label>

              <input
                type="text"
                placeholder="Job title, company or skill..."
                value={search}
                onChange={(e) => {
                  const value = e.target.value

                  setSearch(value)

                  updateFilters({
                    search: value,
                  })
                }}
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Type */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Job Type
              </label>

              <select
                value={type}
                onChange={(e) => {
                  const value = e.target.value

                  setType(value)

                  updateFilters({
                    type: value,
                  })
                }}
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              >
                <option value="All">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Location
              </label>

              <select
                value={location}
                onChange={(e) => {
                  const value = e.target.value

                  setLocation(value)

                  updateFilters({
                    location: value,
                  })
                }}
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              >
                <option value="All">All Locations</option>
                <option value="Remote">Remote</option>
                <option value="Lagos, Nigeria">Lagos</option>
                <option value="Abuja, Nigeria">Abuja</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => {
                  const value = e.target.value

                  setCategory(value)

                  updateFilters({
                    category: value,
                  })
                }}
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              >
                <option value="All">All Categories</option>
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
              </select>
            </div>

          </div>

          {/* Clear Filters */}
          <div className="mt-5 flex items-center justify-between border-t pt-5">

            <p className="text-sm text-slate-500">
              {filteredJobs.length}{' '}
              {filteredJobs.length === 1 ? 'job' : 'jobs'} found
            </p>

            <button
              onClick={clearFilters}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Clear filters
            </button>

          </div>

        </div>

        {/* Job Results */}
        {filteredJobs.length > 0 ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isSaved={savedJobs.some(
                  (savedJob) => savedJob.id === job.id
                )}
                toggleSaveJob={toggleSaveJob}
              />
            ))}

          </div>
        ) : (
          <div className="mt-10 rounded-2xl border bg-white p-12 text-center shadow-sm">

            <div className="text-5xl">
              🔍
            </div>

            <h2 className="mt-4 text-2xl font-bold text-slate-900">
              No jobs found
            </h2>

            <p className="mt-2 text-slate-500">
              Try changing your search or filters.
            </p>

            <button
              onClick={clearFilters}
              className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
            >
              Clear Filters
            </button>

          </div>
        )}

      </div>

    </main>
  )
}

export default Jobs