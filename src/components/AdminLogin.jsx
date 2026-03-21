import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Lock, Mail, AlertCircle, Loader2 } from 'lucide-react'
import logo from '../assets/logo.png'

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      onLogin(data.user)
    }
  }

  return (
    <div className="admin-login-page section-padding" style={{minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div className="auth-card" style={{width: '100%', maxWidth: '400px', background: 'var(--bg-glass)', backdropFilter: 'var(--glass)', padding: '40px', borderRadius: '16px', border: '1px solid var(--border)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)'}}>
        <div style={{textAlign: 'center', marginBottom: '30px'}}>
          <img src={logo} alt="Desi Hut MJM Logo" style={{width: '80px', marginBottom: '15px'}} />
          <div style={{width: '60px', height: '60px', background: 'var(--primary-glow)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px', color: 'var(--primary)'}}>
            <Lock size={30} />
          </div>
          <h2 style={{fontFamily: 'var(--font-heading)'}}>Admin Access</h2>
          <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>Sign in to manage your restaurant</p>
        </div>

        {error && (
          <div style={{background: '#ff444422', border: '1px solid #ff4444', color: '#ff4444', padding: '10px', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem'}}>
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group" style={{marginBottom: '20px'}}>
            <label style={{display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.85rem'}}>Official Email</label>
            <div style={{position: 'relative'}}>
              <Mail size={18} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)'}} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@desihut.com" 
                style={{width: '100%', padding: '12px 12px 12px 40px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '10px', color: 'white'}}
                required 
              />
            </div>
          </div>

          <div className="form-group" style={{marginBottom: '30px'}}>
            <label style={{display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.85rem'}}>Password</label>
            <div style={{position: 'relative'}}>
              <Lock size={18} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)'}} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                style={{width: '100%', padding: '12px 12px 12px 40px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '10px', color: 'white'}}
                required 
              />
            </div>
          </div>

          <button className="btn-primary" disabled={loading} style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Sign In to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
