import { useNavigate } from 'react-router-dom'

const categories = [
  {
    name: 'Frontend Development',
    icon: '💻',
    description: 'Build modern web interfaces',
  },
  {
    name: 'Backend Development',
    icon: '⚙️',
    description: 'Build APIs and server systems',
  },
  {
    name: 'Design',
    icon: '🎨',
    description: 'Create beautiful user experiences',
  },
  {
    name: 'Mobile Development',
    icon: '📱',
    description: 'Build mobile applications',
  },
  {
    name: 'Data Science',
    icon: '📊',
    description: 'Work with data and analytics',
  },
  {
    name: 'DevOps',
    icon: '☁️',
    description: 'Build and manage infrastructure',
  },
]

function JobCategories() {
  const navigate = useNavigate()

  const handleCategoryClick = (category) => {
    navigate(`/jobs?category=${encodeURIComponent(category)}`)
  }

  return (
    <section className="bg-slate-50 px-6 py-16">

      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Explore opportunities
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Popular Categories
            </h2>

            <p className="mt-2 max-w-xl text-slate-600">
              Explore jobs by category and find opportunities
              that match your skills.
            </p>
          </div>

          <button
            onClick={() => navigate('/jobs')}
            className="w-fit font-medium text-blue-600 hover:text-blue-700"
          >
            View all jobs →
          </button>

        </div>

        {/* Categories */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl transition group-hover:bg-blue-100">
                  {category.icon}
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    {category.name}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {category.description}
                  </p>
                </div>

              </div>

              <div className="mt-5 text-sm font-medium text-blue-600">
                Explore jobs →
              </div>

            </button>
          ))}

        </div>

      </div>

    </section>
  )
}

export default JobCategories
