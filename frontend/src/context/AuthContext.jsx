import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('gradnet_auth')
    if (saved) {
      const { user, token } = JSON.parse(saved)
      setUser(user)
      setToken(token)
    }
  }, [])

  const login = async ({ email, role }) => {
    // mock login (frontend-only fallback)
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, role })
    })
    if (!res.ok) throw new Error('Login failed')
    const data = await res.json()
    setUser(data.user)
    setToken(data.token)
    localStorage.setItem('gradnet_auth', JSON.stringify({ user: data.user, token: data.token }))
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('gradnet_auth')
  }

  const value = useMemo(() => ({ user, token, login, logout }), [user, token])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() { return useContext(AuthContext) }
