import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { User, Phone, MapPin, Save, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

const ProfilePage = ({ user, onUpdate }) => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [updatingPassword, setUpdatingPassword] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [passData, setPassData] = useState({ new_password: '', confirm_password: '' })
  const [profile, setProfile] = useState({
    full_name: '',
    phone: '',
    address: ''
  })

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle()

      if (error) throw error
      
      if (data) {
        setProfile({
          full_name: data.full_name || '',
          phone: data.phone || '',
          address: data.address || ''
        })
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      setMessage({ type: 'error', text: 'Failed to load profile details.' })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage({ type: '', text: '' })

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: user.email,
          full_name: profile.full_name,
          phone: profile.phone,
          address: profile.address,
          updated_at: new Error().toISOString() // Using new date
        })

      if (error) throw error
      
      setMessage({ type: 'success', text: 'Profile updated successfully!' })
      if (onUpdate) onUpdate({ ...user, name: profile.full_name })
    } catch (error) {
      console.error('Error updating profile:', error)
      setMessage({ type: 'error', text: 'Error updating profile: ' + error.message })
    } finally {
      setSaving(false)
    }
  }

  const handlePasswordUpdate = async (e) => {
    e.preventDefault()
    if (passData.new_password !== passData.confirm_password) {
      return setMessage({ type: 'error', text: 'Passwords do not match.' })
    }
    if (passData.new_password.length < 6) {
      return setMessage({ type: 'error', text: 'Password must be at least 6 characters.' })
    }

    setUpdatingPassword(true)
    setMessage({ type: '', text: '' })

    try {
      const { error } = await supabase.auth.updateUser({ password: passData.new_password })
      if (error) throw error
      setMessage({ type: 'success', text: 'Password updated successfully!' })
      setPassData({ new_password: '', confirm_password: '' })
    } catch (error) {
      console.error('Error updating password:', error)
      setMessage({ type: 'error', text: 'Error updating password: ' + error.message })
    } finally {
      setUpdatingPassword(false)
    }
  }

  if (loading) {
    return (
      <div style={{minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Loader2 className="animate-spin" size={40} color="var(--primary)" />
      </div>
    )
  }

  return (
    <div className="profile-page section-padding fade-in" style={{marginTop: '80px'}}>
      <div className="container" style={{maxWidth: '800px'}}>
        <div className="section-header" style={{textAlign: 'center', marginBottom: '40px'}}>
          <h2 style={{fontSize: '2.5rem'}}>My <span className="text-primary">Profile</span></h2>
          <p>Update your personal information for faster checkouts.</p>
        </div>

        <div style={{background: 'var(--bg-card)', padding: '40px', borderRadius: '20px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid var(--border)'}}>
            <div style={{width: '70px', height: '70px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'}}>
              <User size={35} />
            </div>
            <div>
              <h3 style={{fontSize: '1.2rem'}}>{user.email}</h3>
              <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>Customer Account</p>
            </div>
          </div>

          {message.text && (
            <div style={{
              background: message.type === 'success' ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 68, 68, 0.1)',
              color: message.type === 'success' ? '#00ff88' : '#ff4444',
              padding: '15px',
              borderRadius: '10px',
              marginBottom: '25px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              border: `1px solid ${message.type === 'success' ? '#00ff88' : '#ff4444'}`
            }}>
              {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
              {message.text}
            </div>
          )}

          <form onSubmit={handleUpdate}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
              <div className="form-group">
                <label style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-muted)'}}><User size={16} /> Full Name</label>
                <input 
                  type="text" 
                  value={profile.full_name}
                  onChange={e => setProfile({...profile, full_name: e.target.value})}
                  placeholder="Your Name"
                  style={{width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '10px', color: 'white'}}
                />
              </div>
              <div className="form-group">
                <label style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-muted)'}}><Phone size={16} /> Phone Number</label>
                <input 
                  type="tel" 
                  value={profile.phone}
                  onChange={e => setProfile({...profile, phone: e.target.value})}
                  placeholder="03XXXXXXXXX"
                  style={{width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '10px', color: 'white'}}
                />
              </div>
            </div>

            <div className="form-group" style={{marginTop: '20px'}}>
              <label style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-muted)'}}><MapPin size={16} /> Delivery Address</label>
              <textarea 
                value={profile.address}
                onChange={e => setProfile({...profile, address: e.target.value})}
                placeholder="Enter your complete address"
                style={{width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '10px', color: 'white', minHeight: '100px'}}
              ></textarea>
            </div>

            <button type="submit" disabled={saving} className="btn-primary" style={{width: '100%', marginTop: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '15px'}}>
              {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
              {saving ? 'Saving Changes...' : 'Save Profile'}
            </button>
          </form>

          <div style={{marginTop: '50px', paddingTop: '30px', borderTop: '1px solid var(--border)'}}>
            <h4 style={{marginBottom: '20px', fontSize: '1.1rem', color: 'var(--primary)'}}>Change Password</h4>
            <form onSubmit={handlePasswordUpdate}>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
                <div className="form-group">
                  <label style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>New Password</label>
                  <input 
                    type="password" 
                    value={passData.new_password} 
                    onChange={e => setPassData({...passData, new_password: e.target.value})} 
                    placeholder="••••••••" 
                    required 
                    style={{width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '10px', color: 'white', marginTop: '5px'}}
                  />
                </div>
                <div className="form-group">
                  <label style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>Confirm Password</label>
                  <input 
                    type="password" 
                    value={passData.confirm_password} 
                    onChange={e => setPassData({...passData, confirm_password: e.target.value})} 
                    placeholder="••••••••" 
                    required 
                    style={{width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '10px', color: 'white', marginTop: '5px'}}
                  />
                </div>
              </div>
              <button type="submit" disabled={updatingPassword} className="btn-outline" style={{marginTop: '20px', padding: '12px 25px'}}>
                {updatingPassword ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
