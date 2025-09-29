import React, { useMemo, useState } from 'react'
import { Users, MapPin, MessageSquare, TrendingUp, Globe, Plus, Search as SearchIcon } from 'lucide-react'

// Mock groups data
const mockGroups = [
  {
    id: 1,
    name: 'Tech Alumni Network',
    description: 'Connect with fellow technology professionals, share opportunities, and discuss industry trends.',
    members: 1247,
    posts: 89,
    category: 'Professional',
    location: 'Global',
    privacy: 'Public',
    image: 'TA',
    recentActivity: '2 hours ago',
    tags: ['Technology', 'Networking', 'Career'],
  },
  {
    id: 2,
    name: 'San Francisco Bay Area',
    description: 'Alumni living and working in the San Francisco Bay Area. Local meetups, job opportunities, and networking.',
    members: 892,
    posts: 156,
    category: 'Location',
    location: 'San Francisco, CA',
    privacy: 'Public',
    image: 'SF',
    recentActivity: '1 hour ago',
    tags: ['Location', 'Meetups', 'Local'],
  },
  {
    id: 3,
    name: 'Entrepreneurs & Founders',
    description: 'A community for alumni who have started their own companies or are interested in entrepreneurship.',
    members: 456,
    posts: 67,
    category: 'Professional',
    location: 'Global',
    privacy: 'Public',
    image: 'EF',
    recentActivity: '3 hours ago',
    tags: ['Entrepreneurship', 'Startups', 'Business'],
  },
  {
    id: 4,
    name: 'Class of 2018',
    description: 'Stay connected with your graduating class. Share updates, plan reunions, and maintain friendships.',
    members: 234,
    posts: 45,
    category: 'Class Year',
    location: 'Global',
    privacy: 'Private',
    image: '18',
    recentActivity: '5 hours ago',
    tags: ['Class Year', 'Reunion', 'Friends'],
  },
  {
    id: 5,
    name: 'Women in STEM',
    description: 'Supporting and empowering women alumni in science, technology, engineering, and mathematics fields.',
    members: 678,
    posts: 123,
    category: 'Interest',
    location: 'Global',
    privacy: 'Public',
    image: 'WS',
    recentActivity: '1 day ago',
    tags: ['Women', 'STEM', 'Support'],
  },
  {
    id: 6,
    name: 'Finance & Investment',
    description: 'Alumni working in finance, investment banking, and related fields. Share insights and opportunities.',
    members: 543,
    posts: 78,
    category: 'Professional',
    location: 'Global',
    privacy: 'Public',
    image: 'FI',
    recentActivity: '6 hours ago',
    tags: ['Finance', 'Investment', 'Banking'],
  },
]

export default function CommunityGroups() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')

  const categories = useMemo(() => ['all', ...Array.from(new Set(mockGroups.map(g => g.category)))], [])
  const locations = useMemo(() => ['all', ...Array.from(new Set(mockGroups.map(g => g.location)))], [])

  const filteredGroups = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    return mockGroups.filter(group => {
      const matchesSearch = !term
        || group.name.toLowerCase().includes(term)
        || group.description.toLowerCase().includes(term)
        || group.tags.some(t => t.toLowerCase().includes(term))
      const matchesCategory = selectedCategory === 'all' || group.category === selectedCategory
      const matchesLocation = selectedLocation === 'all' || group.location === selectedLocation
      return matchesSearch && matchesCategory && matchesLocation
    })
  }, [searchTerm, selectedCategory, selectedLocation])

  const privacyBadgeCls = (privacy) =>
    privacy === 'Public'
      ? 'bg-green-100 text-green-800 border border-green-200'
      : 'bg-orange-100 text-orange-800 border border-orange-200'

  return (
    <div className="container-safe py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Alumni Groups</h1>
          <p className="opacity-80">Join communities by interests, location, or professional focus</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-primary flex items-center gap-2">
            <Plus size={18} />
            Create Group
          </button>
          <button className="btn-accent">My Groups</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card card p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-80">Total Groups</div>
              <div className="text-2xl font-bold">{mockGroups.length}</div>
            </div>
            <Users className="text-primary" size={18} />
          </div>
        </div>
        <div className="glass-card card p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-80">Total Members</div>
              <div className="text-2xl font-bold">{mockGroups.reduce((s,g)=>s+g.members,0).toLocaleString()}</div>
            </div>
            <TrendingUp className="text-primary" size={18} />
          </div>
        </div>
        <div className="glass-card card p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-80">Monthly Posts</div>
              <div className="text-2xl font-bold">{mockGroups.reduce((s,g)=>s+g.posts,0)}</div>
            </div>
            <MessageSquare className="text-primary" size={18} />
          </div>
        </div>
        <div className="glass-card card p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-80">Global Reach</div>
              <div className="text-2xl font-bold">{locations.length - 1}</div>
            </div>
            <Globe className="text-primary" size={18} />
          </div>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="glass-card card p-5 space-y-4">
        <div className="relative">
          <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" />
          <input
            className="w-full border rounded px-3 py-2 pl-9"
            placeholder="Search groups by name, description, or tags..."
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Category</label>
            <select className="mt-1 w-full border rounded px-3 py-2" value={selectedCategory} onChange={e=>setSelectedCategory(e.target.value)}>
              {categories.map(c => (
                <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Location</label>
            <select className="mt-1 w-full border rounded px-3 py-2" value={selectedLocation} onChange={e=>setSelectedLocation(e.target.value)}>
              {locations.map(l => (
                <option key={l} value={l}>{l === 'all' ? 'All Locations' : l}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-sm opacity-80">Showing {filteredGroups.length} of {mockGroups.length} groups</div>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map(group => (
          <div key={group.id} className="glass-card card p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                {group.image}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="font-semibold text-lg truncate">{group.name}</div>
                  <span className="text-xs px-2 py-0.5 rounded border">{group.category}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${privacyBadgeCls(group.privacy)}`}>{group.privacy}</span>
                </div>
                <p className="text-sm opacity-80 mt-1 line-clamp-3">{group.description}</p>
                <div className="flex items-center gap-4 text-sm opacity-80 mt-2">
                  <span className="flex items-center gap-1"><Users size={14} /> {group.members.toLocaleString()} members</span>
                  <span className="flex items-center gap-1"><MessageSquare size={14} /> {group.posts} posts</span>
                </div>
                <div className="flex items-center gap-1 text-sm opacity-80 mt-1">
                  <MapPin size={14} /> {group.location}
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {group.tags.slice(0,3).map((t, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded bg-gray-100 border">{t}</span>
                  ))}
                </div>
                <div className="text-xs opacity-70 mt-2">Last activity: {group.recentActivity}</div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <button className="btn-accent">View Group</button>
                  <button className="btn-primary">Join Group</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredGroups.length === 0 && (
        <div className="card p-10 text-center">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <div className="text-lg font-semibold mb-1">No groups found</div>
          <div className="opacity-80 mb-4">Try adjusting your search or filters to find more groups.</div>
          <button
            className="btn-accent"
            onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setSelectedLocation('all') }}
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Popular Categories */}
      <div>
        <h2 className="text-xl font-bold mb-4">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from(new Set(mockGroups.map(g=>g.category))).map(cat => (
            <div key={cat} className="glass-card card p-4 text-center">
              <div className="font-semibold">{cat}</div>
              <div className="text-sm opacity-70">{mockGroups.filter(g=>g.category===cat).length} groups</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
