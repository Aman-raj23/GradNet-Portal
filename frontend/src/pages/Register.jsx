import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate, Link } from 'react-router-dom'

export default function Register() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'alumni',
    batch: '',
    major: '',
    company: '',
    institute: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onChange = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const submit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true)
    // basic validation
    if (!form.name || !form.email || !form.role) {
      setError('Please fill all required fields.'); setLoading(false); return
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.'); setLoading(false); return
    }
    // Additional role-specific validation (prototype)
    if ((form.role === 'alumni' || form.role === 'student') && (!form.batch || !form.major)) {
      setError('Please provide graduation year and major.'); setLoading(false); return
    }
    if (form.role === 'employer' && !form.company) {
      setError('Please provide company name.'); setLoading(false); return
    }
    if (form.role === 'institute' && !form.institute) {
      setError('Please provide institute name.'); setLoading(false); return
    }

    try {
      // Prototype: immediately log in the newly registered user with chosen role
      await login({ email: form.email, role: form.role })
      navigate('/dashboard')
    } catch (e) {
      setError('Registration failed in prototype')
    } finally { setLoading(false) }
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
          <h2 className="text-3xl md:text-4xl font-bold mb-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Create your account</h2>
        </div>

        <form onSubmit={submit} className="card p-4 grid gap-3">
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input className="border rounded px-3 py-2 w-full" placeholder="John Doe" value={form.name} onChange={e => onChange('name', e.target.value)} required />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input type="email" className="border rounded px-3 py-2 w-full" placeholder="your.email@example.com" value={form.email} onChange={e => onChange('email', e.target.value)} required />
          </div>

          <div>
            <label className="text-sm text-gray-600">I am a</label>
            <select className="border rounded px-3 py-2 w-full" value={form.role} onChange={e => onChange('role', e.target.value)}>
              <option value="alumni">Alumni</option>
              <option value="student">Student</option>
              <option value="employer">Employer</option>
              <option value="institute">Institute</option>
            </select>
          </div>

          {(form.role === 'alumni' || form.role === 'student') && (
            <>
              <div>
                <label className="text-sm text-gray-600">Graduation Year</label>
                <input className="border rounded px-3 py-2 w-full" placeholder="2019" value={form.batch} onChange={e => onChange('batch', e.target.value)} />
              </div>
              <div>
                <label className="text-sm text-gray-600">Major</label>
                <input className="border rounded px-3 py-2 w-full" placeholder="Computer Science" value={form.major} onChange={e => onChange('major', e.target.value)} />
              </div>
            </>
          )}

          {form.role === 'employer' && (
            <div>
              <label className="text-sm text-gray-600">Company</label>
              <input className="border rounded px-3 py-2 w-full" placeholder="Tech Corp" value={form.company} onChange={e => onChange('company', e.target.value)} />
            </div>
          )}

          {form.role === 'institute' && (
            <div>
              <label className="text-sm text-gray-600">Institute Name</label>
              <input className="border rounded px-3 py-2 w-full" placeholder="University of Technology" value={form.institute} onChange={e => onChange('institute', e.target.value)} />
            </div>
          )}

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input type="password" className="border rounded px-3 py-2 w-full" placeholder="Create a password" value={form.password} onChange={e => onChange('password', e.target.value)} required />
          </div>
          <div>
            <label className="text-sm text-gray-600">Confirm Password</label>
            <input type="password" className="border rounded px-3 py-2 w-full" placeholder="Confirm your password" value={form.confirmPassword} onChange={e => onChange('confirmPassword', e.target.value)} required />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <button className="btn-primary" disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</button>
        </form>

        <div className="text-sm text-gray-600 text-center">
          Already have an account? <Link to="/login" className="text-primary underline">Sign in</Link>
        </div>
      </div>
    </div>
  )
}

