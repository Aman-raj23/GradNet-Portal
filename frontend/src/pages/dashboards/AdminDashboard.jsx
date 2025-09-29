import React from 'react'
import StatCard from '../../components/StatCard.jsx'

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold">Admin Overview</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Alumni" value="12,450" />
        <StatCard label="Active Jobs" value="320" />
        <StatCard label="Upcoming Events" value="12" />
        <StatCard label="New Signups" value="187" />
      </div>
      <div className="card p-4">
        <div className="font-semibold mb-2">Moderation Queue</div>
        <ul className="text-sm text-gray-700 list-disc pl-6">
          <li>3 posts flagged for review</li>
          <li>2 events pending approval</li>
          <li>1 job listing needs update</li>
        </ul>
      </div>
    </div>
  )
}
