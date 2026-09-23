const API_URL =
  import.meta.env.VITE_API_URL ||
  'https://jobhub-xgkf.onrender.com/api'

async function request(url, options = {}) {
  const controller = new AbortController()

  const timeout = setTimeout(() => {
    controller.abort()
  }, 15000)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })

    const contentType =
      response.headers.get('content-type') || ''

    let data = {}

    if (contentType.includes('application/json')) {
      data = await response.json()
    } else {
      const text = await response.text()

      data = {
        message: text || 'The server returned an unexpected response.',
      }
    }

    if (!response.ok) {
      throw new Error(
        data.message ||
          `Request failed with status ${response.status}`
      )
    }

    return data
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error(
        'The server took too long to respond. Please try again.'
      )
    }

    if (
      error instanceof TypeError &&
      error.message === 'Failed to fetch'
    ) {
      throw new Error(
        'Unable to connect to the JobHub server. Please try again.'
      )
    }

    throw error
  } finally {
    clearTimeout(timeout)
  }
}

export async function registerUser(userData) {
  return request(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
}

export async function loginUser(credentials) {
  return request(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
}