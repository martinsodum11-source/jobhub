

import { API_URL } from './config'

export async function getJobs() {
  const response = await fetch(
    `${API_URL}/jobs`
  )

  if (!response.ok) {
    throw new Error(
      'Failed to fetch jobs'
    )
  }

  return response.json()
}

export async function getJobById(id) {
  const response = await fetch(
    `${API_URL}/jobs/${id}`
  )

  if (!response.ok) {
    throw new Error(
      'Failed to fetch job'
    )
  }

  return response.json()
}