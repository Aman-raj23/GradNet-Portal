import React from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts'

export default function InstituteDashboard() {
  const { user } = useAuth()

  const stats = {
    activeAlumni: 8120,
    mentorshipPairs: 430,
    chapters: 22,
    upcomingEvents: 9,
  }

  const data = [
    { name: 'Mon', value: 24 },
    { name: 'Tue', value: 30 },
    { name: 'Wed', value: 28 },
    { name: 'Thu', value: 35 },
    { name: 'Fri', value: 40 },
    { name: 'Sat', value: 32 },
    { name: 'Sun', value: 26 },
  ]

  return (
    <div className="container-safe py-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold">Institute Dashboard</h1>
        <p className="opacity-80">Welcome{user?.name ? `, ${user.name}` : ''}</p>
      </div>

      <div className="glass-card card p-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl border p-5 text-center">
            <div className="text-2xl font-bold">{stats.activeAlumni}</div>
            <div className="text-sm opacity-80">Active Alumni</div>
          </div>
          <div className="rounded-xl border p-5 text-center">
            <div className="text-2xl font-bold">{stats.mentorshipPairs}</div>
            <div className="text-sm opacity-80">Mentorship Pairs</div>
          </div>
          <div className="rounded-xl border p-5 text-center">
            <div className="text-2xl font-bold">{stats.chapters}</div>
            <div className="text-sm opacity-80">Chapters</div>
          </div>
          <div className="rounded-xl border p-5 text-center">
            <div className="text-2xl font-bold">{stats.upcomingEvents}</div>
            <div className="text-sm opacity-80">Upcoming Events</div>
          </div>
        </div>
      </div>

      <div className="glass-card card p-5">
        <div className="rounded-xl border p-4">
          <div className="font-semibold mb-2">Weekly Engagement</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="instColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#003366" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#003366" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#003366" fillOpacity={1} fill="url(#instColor)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}