import React from 'react'

export default function SubNavbar({ children }) {
  return (
    <div className="bg-white/80 backdrop-blur border-b sticky top-16 z-30">
      <div className="container-safe py-2 flex items-center gap-2 overflow-x-auto">
        {children}
      </div>
    </div>
  )
}
