import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, CartesianGrid, Legend } from 'recharts'

const topCompanies = [
  { name: 'Google', hires: 42 },
  { name: 'Microsoft', hires: 37 },
  { name: 'Amazon', hires: 33 },
  { name: 'TCS', hires: 28 },
  { name: 'Infosys', hires: 25 },
  { name: 'Accenture', hires: 20 },
]

const industryDistribution = [
  { name: 'Software', value: 38 },
  { name: 'Finance', value: 18 },
  { name: 'Healthcare', value: 12 },
  { name: 'Consulting', value: 10 },
  { name: 'Education', value: 9 },
  { name: 'Manufacturing', value: 7 },
  { name: 'Other', value: 6 },
]

const weeklyEngagement = [
  { day: 'Mon', active: 120 },
  { day: 'Tue', active: 140 },
  { day: 'Wed', active: 170 },
  { day: 'Thu', active: 160 },
  { day: 'Fri', active: 190 },
  { day: 'Sat', active: 110 },
  { day: 'Sun', active: 90 },
]

const COLORS = ['#2563eb', '#7c3aed', '#ef4444', '#22c55e', '#eab308', '#06b6d4', '#64748b']

export default function AlumniAnalytics() {
  return (
    <div className="container-safe py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold">Alumni Analytics</h1>
        <p className="opacity-80">Insights about placements, industries, and engagement</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card card p-4">
          <div className="text-sm opacity-80">Total Alumni</div>
          <div className="text-2xl font-bold">2,548</div>
          <div className="text-xs opacity-70">+124 this year</div>
        </div>
        <div className="glass-card card p-4">
          <div className="text-sm opacity-80">Employed</div>
          <div className="text-2xl font-bold">88%</div>
          <div className="text-xs opacity-70">Placement rate</div>
        </div>
        <div className="glass-card card p-4">
          <div className="text-sm opacity-80">Avg. Package</div>
          <div className="text-2xl font-bold">₹12.6 LPA</div>
          <div className="text-xs opacity-70">CTC</div>
        </div>
        <div className="glass-card card p-4">
          <div className="text-sm opacity-80">Global Alumni</div>
          <div className="text-2xl font-bold">26%</div>
          <div className="text-xs opacity-70">Working abroad</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top companies */}
        <div className="glass-card card p-4">
          <div className="font-semibold mb-2">Top Hiring Companies</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topCompanies}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="hires" fill="#2563eb" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Industry distribution */}
        <div className="glass-card card p-4">
          <div className="font-semibold mb-2">Industry Distribution</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={industryDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {industryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly engagement */}
        <div className="glass-card card p-4 lg:col-span-2">
          <div className="font-semibold mb-2">Weekly Engagement</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyEngagement}>
                <defs>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="active" stroke="#7c3aed" fillOpacity={1} fill="url(#colorActive)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
