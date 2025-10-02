import React, { useState } from 'react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts'

export default function AdminDashboard() {
  // Stats data
  const [stats] = useState({
    totalAlumni: 1247,
    totalStudents: 892,
    totalEvents: 45,
    pendingApprovals: 12,
  })

  // Pending approvals data
  const [pendingAlumni, setPendingAlumni] = useState([
    { id: 1, name: 'Raj', email: 'raj@example.com', company: 'Apple', batch: '2020', status: 'pending' },
    { id: 2, name: 'Dev', email: 'dev@example.com', company: 'Netflix', batch: '2019', status: 'pending' },
    { id: 3, name: 'Priya', email: 'priya@example.com', company: 'Amazon', batch: '2021', status: 'pending' },
    { id: 4, name: 'Adarsh', email: 'adarsh@example.com', company: '', batch: '2022', status: 'pending' },
    { id: 5, name: 'Ankita', email: 'ankita@example.com', company: 'Meta', batch: '2021', status: 'pending' },
  ])

  // Recent events data
  const [recentEvents] = useState([
    { id: 1, title: 'Tech Career Panel', date: '2024-12-15', attendees: 45, status: 'upcoming' },
    { id: 2, title: 'Alumni Networking Mixer', date: '2024-12-20', attendees: 78, status: 'upcoming' },
    { id: 3, title: 'Career Workshop', date: '2024-12-10', attendees: 32, status: 'completed' },
  ])

  const handleApproval = (id, action) => {
    setPendingAlumni(prev => prev.filter(a => a.id !== id))
    // TODO: integrate API call if needed
    
  }

  return (
    <div className="container-safe py-8 space-y-8">
      {/* Welcome */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
        <p className="opacity-80">Manage the GradNet community</p>
      </div>

      {/* Stats Grid */}
      <div className="glass-card card p-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border p-5 text-center">
          <div className="text-2xl font-bold">{stats.totalAlumni}</div>
          <div className="text-sm opacity-80">Total Alumni</div>
        </div>
        <div className="rounded-xl border p-5 text-center">
          <div className="text-2xl font-bold">{stats.totalStudents}</div>
          <div className="text-sm opacity-80">Total Students</div>
      </div>
        <div className="rounded-xl border p-5 text-center">
          <div className="text-2xl font-bold">{stats.totalEvents}</div>
          <div className="text-sm opacity-80">Total Events</div>
        </div>
        <div className="rounded-xl border p-5 text-center">
          <div className="text-2xl font-bold">{stats.pendingApprovals}</div>
          <div className="text-sm opacity-80">Pending Approvals</div>
        </div>
      </div>
      </div>

      {/* Weekly Engagement */}
      <div className="glass-card card p-5">
      <div className="rounded-xl border p-4">
        <div className="font-semibold mb-2">Weekly Engagement</div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={[
                { name: 'Mon', value: 24 },
                { name: 'Tue', value: 30 },
                { name: 'Wed', value: 28 },
                { name: 'Thu', value: 35 },
                { name: 'Fri', value: 40 },
                { name: 'Sat', value: 32 },
                { name: 'Sun', value: 26 },
              ]}
            >
              <defs>
                <linearGradient id="adminColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#003366" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#003366" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#003366" fillOpacity={1} fill="url(#adminColor)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      </div>

      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Pending Approvals */}
        
        <div className="lg:col-span-2">
        <div className="glass-card card">
          <div className="rounded-xl border overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between">
              <div>
                <div className="font-semibold">Pending Alumni Approvals</div>
                <div className="text-sm opacity-80">Review and approve new alumni registrations</div>
              </div>
              <div className="text-sm rounded px-2 py-1 border">{pendingAlumni.length} pending</div>
            </div>
            <div className="p-0 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left">
                    <th className="py-2 px-3">Name</th>
                    <th className="py-2 px-3">Company</th>
                    <th className="py-2 px-3">Batch</th>
                    <th className="py-2 px-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingAlumni.map(alumni => (
                    <tr key={alumni.id} className="border-t">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full border flex items-center justify-center text-xs">
                            {alumni.name.split(' ').map(n=>n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-medium">{alumni.name}</div>
                            <div className="text-xs opacity-80">{alumni.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">{alumni.company || '-'}</td>
                      <td className="py-3 px-3">{alumni.batch}</td>
                      <td className="py-3 px-3">
                        <div className="flex gap-2">
                          <button onClick={()=>handleApproval(alumni.id, 'approve')} className="h-8 px-3 rounded border">Approve</button>
                          <button onClick={()=>handleApproval(alumni.id, 'reject')} className="h-8 px-3 rounded border">Reject</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        </div>

        {/* Quick Actions + Recent Activity */}
       
        <div className="space-y-6">
          <div className="glass-card card">
          <div className="rounded-xl border">
            <div className="p-4 border-b">
              <div className="font-semibold">Quick Actions</div>
            </div>
            <div className="p-4 space-y-3">
              <button className="w-full text-left rounded border px-3 py-2">Create Event</button>
              <button className="w-full text-left rounded border px-3 py-2">Manage Users</button>
              <button className="w-full text-left rounded border px-3 py-2">View Analytics</button>
            </div>
          </div>
          </div>

          <div className="glass-card card rounded-xl border">
            <div className="p-4 border-b">
              <div className="font-semibold">Recent Activity</div>
            </div>
            <div className="p-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span>New alumni registered</span>
                <span className="opacity-70">5 today</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Events created</span>
                <span className="opacity-70">2 this week</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Posts reported</span>
                <span className="opacity-70">1 pending</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Events Management */}
      <div className="glass-card card p-5">
      <div className="rounded-xl border">
        <div className="p-4 border-b flex items-center justify-between">
          <div>
            <div className="font-semibold">Event Management</div>
            <div className="text-sm opacity-80">Manage upcoming and past events</div>
          </div>
          <button className="rounded border px-3 py-2">Create Event</button>
        </div>
        <div className="p-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentEvents.map(event => (
              <div key={event.id} className="rounded-lg border p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs rounded px-2 py-1 border">{event.status}</span>
                  <span className="text-xs opacity-70">{event.attendees} attendees</span>
                </div>
                <div className="font-medium mb-1">{event.title}</div>
                <div className="text-sm opacity-80 mb-3">{event.date}</div>
                <div className="flex gap-2">
                  <button className="rounded border px-3 py-1 text-sm">Edit</button>
                  <button className="rounded border px-3 py-1 text-sm">View</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

