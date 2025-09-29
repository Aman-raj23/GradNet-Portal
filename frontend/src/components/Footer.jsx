import React from 'react'

export default function Footer() {
  return (
    <footer className="mt-12 border-t bg-white">
      <div className="container-safe py-8 grid md:grid-cols-3 gap-6">
        <div>
          <div className="text-primary font-bold text-lg">GradNet</div>
          <p className="text-sm text-gray-600">Building a prestigious, connected alumni community.</p>
        </div>
        <div>
          <div className="font-semibold mb-2">Useful Links</div>
          <ul className="text-sm text-primary space-y-1">
            <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
            <li><a href="/alumni" className="hover:underline">Alumni Directory</a></li>
            <li><a href="/careers/jobs" className="hover:underline">Jobs</a></li>
            <li><a href="/events" className="hover:underline">Events</a></li>
            <li><a href="/community/feed" className="hover:underline">News Feed</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Get Involved</div>
          <ul className="text-sm text-primary space-y-1">
            <li><a href="/careers/mentorship" className="hover:underline">Become a Mentor</a></li>
            <li><a href="/careers/post-job" className="hover:underline">Post a Job</a></li>
            <li><a href="/careers/startups" className="hover:underline">Share Your Startup</a></li>
            <li><a href="/donate" className="hover:underline">Donate</a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
