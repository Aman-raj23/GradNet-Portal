import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { Menu } from 'lucide-react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const [open, setOpen] = React.useState(false)
  const location = useLocation()

  // Hide nav items on landing page when no one is logged in
  const publicNoNavRoutes = ['/', '/login', '/register']
  const showNav = !(publicNoNavRoutes.includes(location.pathname) && !user)

  const navItem = (to, label) => (
    <NavLink to={to} className={({isActive})=>`px-3 py-2 rounded-md ${isActive?'text-accent':'text-white/90 hover:text-accent'}`}>{label}</NavLink>
  )

  return (
    <header className="bg-gradient-to-r from-primary to-[#001a44] sticky top-0 z-40 shadow">
      <div className="container-safe flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="GradNet logo" className="h-8 w-8 rounded-sm" />
          <span className="text-white font-extrabold text-xl tracking-tight">GradNet</span>
        </Link>
        {showNav && (
        <nav className="hidden md:flex items-center gap-1">
          {navItem(user?.role === 'admin' ? '/admin' : '/dashboard', 'Home')}
          <div className="group relative">
            <button className="px-3 py-2 text-white/90 hover:text-accent">Alumni ▾</button>
            <div className="absolute hidden group-hover:block bg-white rounded-md shadow-lg p-2 w-56">
              <Link className="block px-3 py-2 hover:bg-gray-100 rounded" to="/alumni">Directory</Link>
              <Link className="block px-3 py-2 hover:bg-gray-100 rounded" to="/success-stories">Success Stories</Link>
              <Link className="block px-3 py-2 hover:bg-gray-100 rounded" to="/alumni/analytics">Analytics</Link>
            </div>
          </div>
          <div className="group relative">
            <button className="px-3 py-2 text-white/90 hover:text-accent">Careers ▾</button>
            <div className="absolute hidden group-hover:block bg-white rounded-md shadow-lg p-2 w-56">
              <Link className="block px-3 py-2 hover:bg-gray-100 rounded" to="/careers/jobs">Browse Jobs</Link>
              <Link className="block px-3 py-2 hover:bg-gray-100 rounded" to="/careers/startups">Startup Hub</Link>
              <Link className="block px-3 py-2 hover:bg-gray-100 rounded" to="/careers/mentorship">Mentorship</Link>
              <Link className="block px-3 py-2 hover:bg-gray-100 rounded" to="/careers/ai-advisor">AI Career Advisor 🤖</Link>
            </div>
          </div>
          <div className="group relative">
            <button className="px-3 py-2 text-white/90 hover:text-accent">Events ▾</button>
            <div className="absolute hidden group-hover:block bg-white rounded-md shadow-lg p-2 w-48">
              <Link className="block px-3 py-2 hover:bg-gray-100 rounded" to="/events">Upcoming</Link>
            </div>
          </div>
          <div className="group relative">
            <button className="px-3 py-2 text-white/90 hover:text-accent">Community ▾</button>
            <div className="absolute hidden group-hover:block bg-white rounded-md shadow-lg p-2 w-56">
              <Link className="block px-3 py-2 hover:bg-gray-100 rounded" to="/community/feed">News Feed</Link>
              <Link className="block px-3 py-2 hover:bg-gray-100 rounded" to="/community/groups">Groups</Link>
              <Link className="block px-3 py-2 hover:bg-gray-100 rounded" to="/network-map">Network Map 🌍</Link>
            </div>
          </div>
          <div className="group relative">
            <button className="px-3 py-2 text-white/90 hover:text-accent">Donate ▾</button>
            <div className="absolute hidden group-hover:block bg-white rounded-md shadow-lg p-2 w-48">
              <Link className="block px-3 py-2 hover:bg-gray-100 rounded" to="/donate">Money | Books</Link>
            </div>
          </div>
          {/* Admin link removed; Home now routes to /admin when user is admin */}
        </nav>
        )}

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="hidden sm:block text-white/90">{user.name} · {user.role}</span>
              <button className="btn-accent" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-accent">Login</Link>
              <Link to="/register" className="btn-primary bg-white text-primary">Register</Link>
            </>
          )}
          {showNav && (
            <button className="md:hidden text-white" onClick={()=>setOpen(v=>!v)}><Menu size={22} /></button>
          )}
        </div>
      </div>
      {open && showNav && (
        <div className="md:hidden bg-primary/95 text-white px-4 pb-4 space-y-2">
          <div className="flex flex-col">
            <Link to={user?.role === 'admin' ? '/admin' : '/dashboard'} className="py-1">Home</Link>
            <Link to="/alumni" className="py-1">Alumni Directory</Link>
            <Link to="/careers/jobs" className="py-1">Jobs</Link>
            <Link to="/events" className="py-1">Events</Link>
            <Link to="/community/feed" className="py-1">Community</Link>
            <Link to="/donate" className="py-1">Donate</Link>
            {/* Admin link removed; consider adding a conditional Home link if needed */}
            {!user && (
              <>
                <Link to="/login" className="py-1">Login</Link>
                <Link to="/register" className="py-1">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}