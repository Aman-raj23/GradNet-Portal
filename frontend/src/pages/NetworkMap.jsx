import React, { useEffect, useMemo, useState } from 'react'
import { Globe, Building, Filter, Zap, TrendingUp, Network as NetworkIcon, Users, Calendar } from 'lucide-react'

// Mock connections
const networkConnections = [
  { from: 'San Francisco, CA', to: 'New York, NY', strength: 45, alumni: 234 },
  { from: 'San Francisco, CA', to: 'Seattle, WA', strength: 32, alumni: 156 },
  { from: 'New York, NY', to: 'Boston, MA', strength: 28, alumni: 189 },
  { from: 'San Francisco, CA', to: 'Los Angeles, CA', strength: 38, alumni: 201 },
  { from: 'New York, NY', to: 'Washington, DC', strength: 25, alumni: 143 },
  { from: 'Seattle, WA', to: 'Portland, OR', strength: 18, alumni: 87 },
]

const industryConnections = [
  { industry: 'Technology', connections: 1247, growth: '+12%' },
  { industry: 'Finance', connections: 892, growth: '+8%' },
  { industry: 'Healthcare', connections: 654, growth: '+15%' },
  { industry: 'Consulting', connections: 543, growth: '+6%' },
  { industry: 'Education', connections: 432, growth: '+9%' },
  { industry: 'Manufacturing', connections: 321, growth: '+4%' },
]

export default function NetworkMap() {
  const [selectedView, setSelectedView] = useState('geographic')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [animatedConnections, setAnimatedConnections] = useState([])

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimatedConnections((prev) => {
        const nc = networkConnections[Math.floor(Math.random() * networkConnections.length)]
        return [...prev.slice(-4), { ...nc, id: Date.now() }]
      })
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  const connectionStrengthColor = (s) => (s >= 40 ? 'text-green-600' : s >= 25 ? 'text-yellow-600' : 'text-red-600')
  const growthColor = (g) => (g.startsWith('+') ? 'text-green-600' : 'text-red-600')

  return (
    <div className="container-safe py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Network Map</h1>
          <p className="opacity-80">Visualize connections across our global alumni network</p>
        </div>
        <div className="flex gap-2">
          <div>
            <label className="text-sm font-medium">View</label>
            <select className="mt-1 border rounded px-3 py-2" value={selectedView} onChange={(e)=>setSelectedView(e.target.value)}>
              <option value="geographic">Geographic</option>
              <option value="industry">By Industry</option>
              <option value="class">By Class Year</option>
            </select>
          </div>
          <button className="btn-accent self-end h-[42px] flex items-center gap-2"><Filter size={16}/> Filters</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card card p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-80">Total Connections</div>
              <div className="text-2xl font-bold">15,420</div>
              <div className="text-xs opacity-70">+234 this month</div>
            </div>
            <NetworkIcon className="text-primary" size={18} />
          </div>
        </div>
        <div className="glass-card card p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-80">Active Locations</div>
              <div className="text-2xl font-bold">127</div>
              <div className="text-xs opacity-70">Cities worldwide</div>
            </div>
            <Globe className="text-primary" size={18} />
          </div>
        </div>
        <div className="glass-card card p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-80">Industries</div>
              <div className="text-2xl font-bold">24</div>
              <div className="text-xs opacity-70">Sectors represented</div>
            </div>
            <Building className="text-primary" size={18} />
          </div>
        </div>
        <div className="glass-card card p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-80">Network Growth</div>
              <div className="text-2xl font-bold">+12%</div>
              <div className="text-xs opacity-70">Year over year</div>
            </div>
            <TrendingUp className="text-primary" size={18} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main visualization */}
        <div className="lg:col-span-2">
          <div className="glass-card card h-[600px] p-0">
            <div className="border-b p-4">
              <div className="font-semibold flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                {selectedView === 'geographic' ? 'Geographic Network' : selectedView === 'industry' ? 'Industry Connections' : 'Class Year Network'}
              </div>
              <div className="text-sm opacity-70">Interactive visualization of alumni connections</div>
            </div>
            <div className="h-[calc(100%-64px)] p-6">
              {selectedView === 'geographic' && (
                <div className="relative h-full bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg overflow-hidden">
                  {/* stylized world dots */}
                  <div className="absolute inset-0 opacity-10">
                    <svg viewBox="0 0 800 400" className="w-full h-full">
                      <circle cx="150" cy="100" r="8" fill="currentColor" />
                      <circle cx="200" cy="120" r="6" fill="currentColor" />
                      <circle cx="300" cy="80" r="10" fill="currentColor" />
                      <circle cx="450" cy="150" r="7" fill="currentColor" />
                      <circle cx="600" cy="100" r="9" fill="currentColor" />
                      <circle cx="700" cy="180" r="5" fill="currentColor" />
                    </svg>
                  </div>
                  {/* connection lines */}
                  <div className="absolute inset-0">
                    {networkConnections.map((c, i) => (
                      <div key={i} className="absolute animate-pulse" style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + i * 8}%`,
                        width: `${c.strength}%`,
                        height: '2px',
                        background: 'linear-gradient(90deg, rgba(59,130,246,0.8), rgba(147,51,234,0.8))',
                        transform: `rotate(${i * 30}deg)`
                      }} />
                    ))}
                  </div>
                  {/* city bubbles */}
                  <div className="relative h-full">
                    {[
                      { name: 'San Francisco', x: '15%', y: '40%', size: 'large', alumni: 1247 },
                      { name: 'New York', x: '70%', y: '35%', size: 'large', alumni: 1156 },
                      { name: 'Seattle', x: '12%', y: '25%', size: 'medium', alumni: 654 },
                      { name: 'Boston', x: '75%', y: '30%', size: 'medium', alumni: 543 },
                      { name: 'Los Angeles', x: '8%', y: '60%', size: 'medium', alumni: 432 },
                      { name: 'Chicago', x: '55%', y: '40%', size: 'small', alumni: 321 },
                    ].map((city, idx) => (
                      <div key={idx} className="absolute -translate-x-1/2 -translate-y-1/2 group" style={{ left: city.x, top: city.y }}>
                        <div className={`rounded-full bg-primary shadow-lg text-white font-bold grid place-items-center transition-transform group-hover:scale-110 ${city.size === 'large' ? 'w-12 h-12 text-sm' : city.size === 'medium' ? 'w-10 h-10 text-xs' : 'w-8 h-8 text-xs'}`}>
                          {city.alumni > 999 ? `${Math.floor(city.alumni / 1000)}k` : city.alumni}
                        </div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                          {city.name}: {city.alumni} alumni
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* live ticker */}
                  <div className="absolute bottom-4 left-4 bg-white/90 rounded-lg p-3 shadow">
                    <div className="flex items-center gap-2 text-sm"><Zap className="w-4 h-4 text-yellow-500 animate-pulse" /><span className="font-medium">Live Connections</span></div>
                    <div className="text-xs opacity-70 mt-1">
                      {animatedConnections.length > 0 && (
                        <span>Latest: {animatedConnections[animatedConnections.length - 1]?.from} ↔ {animatedConnections[animatedConnections.length - 1]?.to}</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {selectedView === 'industry' && (
                <div className="h-full grid place-items-center">
                  <div className="grid grid-cols-2 gap-6 w-full max-w-md">
                    {industryConnections.map((ind, i) => (
                      <div key={i} className="relative bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg p-4 text-center hover:shadow-md">
                        <div className="text-2xl font-bold text-primary mb-1">{ind.connections}</div>
                        <div className="text-sm font-medium mb-2">{ind.industry}</div>
                        <span className={`inline-block text-xs px-2 py-0.5 rounded border ${growthColor(ind.growth)}`}>{ind.growth}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedView === 'class' && (
                <div className="h-full grid place-items-center">
                  <div className="text-center">
                    <div className="text-5xl md:text-6xl font-bold text-primary mb-4">2015-2024</div>
                    <div className="text-lg opacity-70 mb-6">Class Years Represented</div>
                    <div className="grid grid-cols-5 gap-2 max-w-sm mx-auto">
                      {Array.from({ length: 10 }, (_, i) => 2015 + i).map((y) => (
                        <div key={y} className="bg-primary/10 rounded-lg p-2 hover:bg-primary/20">
                          <div className="text-sm font-semibold">{y}</div>
                          <div className="text-xs opacity-70">{Math.floor(Math.random()*200)+50}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="glass-card card p-4">
            <div className="font-semibold mb-3">Strongest Connections</div>
            <div className="space-y-3">
              {networkConnections.slice().sort((a,b)=>b.strength-a.strength).slice(0,5).map((c,i)=> (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">{c.from} ↔ {c.to}</div>
                    <div className="text-xs opacity-70">{c.alumni} alumni</div>
                  </div>
                  <div className={`text-sm font-semibold ${connectionStrengthColor(c.strength)}`}>{c.strength}%</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card card p-4">
            <div className="font-semibold mb-3">Recent Network Activity</div>
            <div className="space-y-3">
              {[
                { action: 'New connection', users: 'Sarah Chen & Michael Rodriguez', time: '2 min ago' },
                { action: 'Group joined', users: 'Emily Watson joined Tech Alumni', time: '15 min ago' },
                { action: 'Location update', users: 'David Kim moved to Los Angeles', time: '1 hour ago' },
                { action: 'New connection', users: 'Lisa Thompson & James Wilson', time: '2 hours ago' },
              ].map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                  <div>
                    <div className="text-sm font-medium">{a.action}</div>
                    <div className="text-xs opacity-70">{a.users}</div>
                    <div className="text-xs opacity-70">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card card p-4">
            <div className="font-semibold mb-3">Network Insights</div>
            <div className="space-y-3">
              <div className="bg-blue-50 p-3 rounded">
                <div className="text-sm font-medium text-blue-900">Most Connected City</div>
                <div className="text-lg font-bold text-blue-700">San Francisco</div>
                <div className="text-xs text-blue-700/80">1,247 alumni connections</div>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <div className="text-sm font-medium text-green-900">Fastest Growing Industry</div>
                <div className="text-lg font-bold text-green-700">Healthcare</div>
                <div className="text-xs text-green-700/80">+15% growth this year</div>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <div className="text-sm font-medium text-purple-900">Most Active Class</div>
                <div className="text-lg font-bold text-purple-700">Class of 2018</div>
                <div className="text-xs text-purple-700/80">89% engagement rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
