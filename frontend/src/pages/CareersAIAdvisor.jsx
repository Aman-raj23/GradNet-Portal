import React, { useState, useRef, useEffect } from 'react'

export default function CareersAIAdvisor() {
  const [messages, setMessages] = useState([{ role:'assistant', content:'Hi! I am your AI Career Advisor. How can I help?' }])
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  useEffect(()=>{ bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const send = () => {
    if (!input.trim()) return
    setMessages(m => [...m, { role:'user', content: input }, { role:'assistant', content: 'Thanks! For the prototype, imagine I provided tailored advice.' }])
    setInput('')
  }

  const quick = ['Resume tips','Interview prep','Career switch','Best roles for me']

  return (
    <div className="container-safe py-8 grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 card p-4 h-[70vh] flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-3">
          {messages.map((m,i)=> (
            <div key={i} className={`p-3 rounded max-w-[80%] ${m.role==='user'?'bg-primary text-white ml-auto':'bg-gray-100'}`}>{m.content}</div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className="mt-3 flex gap-2">
          <input className="flex-1 border rounded px-3 py-2" value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask about jobs, roles, skills..." />
          <button className="btn-primary" onClick={send}>Send</button>
        </div>
      </div>
      <div className="space-y-2">
        <div className="card p-4">
          <div className="font-semibold mb-2">Quick Topics</div>
          <div className="flex flex-wrap gap-2">
            {quick.map(q=> <button key={q} onClick={()=>setInput(q)} className="px-3 py-1 rounded bg-primary/10 text-primary text-sm">{q}</button>)}
          </div>
        </div>
      </div>
    </div>
  )
}
