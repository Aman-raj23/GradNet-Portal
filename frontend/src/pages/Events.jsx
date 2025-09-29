import React, { useEffect, useState } from 'react'

export default function Events() {
  const [items, setItems] = useState([])
  const [tab, setTab] = useState('upcoming')

  useEffect(()=>{ fetch('http://localhost:5000/api/events').then(r=>r.json()).then(setItems) },[])
  const filtered = items.filter(e=> tab==='upcoming' ? e.status!=='past' : e.status==='past')

  return (
    <div className="container-safe py-8">
      <div className="flex gap-2">
        <button className={`px-4 py-2 rounded ${tab==='upcoming'?'bg-primary text-white':'bg-white border'}`} onClick={()=>setTab('upcoming')}>Upcoming</button>
        <button className={`px-4 py-2 rounded ${tab==='past'?'bg-primary text-white':'bg-white border'}`} onClick={()=>setTab('past')}>Past</button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filtered.map(e=> (
          <div key={e.id} className="card overflow-hidden">
            <div className="h-32 bg-gray-200" />
            <div className="p-4">
              <div className="font-semibold">{e.title}</div>
              <div className="text-sm text-gray-600">{e.date} · {e.location}</div>
              <button className="btn-primary w-full mt-3">{tab==='upcoming'?'Register':'View'}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
