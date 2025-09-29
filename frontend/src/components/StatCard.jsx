import React from 'react'

export default function StatCard({ label, value }) {
  return (
    <div className="card p-5">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-extrabold text-primary">{value}</div>
    </div>
  )
}
