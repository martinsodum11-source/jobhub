import { API_URL } from './config'

export async function submitApplication(
  applicationData,
  token
) {
  const response = await fetch(
    `${API_URL}/applications`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(applicationData),
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message ||
        'Failed to submit application'
    )
  }

  return data
}

export async function getMyApplications(token) {
  const response = await fetch(
    `${API_URL}/my-applications`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message ||
        'Failed to fetch applications'
    )
  }

  return data
}