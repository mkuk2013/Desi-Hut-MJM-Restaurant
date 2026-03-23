import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Package, Clock, Truck, CheckCircle, XCircle, ArrowRight, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'

const MyOrders = ({ userEmail }) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('All') // 'All', 'Active', 'Completed'

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <Package size={20} style={{color: '#ffc107'}} />
      case 'Cooking': return <Clock size={20} style={{color: '#ff8c00'}} />
      case 'Out for Delivery': return <Truck size={20} style={{color: '#00ccff'}} />
      case 'Delivered': return <CheckCircle size={20} style={{color: '#00ff88'}} />
      case 'Cancelled': return <XCircle size={20} style={{color: '#ff4444'}} />
      default: return <Package size={20} />
    }
  }

  useEffect(() => {
    if (userEmail) {
      fetchUserOrders()
    }
  }, [userEmail])

  const fetchUserOrders = async () => {
    setLoading(true)
    console.log('Fetching orders for email:', userEmail);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('email', userEmail)
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Supabase Error:', error)
        setError('Database error: ' + error.message)
      } else {
        console.log('Orders found:', data);
        setOrders(data)
      }
    } catch (err) {
      console.error('Fetch Exception:', err)
      setError('Network error: ' + err.message)
    }
    setLoading(false)
  }

  const filteredOrders = orders.filter(order => {
    if (filter === 'All') return true
    if (filter === 'Completed') return order.status === 'Delivered'
    if (filter === 'Active') return ['Pending', 'Cooking', 'Out for Delivery'].includes(order.status)
    return true
  })

  return (
    <div className="my-orders-section section-padding fade-in" style={{marginTop: '80px', minHeight: '70vh'}}>
      <div className="container">
        <div className="section-header" style={{marginBottom: '30px'}}>
          <h2 style={{fontSize: '2.5rem'}}>My <span className="text-primary">Order History</span></h2>
          <p>View your previous and current orders.</p>
        </div>

        {error && (
          <div style={{background: 'rgba(255, 68, 68, 0.1)', color: '#ff4444', padding: '15px', borderRadius: '10px', marginBottom: '20px', border: '1px solid #ff4444'}}>
            {error}
          </div>
        )}

        <div className="order-filters" style={{display: 'flex', gap: '10px', marginBottom: '30px'}}>
          {['All', 'Active', 'Completed'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '8px 20px', 
                borderRadius: '30px', 
                background: filter === f ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                color: filter === f ? 'white' : 'var(--text-muted)',
                border: '1px solid ' + (filter === f ? 'var(--primary)' : 'var(--border)'),
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{textAlign: 'center', padding: '50px'}}>
            <p>Loading your orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div style={{textAlign: 'center', padding: '60px', background: 'var(--bg-card)', borderRadius: '20px', border: '1px dashed var(--border)'}}>
            <ShoppingBag size={64} style={{color: 'var(--border)', marginBottom: '20px'}} />
            <h3>No {filter !== 'All' ? filter.toLowerCase() : ''} orders found</h3>
            <p style={{color: 'var(--text-muted)'}}>It seems you don't have any {filter !== 'All' ? filter.toLowerCase() : ''} orders matching this filter.</p>
          </div>
        ) : (
          <div style={{display: 'grid', gap: '20px'}}>
            {filteredOrders.map(order => (
              <div key={order.id} className="order-history-card" style={{background: 'var(--bg-card)', padding: '25px', borderRadius: '16px', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px'}}>
                <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
                  <div style={{width: '60px', height: '60px', background: 'rgba(255,140,0,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)'}}>
                    {getStatusIcon(order.status)}
                  </div>
                  <div>
                    <h4 style={{marginBottom: '5px'}}>Order #{order.tracking_id || order.id.slice(0, 8)}</h4>
                    <p style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>
                      {new Date(order.created_at).toLocaleDateString()} at {new Date(order.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                    <p style={{marginTop: '5px', fontWeight: 'bold', color: 'var(--primary)'}}>Rs. {order.total_amount.toLocaleString()}</p>
                  </div>
                </div>

                <div style={{display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap'}}>
                  <div style={{background: 'rgba(255,255,255,0.05)', padding: '8px 15px', borderRadius: '30px', border: '1px solid var(--border)', fontSize: '0.85rem'}}>
                    Status: <span style={{fontWeight: 'bold', marginLeft: '5px'}}>{order.status}</span>
                  </div>
                  <Link to={`/track-order?tid=${order.tracking_id}`} className="btn-outline" style={{padding: '10px 20px', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem'}}>
                    Manage Tracking <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyOrders
