import React, { useEffect, useState } from 'react'

export default function CareersJobBoard() {
  const [jobs, setJobs] = useState([])
  const [q,setQ] = useState('')

  useEffect(()=>{ fetch('http://localhost:5000/api/jobs').then(r=>r.json()).then(setJobs) },[])
  const list = jobs.filter(j=> !q || j.title.toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="container-safe py-8">
      <div className="flex gap-2">
        <input className="border rounded px-3 py-2" placeholder="Search jobs..." value={q} onChange={e=>setQ(e.target.value)} />
      </div>
      <div className="mt-4 space-y-3">
        {list.map(j => (
          <div key={j.id} className="card p-4 flex items-center justify-between">
            <div>
              <div className="font-semibold">{j.title}</div>
              <div className="text-sm text-gray-600">{j.company} · {j.city} · {j.type}</div>
            </div>
            <button className="btn-primary">Apply</button>
          </div>
        ))}
      </div>
    </div>
  )
}
