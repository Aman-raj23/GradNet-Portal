import React, { useEffect, useState } from 'react'
import { useApi } from '../api/client.jsx'

export default function CommunityNewsFeed() {
  const { get, post } = useApi()
  const [posts, setPosts] = useState([])
  const [content, setContent] = useState('')

  useEffect(()=>{ get('/posts').then(setPosts) },[])
  const submit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return
    try {
      const p = await post('/posts', { content })
      setPosts(prev=>[p, ...prev])
      setContent('')
    } catch {}
  }

  return (
    <div className="container-safe py-8 grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-3">
        <form onSubmit={submit} className="card p-4">
          <textarea className="w-full border rounded p-2" rows="3" placeholder="Share an update..." value={content} onChange={e=>setContent(e.target.value)} />
          <div className="mt-2 flex justify-end"><button className="btn-primary">Post</button></div>
        </form>
        {posts.map(p => (
          <div key={p.id} className="card p-4">
            <div className="text-sm text-gray-500">{new Date(p.createdAt).toLocaleString()}</div>
            <div className="mt-1">{p.content}</div>
            <div className="mt-2 text-sm text-gray-600">❤ {p.likes} · 💬 {p.comments}</div>
          </div>
        ))}
      </div>
      <div>
        <div className="card p-4"><div className="font-semibold">Groups</div><p className="text-sm text-gray-600 mt-2">Join interest-based chapters and city groups.</p></div>
      </div>
    </div>
  )
}
