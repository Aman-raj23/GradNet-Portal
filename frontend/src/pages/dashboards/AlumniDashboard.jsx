import React from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts'

export default function AlumniDashboard() {
  const { user } = useAuth()

  const stats = {
    connections: 156,
    mentorshipRequests: 8,
    postsShared: 23,
    eventsAttended: 12,
  }

  const recentPosts = [
    { id: 1, author: 'Suhana Sen', content: 'Just launched a new product at Google! Excited to share this milestone with the GradNet community.', likes: 24, comments: 8, timeAgo: '2 hours ago' },
    { id: 2, author: 'Jayesh', content: 'Looking for a mentor in machine learning. Any alumni working in AI/ML space?', likes: 12, comments: 15, timeAgo: '5 hours ago' },
  ]

  const upcomingEvents = [
    { id: 1, title: 'Tech Career Panel', date: 'Dec 15, 2024', attendees: 45 },
    { id: 2, title: 'Alumni Networking Mixer', date: 'Dec 20, 2024', attendees: 78 },
  ]

  const mentorshipRequests = [
    { id: 1, student: 'Adarsh Sharma', topic: 'Software Engineering Career Path', message: "Hi Adarsh, I'm interested in transitioning to tech..." },
    { id: 2, student: 'Alex Kumar', topic: 'Product Management', message: 'Would love to learn about your journey at Google...' },
  ]

  const initials = (name) => name?.split(' ').map(n=>n[0]).join('') || 'A'

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold">{`Welcome back${user?.name ? `, ${user.name}` : ''}!`}</h2>
        <p className="opacity-80">Here's what's happening in your network</p>
      </div>

      {/* Profile Card */}
      <div className="glass-card card p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full border flex items-center justify-center text-lg font-semibold bg-white/10">
              {initials(user?.name || 'Alumni')}
            </div>
            <div>
              <div className="text-lg font-semibold">{user?.name || 'Alumni User'}</div>
              <div className="text-sm opacity-80 flex items-center gap-2 flex-wrap">
                {user?.company && (<><span>{user.company}</span><span>•</span></>)}
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
          <div className="text-2xl font-bold">{stats.connections}</div>
          <div className="text-sm opacity-80">Connections</div>
        </div>
        <div className="glass-card card p-6 text-center">
          <div className="text-2xl font-bold">{stats.mentorshipRequests}</div>
          <div className="text-sm opacity-80">Mentorship Requests</div>
        </div>
        <div className="glass-card card p-6 text-center">
          <div className="text-2xl font-bold">{stats.postsShared}</div>
          <div className="text-sm opacity-80">Posts Shared</div>
        </div>
        <div className="glass-card card p-6 text-center">
          <div className="text-2xl font-bold">{stats.eventsAttended}</div>
          <div className="text-sm opacity-80">Events Attended</div>
        </div>
      </div>

      {/* Weekly Engagement */}
      <div className="glass-card card p-4">
        <div className="font-semibold mb-2">Weekly Engagement</div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={[
                { name: 'Mon', value: 14 },
                { name: 'Tue', value: 18 },
                { name: 'Wed', value: 22 },
                { name: 'Thu', value: 27 },
                { name: 'Fri', value: 24 },
                { name: 'Sat', value: 30 },
                { name: 'Sun', value: 20 },
              ]}
            >
              <defs>
                <linearGradient id="alumniColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#003366" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#003366" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#003366" fillOpacity={1} fill="url(#alumniColor)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="glass-card card">
          <div className="p-4 border-b">
            <div className="font-semibold">Recent Activity</div>
            <div className="text-sm opacity-80">Latest posts from your network</div>
          </div>
          <div className="p-4 space-y-5">
            {recentPosts.map(post => (
              <div key={post.id} className="border-b last:border-0 pb-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full border flex items-center justify-center text-xs">
                    {initials(post.author)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{post.author}</span>
                      <span className="text-xs opacity-70">{post.timeAgo}</span>
                    </div>
                    <p className="text-sm mt-1">{post.content}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <button className="h-8 px-2 rounded border">❤ {post.likes}</button>
                      <button className="h-8 px-2 rounded border">💬 {post.comments}</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <a href="/community/feed" className="w-full block text-center rounded border px-3 py-2">View All Posts</a>
          </div>
        </div>

        {/* Mentorship Requests */}
        <div className="glass-card card">
          <div className="p-4 border-b">
            <div className="font-semibold">Mentorship Requests</div>
            <div className="text-sm opacity-80">Students seeking your guidance</div>
          </div>
          <div className="p-4 space-y-4">
            {mentorshipRequests.map(req => (
              <div key={req.id} className="rounded-lg border p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{req.student}</span>
                  <span className="text-xs rounded px-2 py-1 border">{req.topic}</span>
                </div>
                <p className="text-sm opacity-80 mb-3">{req.message}</p>
                <div className="flex gap-2">
                  <button className="rounded border px-3 py-1 text-sm">Accept</button>
                  <button className="rounded border px-3 py-1 text-sm">Decline</button>
                </div>
              </div>
            ))}
            <a href="/careers/mentorship" className="w-full block text-center rounded border px-3 py-2">View All Requests</a>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="glass-card card">
        <div className="p-4 border-b">
          <div className="font-semibold">Upcoming Events</div>
          <div className="text-sm opacity-80">Events you might be interested in</div>
        </div>
        <div className="p-4">
          <div className="grid md:grid-cols-2 gap-4">
            {upcomingEvents.map(ev => (
              <div key={ev.id} className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{ev.title}</div>
                    <div className="text-sm opacity-80">{ev.date}</div>
                    <div className="text-xs opacity-70">{ev.attendees} attending</div>
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
