import React, { useMemo, useState } from 'react'
import { Search, Plus, TrendingUp, Users, DollarSign, Calendar, Globe, Building } from 'lucide-react'

// Mock extended startups
const extendedStartups = [
  {
    id: 1,
    name: 'HealthAI',
    founder: 'Anita Verma',
    industry: 'HealthTech',
    stage: 'Series A',
    funding: '$5M',
    description: 'AI-driven diagnostics to make healthcare accessible.',
    logo: 'HA',
    employees: '20-30',
    founded: '2022',
    website: 'healthai.io',
  },
  {
    id: 2,
    name: 'AgroSense',
    founder: 'Rohan Patel',
    industry: 'AgriTech',
    stage: 'Seed',
    funding: '$800k',
    description: 'Precision farming platform for smallholder farmers.',
    logo: 'AS',
    employees: '10-15',
    founded: '2023',
    website: 'agrosense.app',
  },
  {
    id: 3,
    name: 'FinanceFlow',
    founder: 'Michael Rodriguez',
    industry: 'FinTech',
    stage: 'Series B',
    funding: '$15M',
    description: 'Automated financial planning for small businesses.',
    logo: 'FF',
    employees: '50-75',
    founded: '2021',
    website: 'financeflow.com',
  },
  {
    id: 4,
    name: 'EduConnect',
    founder: 'David Kim',
    industry: 'EdTech',
    stage: 'Seed',
    funding: '$1.2M',
    description: 'Connecting students with personalized tutoring.',
    logo: 'EC',
    employees: '10-15',
    founded: '2023',
    website: 'educonnect.io',
  },
  {
    id: 5,
    name: 'GreenLogistics',
    founder: 'Lisa Thompson',
    industry: 'Logistics',
    stage: 'Series A',
    funding: '$8M',
    description: 'Sustainable supply chain solutions using AI.',
    logo: 'GL',
    employees: '25-35',
    founded: '2022',
    website: 'greenlogistics.co',
  },
]

export default function CareersStartupHub() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('all')
  const [selectedStage, setSelectedStage] = useState('all')

  const industries = useMemo(() => ['all', ...Array.from(new Set(extendedStartups.map(s=>s.industry)))], [])
  const stages = useMemo(() => ['all', ...Array.from(new Set(extendedStartups.map(s=>s.stage)))], [])

  const filtered = useMemo(() => {
    const t = searchTerm.trim().toLowerCase()
    return extendedStartups.filter(s => {
      const matches = !t || s.name.toLowerCase().includes(t) || s.description.toLowerCase().includes(t) || s.founder.toLowerCase().includes(t)
      const ind = selectedIndustry === 'all' || s.industry === selectedIndustry
      const stg = selectedStage === 'all' || s.stage === selectedStage
      return matches && ind && stg
    })
  }, [searchTerm, selectedIndustry, selectedStage])

  const stageBadge = (stage) => {
    switch(stage){
      case 'Seed': return 'bg-yellow-100 text-yellow-800 border'
      case 'Series A': return 'bg-blue-100 text-blue-800 border'
      case 'Series B': return 'bg-green-100 text-green-800 border'
      case 'Series C': return 'bg-purple-100 text-purple-800 border'
      default: return 'bg-gray-100 text-gray-800 border'
    }
  }

  return (
    <div className="container-safe py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Startup Hub</h1>
          <p className="opacity-80">Discover innovative startups founded by our alumni community</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-primary flex items-center gap-2"><Plus size={18}/> Add Your Startup</button>
          <button className="btn-accent">Browse Jobs</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card card p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-80">Total Startups</div>
              <div className="text-2xl font-bold">{extendedStartups.length}</div>
            </div>
            <Building className="text-primary" size={18} />
          </div>
        </div>
        <div className="glass-card card p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-80">Total Funding</div>
              <div className="text-2xl font-bold">$27.5M</div>
            </div>
            <DollarSign className="text-primary" size={18} />
          </div>
        </div>
        <div className="glass-card card p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-80">Industries</div>
              <div className="text-2xl font-bold">{industries.length - 1}</div>
            </div>
            <TrendingUp className="text-primary" size={18} />
          </div>
        </div>
        <div className="glass-card card p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-80">Employees</div>
              <div className="text-2xl font-bold">200+</div>
            </div>
            <Users className="text-primary" size={18} />
          </div>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="glass-card card p-5 space-y-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" />
          <input className="w-full border rounded px-3 py-2 pl-9" placeholder="Search by name, founder, or description..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Industry</label>
            <select className="mt-1 w-full border rounded px-3 py-2" value={selectedIndustry} onChange={e=>setSelectedIndustry(e.target.value)}>
              {industries.map(ind => (
                <option key={ind} value={ind}>{ind === 'all' ? 'All Industries' : ind}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Funding Stage</label>
            <select className="mt-1 w-full border rounded px-3 py-2" value={selectedStage} onChange={e=>setSelectedStage(e.target.value)}>
              {stages.map(st => (
                <option key={st} value={st}>{st === 'all' ? 'All Stages' : st}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="text-sm opacity-80">Showing {filtered.length} of {extendedStartups.length} startups</div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(startup => (
          <div key={startup.id} className="glass-card card p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                {startup.logo}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="font-semibold text-lg truncate">{startup.name}</div>
                  <span className="text-xs px-2 py-0.5 rounded border">{startup.industry}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${stageBadge(startup.stage)}`}>{startup.stage}</span>
                </div>
                <div className="text-sm opacity-80">Founded by {startup.founder}</div>
                <p className="text-sm opacity-80 mt-1 line-clamp-3">{startup.description}</p>

                <div className="grid grid-cols-2 gap-4 text-sm mt-3">
                  <div>
                    <div className="flex items-center opacity-70 mb-1"><DollarSign size={12} className="mr-1" />Funding</div>
                    <div className="font-semibold">{startup.funding}</div>
                  </div>
                  <div>
                    <div className="flex items-center opacity-70 mb-1"><Users size={12} className="mr-1" />Team Size</div>
                    <div className="font-semibold">{startup.employees}</div>
                  </div>
                  <div>
                    <div className="flex items-center opacity-70 mb-1"><Calendar size={12} className="mr-1" />Founded</div>
                    <div className="font-semibold">{startup.founded}</div>
                  </div>
                  <div>
                    <div className="flex items-center opacity-70 mb-1"><Globe size={12} className="mr-1" />Website</div>
                    <div className="font-semibold text-xs truncate">{startup.website}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3">
                  <button className="btn-accent">Learn More</button>
                  <button className="btn-primary">Connect</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="card p-10 text-center">
          <Building className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <div className="text-lg font-semibold mb-1">No startups found</div>
          <div className="opacity-80 mb-4">Try adjusting your search terms or filters.</div>
          <button className="btn-accent" onClick={()=>{ setSearchTerm(''); setSelectedIndustry('all'); setSelectedStage('all') }}>Clear Filters</button>
        </div>
      )}
    </div>
  )
}
