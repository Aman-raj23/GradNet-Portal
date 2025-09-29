import React from 'react'

export default function SuccessStories() {
  const featured = {
    title: 'Building a Unicorn from a Dorm Room',
    author: 'Raj Mehta',
    excerpt: 'From late-night hackathons to a billion-dollar valuation, Raj shares lessons on resilience, culture, and customer obsession.',
    tags: ['Startups','Leadership','Product'],
  }

  const stories = [
    { id:1, title:'From Campus to Unicorn', author:'Raj Mehta', tags:['Startups','Growth'], date:'2024-11-10', summary:'How an idea at the university transformed into a global platform.' },
    { id:2, title:'Global Impact through AI', author:'Arjun Mentor', tags:['AI','Healthcare'], date:'2025-01-22', summary:'Deploying AI solutions to improve access to diagnostics.' },
    { id:3, title:'Designing for Billions', author:'Priya Nair', tags:['UX','Scale'], date:'2024-09-03', summary:'Scaling design systems that power daily life for billions of users.' },
    { id:4, title:'Green Energy at Scale', author:'Aman Mehta', tags:['Energy','Sustainability'], date:'2024-12-05', summary:'Driving the transition to renewables across emerging markets.' },
    { id:5, title:'Cracking the PM Interview', author:'Anandita Rao', tags:['Career','PM'], date:'2025-02-14', summary:'A tactical guide to PM roles from campus to FAANG.' },
    { id:6, title:'Research to Reality', author:'Kabir Nair', tags:['Research','Spinout'], date:'2024-08-19', summary:'Turning lab breakthroughs into a venture-backed company.' },
  ]

  return (
    <div className="container-safe py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold">Alumni Success Stories</h1>
        <p className="opacity-80">Inspiring journeys from our global alumni network</p>
      </div>

      {/* Featured */}
      <div className="glass-card card p-6">
        <div className="grid md:grid-cols-3 gap-4 items-center">
          <div className="md:col-span-2">
            <div className="text-sm text-gray-500">Story of the Month</div>
            <div className="text-2xl font-bold mt-1">{featured.title}</div>
            <div className="text-sm text-gray-600 mt-1">by {featured.author}</div>
            <p className="text-gray-800 mt-3">{featured.excerpt}</p>
            <div className="flex gap-2 mt-3 flex-wrap">
              {featured.tags.map((t,i)=>(
                <span key={i} className="text-xs px-2 py-0.5 rounded bg-gray-100 border">{t}</span>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-full h-40 rounded-lg bg-gradient-to-br from-blue-50 to-purple-100 grid place-items-center text-primary font-semibold">
              FEATURED
            </div>
          </div>
        </div>
      </div>

      {/* Stories grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stories.map(s => (
          <div key={s.id} className="glass-card card p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary text-white grid place-items-center font-semibold">
                {s.author.split(' ').map(x=>x[0]).join('').slice(0,2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate">{s.title}</div>
                <div className="text-sm text-gray-600">{s.author}</div>
              </div>
            </div>
            <p className="text-sm opacity-80 mt-2 line-clamp-3">{s.summary}</p>
            <div className="flex items-center justify-between mt-3">
              <div className="flex flex-wrap gap-1">
                {s.tags.slice(0,3).map((t,i)=>(
                  <span key={i} className="text-xs px-2 py-0.5 rounded bg-gray-100 border">{t}</span>
                ))}
              </div>
              <div className="text-xs text-gray-500">{new Date(s.date).toLocaleDateString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
