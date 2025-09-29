import React from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts'

export default function StudentDashboard() {
  const { user } = useAuth()

  const stats = {
    mentorshipSessions: 3,
    applicationsSubmitted: 2,
    interviewsScheduled: 1,
    eventsJoined: 4,
  }

  const recentActivity = [
    { id: 1, title: 'Applied: Frontend Intern at Meta', time: 'Today' },
    { id: 2, title: 'Booked mentorship with Priya (SWE @ Amazon)', time: 'Yesterday' },
    { id: 3, title: 'Joined: Resume Review Workshop', time: '2 days ago' },
  ]

  const upcoming = [
    { id: 1, title: 'Mock Interview Night', date: 'Dec 18, 2024', spots: 25 },
    { id: 2, title: 'Career Fair Prep', date: 'Dec 22, 2024', spots: 40 },
  ]

  const initials = (name) => name?.split(' ').map(n=>n[0]).join('') || 'S'

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold">{`Welcome back${user?.name ? `, ${user.name}` : ''}!`}</h2>
        <p className="opacity-80">Track your progress and take the next step</p>
      </div>

      {/* Profile Card */}
      <div className="glass-card card p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full border flex items-center justify-center text-lg font-semibold bg-white/10">
              {initials(user?.name || 'Student')}
            </div>
            <div>
              <div className="text-lg font-semibold">{user?.name || 'Student User'}</div>
              <div className="text-sm opacity-80 flex items-center gap-2 flex-wrap">
                {user?.department && (<><span>{user.department}</span><span>•</span></>)}
                {user?.batch && (<span>Class of {user.batch}</span>)}
              </div>
              {Array.isArray(user?.skills) && user.skills.length>0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {user.skills.map((s,i)=> (
                    <span key={i} className="text-xs rounded px-2 py-1 border">{s}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <a href="/profile" className="px-3 py-2 rounded border text-sm">Edit Profile</a>
        </div>
        {user?.bio && (
          <p className="mt-3 text-sm opacity-80">{user.bio}</p>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card card p-6 text-center">
          <div className="text-2xl font-bold">{stats.mentorshipSessions}</div>
          <div className="text-sm opacity-80">Mentorship Sessions</div>
        </div>
        <div className="glass-card card p-6 text-center">
          <div className="text-2xl font-bold">{stats.applicationsSubmitted}</div>
          <div className="text-sm opacity-80">Applications Submitted</div>
        </div>
        <div className="glass-card card p-6 text-center">
          <div className="text-2xl font-bold">{stats.interviewsScheduled}</div>
          <div className="text-sm opacity-80">Interviews Scheduled</div>
        </div>
        <div className="glass-card card p-6 text-center">
          <div className="text-2xl font-bold">{stats.eventsJoined}</div>
          <div className="text-sm opacity-80">Events Joined</div>
        </div>
      </div>

      {/* Weekly Engagement */}
      <div className="glass-card card p-4">
        <div className="font-semibold mb-2">Weekly Engagement</div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={[
                { name: 'Mon', value: 8 },
                { name: 'Tue', value: 12 },
                { name: 'Wed', value: 10 },
                { name: 'Thu', value: 14 },
                { name: 'Fri', value: 11 },
                { name: 'Sat', value: 16 },
                { name: 'Sun', value: 9 },
              ]}
            >
              <defs>
                <linearGradient id="studColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#003366" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#003366" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#003366" fillOpacity={1} fill="url(#studColor)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Recent Activity / Learning */}
        <div className="glass-card card">
          <div className="p-4 border-b">
            <div className="font-semibold">Recent Activity</div>
            <div className="text-sm opacity-80">Your latest progress</div>
          </div>
          <div className="p-4 space-y-3 text-sm">
            {recentActivity.map(item => (
              <div key={item.id} className="flex items-center justify-between">
                <span>{item.title}</span>
                <span className="opacity-70">{item.time}</span>
              </div>
            ))}
            <a href="/dashboard" className="w-full block text-center rounded border px-3 py-2">View Details</a>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card card">
          <div className="p-4 border-b">
            <div className="font-semibold">Quick Actions</div>
            <div className="text-sm opacity-80">Take the next step</div>
          </div>
          <div className="p-4 space-y-3">
            <a href="/careers/jobs" className="w-full block text-left rounded border px-3 py-2">Browse Jobs</a>
            <a href="/careers/mentorship" className="w-full block text-left rounded border px-3 py-2">Find Mentor</a>
            <a href="/events" className="w-full block text-left rounded border px-3 py-2">Join Event</a>
            <a href="/community/feed" className="w-full block text-left rounded border px-3 py-2">Post in Feed</a>
          </div>
        </div>
      </div>

      {/* Upcoming Opportunities */}
      <div className="glass-card card">
        <div className="p-4 border-b">
          <div className="font-semibold">Upcoming Opportunities</div>
          <div className="text-sm opacity-80">Internships, workshops and more</div>
        </div>
        <div className="p-4">
          <div className="grid md:grid-cols-2 gap-4">
            {upcoming.map(item => (
              <div key={item.id} className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{item.title}</div>
                    <div className="text-sm opacity-80">{item.date}</div>
                    <div className="text-xs opacity-70">{item.spots} spots</div>
                  </div>
                  <a href="/events" className="rounded border px-3 py-1 text-sm">Join</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
