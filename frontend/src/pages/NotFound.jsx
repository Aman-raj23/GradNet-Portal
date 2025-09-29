import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container-safe py-16 text-center">
      <div className="text-6xl font-extrabold text-primary">404</div>
      <p className="mt-2 text-gray-600">The page you are looking for does not exist.</p>
      <Link to="/" className="btn-primary mt-4 inline-block">Go Home</Link>
    </div>
  )
}
