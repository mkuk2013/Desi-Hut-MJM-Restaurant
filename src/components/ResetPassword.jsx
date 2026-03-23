import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Lock, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const navigate = useNavigate()

  const handleUpdate = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      return setMessage({ type: 'error', text: 'Passwords do not match.' })
    }

    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      const { error } = await supabase.auth.updateUser({ password: password })

      if (error) throw error

      setMessage({ type: 'success', text: 'Password has been reset successfully! Redirecting to login...' })
      setTimeout(() => navigate('/login'), 3000)
    } catch (error) {
      console.error('Update error:', error)
      setMessage({ type: 'error', text: 'Error: ' + error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page section-padding fade-in" style={{marginTop: '80px', minHeight: '80vh'}}>
      <div className="container" style={{display: 'flex', justifyContent: 'center'}}>
        <div className="auth-card" style={{width: '100%', maxWidth: '450px', background: 'var(--bg-glass)', backdropFilter: 'var(--glass)', padding: '40px', borderRadius: '20px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)'}}>
          <div style={{textAlign: 'center', marginBottom: '30px'}}>
            <h2 style={{fontSize: '1.8rem'}}>Set New <span className="text-primary">Password</span></h2>
            <p style={{color: 'var(--text-muted)'}}>Please enter your new password below.</p>
          </div>

          {message.text && (
            <div style={{
              background: message.type === 'success' ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 68, 68, 0.1)',
              color: message.type === 'success' ? '#00ff88' : '#ff4444',
              padding: '15px',
              borderRadius: '12px',
              marginBottom: '25px',
              border: `1px solid ${message.type === 'success' ? '#00ff88' : '#ff4444'}`,
              display: 'flex',
              gap: '10px'
            }}>
              {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
              <p style={{fontSize: '0.9rem', margin: 0}}>{message.text}</p>
            </div>
          )}

          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-muted)'}}><Lock size={16} /> New Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '10px', color: 'white'}}
              />
            </div>
            <div className="form-group" style={{marginTop: '20px'}}>
              <label style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-muted)'}}><Lock size={16} /> Confirm Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                required 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '10px', color: 'white'}}
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary" style={{width: '100%', marginTop: '30px', padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
              {loading ? <Loader2 className="animate-spin" size={20} /> : null}
              {loading ? 'Updating Password...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
