import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute({ allowedRole }) {
  const token = localStorage.getItem('token')
  const savedUser = localStorage.getItem('user')

  if (!token || !savedUser) {
    return <Navigate to="/login" replace />
  }

  let user

  try {
    user = JSON.parse(savedUser)
  } catch {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    return <Navigate to="/login" replace />
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default ProtectedRoute