import React, { useEffect, useMemo, useState } from 'react'
import SubNavbar from '../components/SubNavbar.jsx'
import { Link } from 'react-router-dom'

export default function AlumniDirectory() {
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')
  const [filters, setFilters] = useState({ year:'all', major:'all', industry:'all', city:'all' })

  // Fallback demo data to enrich the directory when backend has no seeded data
  const demoMock = [
    { id: 1001, name: 'Aarav Sharma', year: '2020', major: 'Computer Science', city: 'Bengaluru', industry: 'Software' },
    { id: 1002, name: 'Ishita Verma', year: '2019', major: 'Information Technology', city: 'Pune', industry: 'FinTech' },
    { id: 1003, name: 'Rohan Mehta', year: '2018', major: 'Electronics', city: 'Hyderabad', industry: 'Semiconductors' },
    { id: 1004, name: 'Neha Gupta', year: '2021', major: 'Mechanical', city: 'Mumbai', industry: 'Automobile' },
    { id: 1005, name: 'Vikram Singh', year: '2017', major: 'Civil', city: 'Delhi', industry: 'Construction' },
    { id: 1006, name: 'Sara Khan', year: '2022', major: 'Computer Science', city: 'Chennai', industry: 'EdTech' },
    { id: 1007, name: 'Kabir Nair', year: '2016', major: 'Biotech', city: 'Kolkata', industry: 'Healthcare' },
    { id: 1008, name: 'Ananya Iyer', year: '2020', major: 'Electrical', city: 'Bengaluru', industry: 'Energy' },
    { id: 1009, name: 'Harsh Patel', year: '2019', major: 'Computer Science', city: 'Ahmedabad', industry: 'E-commerce' },
    { id: 1010, name: 'Priya Desai', year: '2018', major: 'Information Technology', city: 'Surat', industry: 'Retail' },
    { id: 1011, name: 'Aditya Rao', year: '2021', major: 'AI & ML', city: 'Bengaluru', industry: 'AI/ML' },
    { id: 1012, name: 'Mira Joshi', year: '2017', major: 'Data Science', city: 'Pune', industry: 'Analytics' },
  ]

  // Fetch data from backend based on query and filters
  useEffect(() => {
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (filters.year !== 'all') params.set('year', filters.year)
    if (filters.major !== 'all') params.set('major', filters.major)
    if (filters.industry !== 'all') params.set('industry', filters.industry)
    if (filters.city !== 'all') params.set('city', filters.city)
    fetch('http://localhost:5000/api/alumni/search?' + params.toString())
      .then(r => r.json())
      .then(data => {
        // If backend has no data, fall back to our demo mock
        setItems(Array.isArray(data) && data.length > 0 ? data : demoMock)
      })
      .catch(() => setItems([]))
  }, [q, filters])

  // Derive unique lists for filter dropdowns from current results
  const years = useMemo(() => Array.from(new Set(items.map(a => a.year))).filter(Boolean).sort(), [items])
  const majors = useMemo(() => Array.from(new Set(items.map(a => a.major))).filter(Boolean).sort(), [items])
  const industries = useMemo(() => Array.from(new Set(items.map(a => a.industry))).filter(Boolean).sort(), [items])
  const cities = useMemo(() => Array.from(new Set(items.map(a => a.city))).filter(Boolean).sort(), [items])

  // Quick derived stats
  const stats = {
    total: items.length,
    industries: industries.length,
    years: years.length,
    activeThisMonth: '—', // Placeholder if no activity metric available
  }

  const clearFilters = () => setFilters({ year:'all', major:'all', industry:'all', city:'all' })

  return (
    <div>
      {/* Header */}
      <div className="container-safe py-6">
        <h1 className="text-2xl md:text-3xl font-bold">Alumni Directory</h1>
        <p className="opacity-80">Connect with {stats.total}+ alumni across industries and locations</p>
      </div>

      {/* Search + Filters */}
      <SubNavbar>
        <input
          placeholder="Search by name, company, position, or skills..."
          className="border rounded px-3 py-2 w-full md:w-72"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <select
          className="border rounded px-3 py-2"
          value={filters.year}
          onChange={e=>setFilters(f=>({...f,year:e.target.value}))}
        >
          <option value="all">All Years</option>
          {years.map(y=> <option key={y} value={y}>{y}</option>)}
        </select>
        <select
          className="border rounded px-3 py-2"
          value={filters.major}
          onChange={e=>setFilters(f=>({...f,major:e.target.value}))}
        >
          <option value="all">All Majors</option>
          {majors.map(m=> <option key={m} value={m}>{m}</option>)}
        </select>
        <select
          className="border rounded px-3 py-2"
          value={filters.industry}
          onChange={e=>setFilters(f=>({...f,industry:e.target.value}))}
        >
          <option value="all">All Industries</option>
          {industries.map(i=> <option key={i} value={i}>{i}</option>)}
        </select>
        <select
          className="border rounded px-3 py-2"
          value={filters.city}
          onChange={e=>setFilters(f=>({...f,city:e.target.value}))}
        >
          <option value="all">All Locations</option>
          {cities.map(c=> <option key={c} value={c}>{c}</option>)}
        </select>
        <button className="btn-accent" onClick={clearFilters}>Clear</button>
      </SubNavbar>

      {/* Stats */}
      <div className="container-safe py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border p-5 text-center">
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-sm opacity-80">Total Alumni</div>
        </div>
        <div className="rounded-xl border p-5 text-center">
          <div className="text-2xl font-bold">{stats.industries}</div>
          <div className="text-sm opacity-80">Industries</div>
        </div>
        <div className="rounded-xl border p-5 text-center">
          <div className="text-2xl font-bold">{stats.years}</div>
          <div className="text-sm opacity-80">Graduation Years</div>
        </div>
        <div className="rounded-xl border p-5 text-center">
          <div className="text-2xl font-bold">{stats.activeThisMonth}</div>
          <div className="text-sm opacity-80">Active This Month</div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="container-safe pb-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(a=> (
          <div key={a.id} className="card p-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 grid place-items-center text-primary font-bold">
                {a.name?.split(' ').map(x=>x[0]).join('').slice(0,2) || 'AL'}
              </div>
              <div className="min-w-0">
                <div className="font-semibold truncate">{a.name}</div>
                <div className="text-sm text-gray-600">Batch {a.year}{a.major? ` · ${a.major}`:''}</div>
                <div className="text-sm text-gray-600">{a.city}{a.industry? ` · ${a.industry}`:''}</div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link to={`/alumni/${a.id}`} className="btn-primary text-center">View Profile</Link>
              <button className="btn-accent">Connect</button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {items.length === 0 && (
        <div className="container-safe pb-12">
          <div className="card p-8 text-center">
            <div className="text-lg font-semibold mb-2">No alumni found</div>
            <div className="opacity-80 mb-4">Try adjusting your search or filters to find more alumni.</div>
            <button className="btn-accent" onClick={clearFilters}>Clear All Filters</button>
          </div>
        </div>
      )}
    </div>
  )
}
