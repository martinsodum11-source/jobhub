import { useNavigate } from 'react-router-dom'

const categories = [
  {
    name: 'Frontend Development',
    description: 'Build modern web interfaces and experiences',
    shortName: 'Frontend',
    icon: (
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m8 9-3 3 3 3M16 9l3 3-3 3M14 6l-4 12"
        />
      </svg>
    ),
  },
  {
    name: 'Backend Development',
    description: 'Build APIs, services and server systems',
    shortName: 'Backend',
    icon: (
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path
          strokeLinecap="round"
          d="M8 8h.01M12 8h.01M16 8h.01M8 12h.01M12 12h.01M16 12h.01M8 16h8"
        />
      </svg>
    ),
  },
  {
    name: 'Design',
    description: 'Create meaningful digital experiences',
    shortName: 'Design',
    icon: (
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m14.5 4.5 5 5M4 20l3.5-.8L19 7.7a2.12 2.12 0 0 0-3-3L4.5 16.2 4 20Z"
        />
        <path
          strokeLinecap="round"
          d="m14 10-4-4"
        />
      </svg>
    ),
  },
  {
    name: 'Mobile Development',
    description: 'Build applications for modern devices',
    shortName: 'Mobile',
    icon: (
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="7" y="3" width="10" height="18" rx="2" />
        <path
          strokeLinecap="round"
          d="M10 6h4M11 18h2"
        />
      </svg>
    ),
  },
  {
    name: 'Data Science',
    description: 'Turn data into insights and decisions',
    shortName: 'Data',
    icon: (
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 19V5M4 19h16"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m7 15 4-4 3 2 5-6"
        />
      </svg>
    ),
  },
  {
    name: 'DevOps',
    description: 'Build reliable infrastructure and systems',
    shortName: 'DevOps',
    icon: (
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 18h10a4 4 0 0 0 .7-7.94A6 6 0 0 0 6.2 8.5 4.5 4.5 0 0 0 7 18Z"
        />
        <path
          strokeLinecap="round"
          d="M9 14h6"
        />
      </svg>
    ),
  },
]

function JobCategories() {
  const navigate = useNavigate()

  const handleCategoryClick = (category) => {
    navigate(`/jobs?category=${encodeURIComponent(category)}`)
  }

  return (
    <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />

              <span className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-600">
                Explore by category
              </span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Find opportunities in your field
            </h2>

            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
              Explore roles across some of the most in-demand career
              categories and find your next opportunity.
            </p>
          </div>

          <button
            onClick={() => navigate('/jobs')}
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
          >
            Browse all jobs

            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M13 6l6 6-6 6"
              />
            </svg>
          </button>
        </div>

        {/* Categories */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <button
              key={category.name}
              type="button"
              onClick={() => handleCategoryClick(category.name)}
              className="group flex min-h-[190px] flex-col rounded-2xl border border-slate-200 bg-white p-6 text-left transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/60"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100 transition duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:ring-blue-600">
                  {category.icon}
                </div>

                <span className="text-xs font-semibold uppercase tracking-wide text-slate-300 transition group-hover:text-blue-500">
                  {category.shortName}
                </span>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-bold tracking-tight text-slate-950">
                  {category.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {category.description}
                </p>
              </div>

              <div className="mt-auto flex items-center gap-2 pt-5 text-sm font-semibold text-blue-600">
                Explore jobs

                <svg
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14M13 6l6 6-6 6"
                  />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default JobCategories