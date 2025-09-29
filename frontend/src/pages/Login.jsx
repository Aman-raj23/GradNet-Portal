import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

const roles = ['admin','alumni','student','employer','institute']
const emails = {
  admin: 'admin@gradnet.edu',
  alumni: 'raj@alumni.edu',
  student: 'john@student.edu',
  employer: 'hr@company.com',
  institute: 'dean@college.edu'
}

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [role, setRole] = useState('alumni')
  const [email, setEmail] = useState(emails['alumni'])
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault(); setError('')
    try {
      await login({ email, role })
      navigate(role === 'admin' ? '/admin' : '/dashboard')
    } catch (e) { setError('Login failed in prototype') }
  }

  const loginWithLinkedIn = async () => {
    setError('')
    try {
      // Prototype: mock LinkedIn login
      await login({ email: 'linkedin_user@gradnet.linked', role: 'alumni' })
      navigate('/dashboard')
    } catch (e) { setError('LinkedIn login failed in prototype') }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-primary/10 via-transparent to-black/20">
      <div className="w-full max-w-md space-y-5">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="p-0 rounded-xl bg-transparent">
              <img src="/logo.png" alt="GradNet Logo" width={72} height={72} className="mx-auto" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Welcome back</h2>
          <p className="text-gray-600">Sign in to your GradNet account</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
          <div className="text-center mb-4">
            <div className="text-2xl font-semibold text-gray-900">Sign In</div>
            <div className="text-gray-600 text-sm">Enter your credentials to access your account</div>
          </div>
          <form onSubmit={submit} className="grid gap-4">
            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2 text-center">{error}</div>
            )}

            <div>
              <label className="text-sm text-gray-700">Email</label>
              <input className="mt-1 border border-gray-300 bg-white text-black rounded px-3 py-2 w-full placeholder-black/50" placeholder="Enter your email" value={email} onChange={e=>setEmail(e.target.value)} />
            </div>
            <div>
              <label className="text-sm text-gray-700">Role</label>
              <select className="mt-1 border border-gray-300 bg-white text-black rounded px-3 py-2 w-full" value={role} onChange={e=>{ setRole(e.target.value); setEmail(emails[e.target.value]) }}>
                {roles.map(r=> <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <button className="btn-accent w-full" type="submit">Login</button>
            <button type="button" onClick={loginWithLinkedIn} className="w-full btn-primary bg-[#0a66c2] hover:bg-[#0a66c2]/90">Login with LinkedIn</button>
          </form>

          <div className="mt-5 text-center text-sm text-gray-600">
            Don't have an account? <a href="/register" className="text-primary underline">Sign up here</a>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-gray-50 border border-gray-200">
            <p className="text-sm font-medium mb-2 text-gray-900">Demo Credentials (use Email + select matching Role)</p>
            <div className="text-xs grid grid-cols-1 gap-1 text-gray-700">
              <p>Admin: admin@gradnet.edu</p>
              <p>Alumni: raj@alumni.edu</p>
              <p>Alumni: arjun@alumni.edu</p>
              <p>Alumni: priya@alumni.edu</p>
              <p>Student: john@student.edu</p>
              <p>Employer: hr@company.com</p>
              <p>Institute: dean@college.edu</p>
            </div>
            <div className="text-[11px] text-gray-600 mt-2">Password is not required in this prototype.</div>
          </div>
        </div>
      </div>
    </div>
  )
}

