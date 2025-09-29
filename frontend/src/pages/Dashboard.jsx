import React from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import StatCard from '../components/StatCard.jsx'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts'
import AdminDashboard from './dashboards/AdminDashboard.jsx'
import AlumniDashboard from './dashboards/AlumniDashboard.jsx'
import StudentDashboard from './dashboards/StudentDashboard.jsx'
import EmployerDashboard from './dashboards/EmployerDashboard.jsx'
import InstituteDashboard from './dashboards/InstituteDashboard.jsx'

const data = [
  { name: 'Mon', value: 12 }, { name: 'Tue', value: 18 }, { name: 'Wed', value: 22 }, { name: 'Thu', value: 28 }, { name: 'Fri', value: 21 }, { name: 'Sat', value: 30 }, { name: 'Sun', value: 25 }
]

export default function Dashboard() {
  const { user } = useAuth()

  const role = user?.role

  let content = null
  switch (role) {
    case 'admin':
      content = <AdminDashboard />
      break
    case 'alumni':
      content = <AlumniDashboard />
      break
    case 'student':
      content = <StudentDashboard />
      break
    case 'employer':
      content = <EmployerDashboard />
      break
    case 'institute':
      content = <InstituteDashboard />
      break
    default:
      content = (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Alumni" value="12,450" />
            <StatCard label="Jobs" value="320" />
            <StatCard label="Events" value="85" />
            <StatCard label="Engagement" value="72%" />
          </div>
          <div className="card p-4">
            <div className="font-semibold mb-2">Weekly Engagement</div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#003366" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#003366" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="#003366" fillOpacity={1} fill="url(#color)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )
  }

  return (
    <div className="container-safe py-8 space-y-8">
      {/* <h1 className="text-2xl font-bold">{`Welcome${user ? `, ${user.name}` : ''}`}</h1> */}
      {content}
    </div>
  )
}
