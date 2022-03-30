import React, { useState } from 'react'
import { setToken } from 'utils/storage'

export const AuthContext = React.createContext()

export const useAuth = () => React.useContext(AuthContext)

export function AuthProvider(props) {
  let [auth, setAuth] = useState('')
  let signin = (token, cb) => {
    if (token) {
      setToken(token)
      setAuth(token)
      return cb()
    }
  }

  let signout = (cb) => {
    setAuth('')
    cb()
  }
  const value = { auth, signin, signout }
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  )
}
