import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Landing() {
  // Minimal components and data for new sections
  const stats = [
    { number: '12,450+', label: 'Alumni' },
    { number: '320+', label: 'Jobs' },
    { number: '85+', label: 'Events' },
    { number: '60+', label: 'Startups' },
  ]

  const features = [
    { icon: () => '🤝', title: 'Powerful Alumni Network', description: 'Find mentors and leaders across industries.' },
    { icon: () => '🚀', title: 'Career Acceleration', description: 'Jobs, mentorship, and startup hub.' },
    { icon: () => '🎉', title: 'Events & Community', description: 'Meetups, groups, and global chapters.' },
    { icon: () => '💡', title: 'Opportunities', description: 'Scholarships, projects, and collaborations.' },
  ]

  function Card({ className = '', children }) {
    return (
      <div className={`rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm ${className}`}>{children}</div>
    )
  }

  function CardContent({ className = '', children }) {
    return <div className={className}>{children}</div>
  }

  function Button({ className = '', variant = 'accent', to = '#', children }) {
    const base = variant === 'outline'
      ? 'border border-white/20 text-white hover:bg-white/10'
      : 'btn-accent'
    return (
      <Link to={to} className={`${base} ${className}`}>{children}</Link>
    )
  }

  function ArrowRightIcon(props) {
    return (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
      </svg>
    )
  }

  function HeartIcon(props) {
    return (
      <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21s-6.716-4.35-9.428-7.06C.86 12.228 0 10.846 0 9.333 0 6.94 1.94 5 4.333 5c1.4 0 2.733.667 3.667 1.733C8.934 5.667 10.266 5 11.667 5 14.06 5 16 6.94 16 9.333c0 1.513-.86 2.894-2.572 4.607C18.716 16.65 12 21 12 21z" />
      </svg>
    )
  }

  function Counter({ end = 0, duration = 1200 }) {
    const [value, setValue] = React.useState(0)
    React.useEffect(() => {
      const start = 0
      const diff = end - start
      const startTs = performance.now()
      let raf
      const step = (ts) => {
        const elapsed = ts - startTs
        const progress = Math.min(1, elapsed / duration)
        setValue(Math.floor(start + diff * progress))
        if (progress < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
      return () => cancelAnimationFrame(raf)
    }, [end, duration])
    return <span>{value.toLocaleString()}</span>
  }

  return (
    <div>
      <section className="bg-gradient-to-br from-primary to-black text-white">
        <div className="container-safe py-16 text-center">
          {/* <img
            src="/logo.png"
            alt="GradNet Logo"
            width={96}
            height={96}
            className="mx-auto w-24 h-24 rounded-xl shadow-lg border-2 border-accent bg-white/10 p-2"
          /> */}
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex justify-center mb-2"
          >
            <motion.img
              src="/logo.png"
              alt="Gradnet Logo"
              width={200}
              height={200}
              className="mx-auto"
              animate={{ rotate: [0, 5, -5, 0] }} // gentle wobble
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight text-balance"
          >
            Welcome to{' '}
            <motion.span
              className="inline-block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            >
              GradNet
            </motion.span>
          </motion.h1>
          <p className="mt-3 text-lg sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Connecting Alumni, Students, and Institutions
            </span>{' '}
            in one powerful platform
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/login" className="btn-accent">Get Started</Link>
            <Link to="/alumni" className="btn-primary bg-white text-primary">Explore as Guest</Link>
          </div>
        </div>
      </section>
      {/* Stats Section (light gradient) */}
      <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container-safe py-10 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-4xl font-bold text-primary mb-1">
                  <Counter end={parseInt(stat.number.replace(/\D/g, ''))} />
                  {stat.number.replace(/[0-9]/g, '')}
                </div>
                <div className="text-primary/80 font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section (dark theme) */}
      <section className="bg-gradient-to-br from-primary to-black text-white py-16">
        <div className="container-safe text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Explore What You Can Do
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-3">
              Build meaningful relationships, advance your career, and give back to your alma mater
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
                viewport={{ once: true }}
              >
                <Card className="p-6 hover:shadow-2xl hover:shadow-black/20 transition-transform duration-300 group">
                  <CardContent className="text-center">
                    <motion.div
                      className="bg-white/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 text-2xl"
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <span aria-hidden>{feature.icon()}</span>
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-white/70">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
      </section>

      {/* AI Matchmaking Section (dark theme) */}
      <section className="bg-gradient-to-br from-primary to-black text-white py-20">
        <div className="container-safe text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI-Powered Alumni Matchmaking 🤖
          </h2>
          <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
            Our intelligent engine connects you with the right people, opportunities, and communities.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left">
              <h3 className="text-xl font-semibold mb-2">👩‍🏫 Top Mentors</h3>
              <p className="text-white/70">Get personalized mentor recommendations from experienced alumni.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left">
              <h3 className="text-xl font-semibold mb-2">💼 Job Opportunities</h3>
              <p className="text-white/70">Discover jobs posted by alumni and employers that match your skills.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left">
              <h3 className="text-xl font-semibold mb-2">🌐 Events & Communities</h3>
              <p className="text-white/70">Join alumni-driven events, groups, and communities relevant to your interests.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section (light gradient) */}
      <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
        <div className="container-safe text-center">
          <Card className="p-8 md:p-12">
            <CardContent className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Ready to join the network?
              </h2>
              <p className="text-xl text-gray-700">Connect with alumni, find mentors, and unlock new opportunities</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button to="/register" className="text-lg px-8 py-3 inline-flex items-center justify-center gap-2">
                  Join GradNet
                  <ArrowRightIcon className="h-5 w-5" />
                </Button>
                <Button
                  to="/login"
                  variant="outline"
                  className="hidden"
                >Sign In (placeholder)</Button>
                <Link
                  to="/login"
                  className="text-lg px-8 py-3 inline-flex items-center justify-center bg-blue-900 text-white border border-blue-800 hover:bg-blue-800 hover:border-blue-900 shadow font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Sign In
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Donate Section (dark theme) */}
      <section className="bg-gradient-to-br from-primary to-black text-white py-20">
        <div className="container-safe text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Support GradNet ❤️
          </h2>
          <p className="text-xl text-white/80 mb-8">Your donation helps us grow, maintain servers, and build new features for students and alumni.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/donate" className="text-lg px-8 py-3 inline-flex items-center justify-center gap-2">
              <HeartIcon className="h-5 w-5" />
              Donate Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer (dark theme)
      <footer className="border-t border-white/10 py-12">
        <div className="container-safe text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-0 rounded-xl">
              <img src="/logo.png" alt="GradNet Logo" width={40} height={40} className="mx-auto" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">GradNet</span>
          </div>
          <p className="text-white/60">© 2025 GradNet. Connecting generations of graduates.</p>
        </div>
      </footer> */}
    </div>
  )
}

