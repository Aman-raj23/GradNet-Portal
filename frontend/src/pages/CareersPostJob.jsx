import React, { useState } from 'react'
import { useApi } from '../api/client.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function CareersPostJob() {
  const { user } = useAuth()
  const { post } = useApi()
  const [form, setForm] = useState({
    title: '',
    company: '',
    city: '',
    type: 'Full-time',
    experience: '',
    salary: '',
    description: '',
    requirements: '',
    benefits: '',
    remote: false,
    urgent: false,
  })
  const [msg, setMsg] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const canPost = ['alumni','employer','admin'].includes(user?.role)

  const submit = async (e) => {
    e.preventDefault();
    if (!canPost) return setMsg('Permission denied for this role.')
    if (!form.title || !form.company || !form.city || !form.type || !form.description) {
      return setMsg('Please fill all required fields (title, company, location, type, description).')
    }
    try {
      setSubmitting(true)
      const res = await post('/jobs', form)
      setMsg('Posted: ' + (res?.title || form.title))
      setForm({
        title: '', company: '', city: '', type: 'Full-time',
        experience: '', salary: '', description: '', requirements: '', benefits: '',
        remote: false, urgent: false,
      })
    } catch (e) { setMsg('Failed to post') }
    finally { setSubmitting(false) }
  }

  return (
    <div className="container-safe py-8 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold">Post a Job</h1>
        <p className="opacity-80">Share opportunities with our talented alumni network</p>
      </div>

      <form onSubmit={submit} className="glass-card card p-5 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Job Title *</label>
            <input className="mt-1 w-full border rounded px-3 py-2" placeholder="e.g., Senior Software Engineer" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} required />
          </div>
          <div>
            <label className="text-sm font-medium">Company *</label>
            <input className="mt-1 w-full border rounded px-3 py-2" placeholder="Company name" value={form.company} onChange={e=>setForm(f=>({...f,company:e.target.value}))} required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Location *</label>
            <input className="mt-1 w-full border rounded px-3 py-2" placeholder="e.g., Bengaluru, KA" value={form.city} onChange={e=>setForm(f=>({...f,city:e.target.value}))} required />
          </div>
          <div>
            <label className="text-sm font-medium">Job Type *</label>
            <select className="mt-1 w-full border rounded px-3 py-2" value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))}>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Experience Level</label>
            <select className="mt-1 w-full border rounded px-3 py-2" value={form.experience} onChange={e=>setForm(f=>({...f,experience:e.target.value}))}>
              <option value="">Select experience</option>
              <option value="entry">Entry Level</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior Level</option>
              <option value="executive">Executive</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Salary Range</label>
            <input className="mt-1 w-full border rounded px-3 py-2" placeholder="e.g., ₹12L – ₹24L" value={form.salary} onChange={e=>setForm(f=>({...f,salary:e.target.value}))} />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Job Description *</label>
          <textarea className="mt-1 w-full border rounded px-3 py-2" rows={4} placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..." value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} required />
        </div>

        <div>
          <label className="text-sm font-medium">Requirements</label>
          <textarea className="mt-1 w-full border rounded px-3 py-2" rows={3} placeholder="Required skills, experience, and qualifications..." value={form.requirements} onChange={e=>setForm(f=>({...f,requirements:e.target.value}))} />
        </div>

        <div>
          <label className="text-sm font-medium">Benefits & Perks</label>
          <textarea className="mt-1 w-full border rounded px-3 py-2" rows={3} placeholder="Health insurance, ESOPs, flexible hours, etc..." value={form.benefits} onChange={e=>setForm(f=>({...f,benefits:e.target.value}))} />
        </div>

        <div className="flex items-center gap-6">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4" checked={form.remote} onChange={e=>setForm(f=>({...f,remote:e.target.checked}))} />
            <span>Remote work available</span>
          </label>
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4" checked={form.urgent} onChange={e=>setForm(f=>({...f,urgent:e.target.checked}))} />
            <span>Urgent hiring</span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button type="submit" className="btn-primary" disabled={submitting}>{submitting ? 'Posting…' : 'Post Job'}</button>
          <button type="button" className="btn-accent" onClick={()=>setMsg('Draft saved (local only).')}>Save as Draft</button>
        </div>

        {msg && <div className="text-sm opacity-90">{msg}</div>}
        {!canPost && <div className="text-sm text-red-600">You do not have permission to post jobs with role "{user?.role || 'guest'}".</div>}
      </form>
    </div>
  )
}

