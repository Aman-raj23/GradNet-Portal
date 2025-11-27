import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

import Landing from './pages/Landing.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AlumniDirectory from './pages/AlumniDirectory.jsx'
import AlumniProfile from './pages/AlumniProfile.jsx'
import Events from './pages/Events.jsx'
import CareersJobBoard from './pages/CareersJobBoard.jsx'
import CareersPostJob from './pages/CareersPostJob.jsx'
import CareersStartupHub from './pages/CareersStartupHub.jsx'
import CareersMentorship from './pages/CareersMentorship.jsx'
import CommunityNewsFeed from './pages/CommunityNewsFeed.jsx'
import CommunityGroups from './pages/CommunityGroups.jsx'
import NetworkMap from './pages/NetworkMap.jsx'
import Donation from './pages/Donation.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import InstituteDashboard from './pages/dashboards/InstituteDashboard.jsx'
import Achievements from './pages/Achievements.jsx'
import AlumniAnalytics from './pages/AlumniAnalytics.jsx'
import SuccessStories from './pages/SuccessStories.jsx'
import CareersAIAdvisor from './pages/CareersAIAdvisor.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import NotFound from './pages/NotFound.jsx'

function ProtectedRoute({ roles, children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />
  return children
}

export default function App() {
  const location = useLocation()
  const isLanding = location.pathname === '/'
  return (
    <AuthProvider>
      <div className={`min-h-screen flex flex-col ${!isLanding ? 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50' : ''}`}>
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<ProtectedRoute roles={['alumni','student','employer','admin','institute']}><Dashboard /></ProtectedRoute>} />

            <Route path="/alumni" element={<AlumniDirectory />} />
            <Route path="/alumni/:id" element={<AlumniProfile />} />
            <Route path="/alumni/analytics" element={<AlumniAnalytics />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/events" element={<Events />} />

            <Route path="/careers/startups" element={<CareersStartupHub />} />
            <Route path="/careers/mentorship" element={<CareersMentorship />} />
            <Route path="/careers/jobs" element={<CareersJobBoard />} />
            <Route path="/careers/post-job" element={<CareersPostJob />} />
            <Route path="/careers/ai-advisor" element={<CareersAIAdvisor />} />
            
            
            <Route path="/donate" element={<Donation />} />
            <Route path="/admin" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/institute" element={<ProtectedRoute roles={['institute']}><InstituteDashboard /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}
