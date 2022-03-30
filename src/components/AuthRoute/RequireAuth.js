import { Navigate, useLocation } from 'react-router'
import { getToken } from 'utils/storage'
import { useAuth } from './AuthProvider'
export function RequireAuth({ children }) {
  console.log(children)
  let auth = useAuth()
  let location = useLocation()

  if (!auth.auth && !getToken()) {
    return <Navigate to={'/login'} stat={{ from: location }} replace></Navigate>
  }

  return children
}
