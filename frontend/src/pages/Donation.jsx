import React, { useState } from 'react'
import { Heart, BookOpen, Award, Building } from 'lucide-react'

const donationGoals = [
  { id: 1, title: 'Scholarship Fund', description: 'Support deserving students with financial assistance', current: 75000, target: 100000, icon: Award, color: 'from-blue-500 to-blue-600' },
  { id: 2, title: 'Library Expansion', description: 'Modernize and expand our campus library facilities', current: 45000, target: 80000, icon: BookOpen, color: 'from-green-500 to-green-600' },
  { id: 3, title: 'Research Labs', description: 'Upgrade laboratory equipment and facilities', current: 32000, target: 60000, icon: Building, color: 'from-purple-500 to-purple-600' },
]

export default function Donation() {
  const [activeTab, setActiveTab] = useState('money')
  const [selectedAmount, setSelectedAmount] = useState(100)
  const [customAmount, setCustomAmount] = useState('')
  const [donationType, setDonationType] = useState('general')
  const [bookDetails, setBookDetails] = useState({ title: '', author: '', edition: '', condition: 'good', notes: '' })

  const presetAmounts = [25, 50, 100, 250, 500, 1000]

  const handleDonate = (e) => {
    e.preventDefault()
    const amount = Number(customAmount) || selectedAmount
    // submit donation
    alert(`Thanks for donating $${amount.toLocaleString()} to ${donationType}!`)
  }

  const handleBookDonate = (e) => {
    e.preventDefault()
    // submit book donation
    alert(`Thanks for donating book: ${bookDetails.title}`)
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900">
      <div className="container-safe py-12">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <Heart className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Support Your Alma Mater</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">Your generous contributions help us continue our mission of excellence in education, research, and community service. Every donation makes a difference.</p>
        </div>

        {/* Goals */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-6">Current Fundraising Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {donationGoals.map((goal) => {
              const Icon = goal.icon
              const pct = Math.min(100, (goal.current / goal.target) * 100)
              return (
                <div key={goal.id} className="rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-4 bg-gradient-to-br ${goal.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-lg font-semibold text-gray-900">{goal.title}</div>
                  <div className="text-gray-600 text-sm">{goal.description}</div>
                  <div className="mt-4 space-y-2">
                    <div className="w-full bg-gray-200 rounded h-3 overflow-hidden">
                      <div className="bg-accent h-3" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-gray-900">${goal.current.toLocaleString()}</span>
                      <span className="text-gray-600">${goal.target.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-600">{pct.toFixed(0)}% of goal reached</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-2 gap-2 max-w-md mx-auto mb-6">
            <button className={`px-4 py-2 rounded ${activeTab==='money'?'bg-accent text-black':'bg-white border border-gray-300 text-gray-700'}`} onClick={()=>setActiveTab('money')}>Monetary Donation</button>
            <button className={`px-4 py-2 rounded ${activeTab==='books'?'bg-accent text-black':'bg-white border border-gray-300 text-gray-700'}`} onClick={()=>setActiveTab('books')}>Donate Books</button>
          </div>

          {activeTab === 'money' && (
            <div className="rounded-xl border border-white/10 bg-white p-6 text-black">
              <div className="text-center mb-4">
                <div className="text-2xl font-semibold">Make a Donation</div>
                <div className="text-gray-600 text-sm">Choose your donation amount and help us achieve our goals</div>
              </div>
              <form onSubmit={handleDonate} className="space-y-6">
                <div>
                  <div className="text-base font-semibold mb-3">Donation Purpose</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {['general','scholarship','library','research'].map((t)=> (
                      <button key={t} type="button" onClick={()=>setDonationType(t)} className={`px-3 py-2 rounded border ${donationType===t?'bg-black text-white border-black':'bg-white hover:bg-gray-50 border-gray-300'}`}>{t[0].toUpperCase()+t.slice(1)}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-base font-semibold mb-3">Donation Amount</div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-4">
                    {presetAmounts.map(a => (
                      <button key={a} type="button" onClick={()=>{ setSelectedAmount(a); setCustomAmount('') }} className={`px-3 py-2 rounded border ${selectedAmount===a && !customAmount?'bg-black text-white border-black':'bg-white hover:bg-gray-50 border-gray-300'}`}>${a}</button>
                    ))}
                  </div>
                  <div>
                    <label className="text-sm text-gray-700">Custom Amount</label>
                    <input type="number" className="mt-1 border border-gray-300 bg-white text-black rounded px-3 py-2 w-full" placeholder="Enter custom amount" value={customAmount} onChange={e=>{ setCustomAmount(e.target.value); setSelectedAmount(0) }} />
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Donation:</span>
                    <span className="text-2xl font-bold text-gray-900">${(Number(customAmount)||selectedAmount).toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Your donation will support: {donationType[0].toUpperCase()+donationType.slice(1)}</p>
                </div>

                <button type="submit" className="w-full btn-accent inline-flex items-center justify-center gap-2">
                  <Heart className="h-5 w-5" />
                  Donate Now
                </button>
              </form>
            </div>
          )}

          {activeTab === 'books' && (
            <div className="rounded-xl border border-gray-200 bg-white p-6 text-black">
              <div className="text-center mb-4">
                <div className="text-2xl font-semibold">Donate Books</div>
                <div className="text-gray-600 text-sm">Help expand our library collection by donating books</div>
              </div>
              <form onSubmit={handleBookDonate} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-700">Book Title *</label>
                    <input className="mt-1 border border-gray-300 bg-white text-black rounded px-3 py-2 w-full" value={bookDetails.title} onChange={e=>setBookDetails({ ...bookDetails, title: e.target.value })} placeholder="Enter book title" required />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700">Author *</label>
                    <input className="mt-1 border border-gray-300 bg-white text-black rounded px-3 py-2 w-full" value={bookDetails.author} onChange={e=>setBookDetails({ ...bookDetails, author: e.target.value })} placeholder="Enter author name" required />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-700">Edition</label>
                    <input className="mt-1 border border-gray-300 bg-white text-black rounded px-3 py-2 w-full" value={bookDetails.edition} onChange={e=>setBookDetails({ ...bookDetails, edition: e.target.value })} placeholder="e.g., 3rd Edition, 2023" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700">Condition</label>
                    <select className="mt-1 border border-gray-300 bg-white text-black rounded px-3 py-2 w-full" value={bookDetails.condition} onChange={e=>setBookDetails({ ...bookDetails, condition: e.target.value })}>
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="fair">Fair</option>
                      <option value="poor">Poor</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-700">Additional Notes</label>
                  <textarea className="mt-1 border border-gray-300 bg-white text-black rounded px-3 py-2 w-full" rows={3} value={bookDetails.notes} onChange={e=>setBookDetails({ ...bookDetails, notes: e.target.value })} placeholder="Any additional information about the book..." />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg text-gray-900">
                  <h4 className="font-semibold mb-2">Donation Guidelines</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Books should be in readable condition</li>
                    <li>• Academic and reference books are especially welcome</li>
                    <li>• We'll contact you about pickup or drop-off arrangements</li>
                    <li>• You'll receive a donation receipt for tax purposes</li>
                  </ul>
                </div>

                <button type="submit" className="w-full btn-accent inline-flex items-center justify-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Submit Book Donation
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Impact */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Your Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">1,250+</div>
              <p className="text-gray-600">Students Supported</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">$2.5M</div>
              <p className="text-gray-600">Total Raised This Year</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <p className="text-gray-600">Funds Go Directly to Programs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
