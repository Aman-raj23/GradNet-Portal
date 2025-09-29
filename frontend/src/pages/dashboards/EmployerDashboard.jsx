import React from 'react'

export default function EmployerDashboard() {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold">Employer Dashboard</h2>
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="font-semibold mb-2">Your Job Posts</div>
          <ul className="text-sm text-gray-700 list-disc pl-6">
            <li>Frontend Engineer · 24 applicants</li>
            <li>Data Analyst · 12 applicants</li>
          </ul>
        </div>
        <div className="card p-4">
          <div className="font-semibold mb-2">Quick Actions</div>
          <div className="grid sm:grid-cols-2 gap-2">
            <a href="/careers/post-job" className="btn-primary text-center">Post a Job</a>
            <a href="/careers/jobs" className="btn-accent text-center">Browse Candidates</a>
            <a href="/events" className="px-4 py-2 rounded border text-center">Sponsor Event</a>
            <a href="/community/feed" className="px-4 py-2 rounded border text-center">Share Update</a>
          </div>
        </div>
        <div className="card p-4">
          <div className="font-semibold mb-2">Recommendations</div>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>Top candidates in Data Science</li>
            <li>Alumni referral program</li>
            <li>Upcoming career fair</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
