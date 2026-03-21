import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Mail, Trash2, Clock, User, MessageSquare } from 'lucide-react'

const MessageManager = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) console.error('Error fetching messages:', error)
    else setMessages(data)
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', id)
      
      if (error) alert('Error deleting message: ' + error.message)
      else fetchMessages()
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-PK', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="message-manager">
      <div className="manager-header" style={{marginBottom: '30px'}}>
        <h3>Customer Messages</h3>
        <p style={{color: 'var(--text-muted)'}}>Inquiries and feedback from the Contact Us page.</p>
      </div>

      <div className="messages-list" style={{display: 'grid', gap: '20px'}}>
        {messages.map(msg => (
          <div key={msg.id} className="message-card" style={{background: 'var(--bg-card)', padding: '25px', borderRadius: '12px', border: '1px solid var(--border)', transition: 'var(--transition)'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px'}}>
              <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
                <div style={{width: '45px', height: '45px', background: 'rgba(255,140,0,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)'}}>
                  <User size={20} />
                </div>
                <div>
                  <h4 style={{margin: 0}}>{msg.name}</h4>
                  <p style={{margin: 0, fontSize: '0.85rem', color: 'var(--primary)'}}>{msg.email}</p>
                </div>
              </div>
              <div style={{textAlign: 'right'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '5px'}}>
                  <Clock size={14} /> {formatDate(msg.created_at)}
                </div>
                <div style={{display: 'flex', gap: '10px', justifyContent: 'flex-end'}}>
                  <a 
                    href={`mailto:${msg.email}?subject=Reply from Desi Hut MJM Restaurant&body=Hello ${msg.name},%0A%0AReaching out regarding your message: "${msg.message}"%0A%0A`}
                    style={{color: 'var(--primary)', background: 'none', padding: '5px', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center'}}
                    title="Reply via Email"
                  >
                    <Mail size={18} />
                  </a>
                  <button 
                    onClick={() => handleDelete(msg.id)}
                    style={{color: '#ff4444', background: 'none', padding: '5px', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center'}}
                    title="Delete Message"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
            
            <div style={{background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '8px', borderLeft: '3px solid var(--primary)'}}>
              <p style={{margin: 0, fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-main)'}}>{msg.message}</p>
            </div>
          </div>
        ))}

        {loading && <p style={{textAlign: 'center', padding: '20px'}}>Loading messages...</p>}
        {!loading && messages.length === 0 && (
          <div style={{textAlign: 'center', padding: '50px', background: 'var(--bg-card)', borderRadius: '12px', border: '1px dashed var(--border)'}}>
            <Mail size={48} style={{color: 'var(--border)', marginBottom: '15px'}} />
            <p style={{color: 'var(--text-muted)'}}>No messages yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MessageManager
