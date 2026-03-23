import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Search, Package, Clock, Truck, CheckCircle, XCircle, ArrowRight, AlertCircle, ChevronRight } from 'lucide-react'
import { useLocation } from 'react-router-dom'

const OrderTracking = () => {
  const location = useLocation()
  const [trackingId, setTrackingId] = useState('')
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const tid = params.get('tid')
    if (tid) {
      setTrackingId(tid)
      fetchOrderByTrackingId(tid)
    }
  }, [location])

  const fetchOrderByTrackingId = async (id) => {
    setLoading(true)
    setError('')
    setOrder(null)

    const { data, error: supabaseError } = await supabase
      .from('orders')
      .select('*')
      .eq('tracking_id', id.trim().toUpperCase())
      .maybeSingle()

    setLoading(false)
    if (supabaseError) {
      setError('An error occurred while fetching the order. Please try again later.')
      console.error(supabaseError)
    } else if (!data) {
      setError('Order not found. Please check your tracking ID and try again.')
    } else {
      setOrder(data)
    }
  }

  const handleTrack = async (e) => {
    e.preventDefault()
    if (!trackingId.trim()) return
    fetchOrderByTrackingId(trackingId)
  }

  const getStatusStep = (status) => {
    switch (status) {
      case 'Pending': return 1
      case 'Cooking': return 2
      case 'Out for Delivery': return 3
      case 'Delivered': return 4
      case 'Cancelled': return -1
      default: return 0
    }
  }

  const statusStep = order ? getStatusStep(order.status) : 0

  const Step = ({ index, label, icon: Icon, active, completed }) => (
    <div className={`track-step ${active ? 'active' : ''} ${completed ? 'completed' : ''}`} style={{flex: 1, textAlign: 'center', position: 'relative'}}>
      <div style={{
        width: '50px', 
        height: '50px', 
        borderRadius: '50%', 
        background: completed ? 'var(--primary)' : active ? 'rgba(255,140,0,0.2)' : 'var(--bg-glass)', 
        border: active ? '2px solid var(--primary)' : '1px solid var(--border)',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        margin: '0 auto 10px',
        color: completed ? 'white' : active ? 'var(--primary)' : 'var(--text-muted)',
        transition: 'all 0.3s ease',
        zIndex: 2,
        position: 'relative'
      }}>
        <Icon size={24} />
      </div>
      <p style={{fontSize: '0.85rem', fontWeight: active || completed ? 'bold' : 'normal', color: active || completed ? 'var(--primary)' : 'var(--text-muted)'}}>{label}</p>
      {index < 4 && (
        <div style={{
          position: 'absolute', 
          top: '25px', 
          left: 'calc(50% + 25px)', 
          width: 'calc(100% - 50px)', 
          height: '2px', 
          background: completed ? 'var(--primary)' : 'var(--border)',
          zIndex: 1
        }}></div>
      )}
    </div>
  )

  return (
    <div className="track-order-page section-padding fade-in" style={{marginTop: '80px', minHeight: '80vh'}}>
      <div className="container">
        <div className="section-header" style={{textAlign: 'center', marginBottom: '50px'}}>
          <h2 style={{fontSize: '3rem'}}>Track Your <span className="text-primary">Order</span></h2>
          <p>Enter your tracking ID to see exactly where your delicious meal is.</p>
        </div>

        <div style={{maxWidth: '600px', margin: '0 auto'}}>
          <form onSubmit={handleTrack} style={{display: 'flex', gap: '10px', marginBottom: '40px'}}>
            <div style={{flex: 1, position: 'relative'}}>
              <input 
                type="text" 
                placeholder="DH-XXXXXX" 
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                style={{width: '100%', padding: '15px 15px 15px 45px', borderRadius: '12px', background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'white', fontSize: '1.1rem', letterSpacing: '2px'}}
              />
              <Search size={20} style={{position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)'}} />
            </div>
            <button type="submit" className="btn-primary" disabled={loading} style={{padding: '0 30px'}}>
              {loading ? 'Searching...' : 'Track'}
            </button>
          </form>

          {error && (
            <div style={{background: 'rgba(255, 68, 68, 0.1)', color: '#ff4444', padding: '15px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px', border: '1px solid #ff4444'}}>
              <AlertCircle size={20} />
              {error}
            </div>
          )}

          {order && (
            <div className="order-status-card fade-in" style={{background: 'var(--bg-card)', padding: '40px', borderRadius: '20px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid var(--border)', paddingBottom: '20px'}}>
                <div>
                  <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>Tracking ID: <span style={{color: 'var(--primary)', fontWeight: 'bold'}}>{order.tracking_id}</span></p>
                  <h3 style={{marginTop: '5px'}}>{order.status}</h3>
                </div>
                <div style={{textAlign: 'right'}}>
                  <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>Order Placed</p>
                  <p style={{fontWeight: '500'}}>{new Date(order.created_at).toLocaleDateString()} {new Date(order.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                </div>
              </div>

              {order.status === 'Cancelled' ? (
                <div style={{textAlign: 'center', padding: '20px', background: 'rgba(255,68,68,0.1)', borderRadius: '12px', color: '#ff4444', border: '1px solid #ff4444'}}>
                  <XCircle size={48} style={{margin: '0 auto 15px'}} />
                  <h4>This order has been cancelled</h4>
                  <p>Please contact support if you have any questions.</p>
                </div>
              ) : (
                <div style={{display: 'flex', justifyContent: 'space-between', position: 'relative', marginTop: '20px'}}>
                  <Step index={1} label="Placed" icon={Package} active={statusStep === 1} completed={statusStep > 1} />
                  <Step index={2} label="Cooking" icon={Clock} active={statusStep === 2} completed={statusStep > 2} />
                  <Step index={3} label="On Way" icon={Truck} active={statusStep === 3} completed={statusStep > 3} />
                  <Step index={4} label="Delivered" icon={CheckCircle} active={statusStep === 4} completed={order.status === 'Delivered'} />
                </div>
              )}

              <div style={{marginTop: '50px', background: 'var(--bg-glass)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border)'}}>
                <h4 style={{marginBottom: '15px', color: 'var(--primary)', fontSize: '1rem'}}>Order Summary</h4>
                {(() => {
                  try {
                    const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
                    return items.map((item, idx) => (
                      <div key={idx} style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.9rem'}}>
                        <span style={{color: 'var(--text-muted)'}}>{item.name} x {item.quantity}</span>
                        <span style={{fontWeight: '500'}}>Rs. {(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ));
                  } catch (e) {
                    return <p style={{color: 'var(--text-muted)'}}>Unable to load items summary.</p>;
                  }
                })()}
                <div style={{marginTop: '15px', paddingTop: '15px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold'}}>
                  <span>Total Amount Paid</span>
                  <span style={{color: 'var(--primary)'}}>Rs. {order.total_amount.toLocaleString()}</span>
                </div>
              </div>
              
              <div style={{marginTop: '30px', textAlign: 'center'}}>
                <a href={`https://wa.me/923073431191?text=Hi%2C%20I'm%20inquiring%20about%20my%20order%20${order.tracking_id}`} target="_blank" rel="noopener noreferrer" style={{color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.9rem'}}>
                   Need help? Contact support on WhatsApp <ChevronRight size={16} />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderTracking
