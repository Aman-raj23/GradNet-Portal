import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useApi } from '../api/client.jsx'

export default function AlumniProfile() {
  const { id } = useParams()
  const { user } = useAuth()
  const { get, put } = useApi()
  const [profile, setProfile] = useState(null)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ name:'', year:'', major:'', city:'', industry:'' })
  const isSelf = user && user.id === id

  useEffect(()=>{
    get(`/alumni/${id}`).then(data => { setProfile(data); setForm({ name:data.name||'', year:data.year||'', major:data.major||'', city:data.city||'', industry:data.industry||'' }) })
  }, [id])

  const save = async () => {
    try {
      const updated = await put('/auth/me', form)
      setProfile(updated)
      setEditing(false)
    } catch {}
  }

  if (!profile) return <div className="container-safe py-8">Loading...</div>

  return (
    <div className="container-safe py-8">
      <div className="h-36 bg-primary rounded-xl" />
      <div className="-mt-10 flex items-end gap-4">
        <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow -mt-12" />
        <div className="flex-1">
          {editing ? (
            <div className="grid sm:grid-cols-2 gap-2">
              {['name','year','major','city','industry'].map(k=> (
                <input key={k} className="border rounded px-3 py-2" placeholder={k} value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} />
              ))}
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <div className="text-gray-600">Class of {profile.year} · {profile.industry||'—'} · {profile.city||'—'}</div>
            </>
          )}
          {isSelf && (
            <div className="mt-3 flex gap-2">
              {!editing && <button className="btn-accent" onClick={()=>setEditing(true)}>Edit Profile</button>}
              {editing && <>
                <button className="btn-primary" onClick={save}>Save</button>
                <button className="px-4 py-2 rounded border" onClick={()=>{ setEditing(false); setForm({ name:profile.name||'', year:profile.year||'', major:profile.major||'', city:profile.city||'', industry:profile.industry||'' }) }}>Cancel</button>
              </>}
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4">
          <div className="card p-4">
            <div className="font-semibold mb-2">About</div>
            <p>Experienced professional committed to community and mentorship.</p>
          </div>
          <div className="card p-4"><div className="font-semibold mb-2">Experience</div><ul className="list-disc pl-6 text-gray-700"><li>Role details coming soon.</li></ul></div>
          <div className="card p-4"><div className="font-semibold mb-2">Education</div><ul className="list-disc pl-6 text-gray-700"><li>Details coming soon.</li></ul></div>
          <div className="card p-4"><div className="font-semibold mb-2">Skills</div><div className="flex flex-wrap gap-2"><span className="px-3 py-1 rounded-full bg-primary/10 text-primary">React</span><span className="px-3 py-1 rounded-full bg-primary/10 text-primary">Leadership</span></div></div>
        </div>
        <div className="space-y-4">
          <div className="card p-4">
            <div className="font-semibold mb-2">AI Matchmaking 🤖</div>
            <p className="text-sm text-gray-600">Based on {profile.major || 'profile'}, we suggest:</p>
            <ul className="list-disc pl-6 text-sm text-gray-700">
              <li>Mentor: Senior {profile.industry || 'Industry'} leader</li>
              <li>Job: {profile.city || 'Global'} opportunities in {profile.industry || 'Tech'}</li>
              <li>Event: Alumni meetup near {profile.city || 'you'}</li>
            </ul>
            <button className="btn-accent mt-3">Refresh Suggestions</button>
          </div>
          <div className="card p-4">
            <div className="font-semibold mb-2">Badges</div>
            <div className="flex gap-2">
              <div className="w-10 h-10 rounded bg-accent/50" />
              <div className="w-10 h-10 rounded bg-gray-200" />
              <div className="w-10 h-10 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
