import React from 'react'

export default function CareersMentorship() {
  const mentors = [
    { id:1, name:'Raj', skills:['React','Career'] },
    { id:2, name:'Adarsh Gupta', skills:['Data','Interviews', 'HTML'] },
    { id:3, name:'Aman', skills:['React','Career', 'AI'] },
    { id:4, name:'Priya', skills:['Data','Interviews', 'CSS'] },
    { id:5, name:'Anandita', skills:['React','Career', 'JS'] },
    { id:6, name:'Ankita', skills:['Data','Interviews', 'Python'] },
  ]
  return (
    <div className="container-safe py-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {mentors.map(m => (
        <div key={m.id} className="card p-4">
          <div className="font-semibold">{m.name}</div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {m.skills.map(s=> <span key={s} className="px-2 py-1 rounded bg-primary/10 text-primary text-xs">{s}</span>)}
          </div>
          <button className="btn-primary w-full mt-3">Apply</button>
        </div>
      ))}
    </div>
  )
}
