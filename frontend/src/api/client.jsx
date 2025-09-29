import { useAuth } from '../context/AuthContext.jsx'

export function useApi() {
  const { token } = useAuth()
  const base = 'http://localhost:5000/api'

  const request = async (path, options={}) => {
    const res = await fetch(base + path, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    })
    if (!res.ok) throw new Error(await res.text())
    return res.json()
  }

  return {
    get: (p) => request(p),
    post: (p, body) => request(p, { method: 'POST', body: JSON.stringify(body) }),
    put: (p, body) => request(p, { method: 'PUT', body: JSON.stringify(body) }),
    del: (p) => request(p, { method: 'DELETE' })
  }
}
