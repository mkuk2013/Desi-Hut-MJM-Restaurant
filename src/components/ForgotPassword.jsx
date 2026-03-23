import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Mail, ArrowLeft, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const handleReset = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) throw error

      setMessage({ 
        type: 'success', 
        text: 'Password reset link has been sent to your email! Please check your inbox (and spam folder).' 
      })
    } catch (error) {
      console.error('Reset error:', error)
      setMessage({ type: 'error', text: 'Error: ' + error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page section-padding fade-in" style={{marginTop: '80px', minHeight: '80vh'}}>
      <div className="container" style={{display: 'flex', justifyContent: 'center'}}>
        <div className="auth-card" style={{width: '100%', maxWidth: '450px', background: 'var(--bg-glass)', backdropFilter: 'var(--glass)', padding: '40px', borderRadius: '20px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)'}}>
          <Link to="/login" style={{display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '20px', fontSize: '0.9rem'}}>
            <ArrowLeft size={16} /> Back to Login
          </Link>
          
          <div style={{textAlign: 'center', marginBottom: '30px'}}>
            <h2 style={{fontSize: '1.8rem'}}>Forgot <span className="text-primary">Password?</span></h2>
            <p style={{color: 'var(--text-muted)'}}>Enter your email address and we'll send you a link to reset your password.</p>
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

          {message.type !== 'success' && (
            <form onSubmit={handleReset}>
              <div className="form-group">
                <label style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-muted)'}}><Mail size={16} /> Email Address</label>
                <input 
                  type="email" 
                  placeholder="email@example.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '10px', color: 'white'}}
                />
              </div>
              <button type="submit" disabled={loading} className="btn-primary" style={{width: '100%', marginTop: '20px', padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
                {loading ? <Loader2 className="animate-spin" size={20} /> : null}
                {loading ? 'Sending Link...' : 'Send Reset Link'}
              </button>
            </form>
          )}

          {message.type === 'success' && (
            <Link to="/login" className="btn-primary" style={{width: '100%', display: 'block', textAlign: 'center', marginTop: '10px'}}>
              Return to Login
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
