const API_URL =
  import.meta.env.VITE_API_URL ||
  'https://jobhub-xgkf.onrender.com/api'

export async function getJobs() {
  const response = await fetch(`${API_URL}/jobs`)

  if (!response.ok) {
    throw new Error('Failed to fetch jobs')
  }

  return response.json()
}

export async function getJobById(id) {
  const response = await fetch(`${API_URL}/jobs/${id}`)

  if (!response.ok) {
    throw new Error('Failed to fetch job')
  }

  return response.json()
}