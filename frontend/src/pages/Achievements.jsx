import React from 'react'

export default function Achievements() {
  const badges = [
    { id:1, name:'Mentor', earned:true },
    { id:2, name:'Donor', earned:false },
    { id:3, name:'Community Builder', earned:true },
    { id:4, name:'Event Speaker', earned:false },
  ]
  return (
    <div className="container-safe py-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {badges.map(b => (
        <div key={b.id} className={`card p-4 text-center ${b.earned?'':'grayscale'}`}>
          <div className="w-16 h-16 bg-accent/60 rounded-full mx-auto" />
          <div className="mt-2 font-semibold">{b.name}</div>
        </div>
      ))}
    </div>
  )
}
