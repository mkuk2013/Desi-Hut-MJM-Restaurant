import React, { useState, useEffect } from 'react'
import { db, tsToDate } from '../lib/firebase'
import { collection, getDocs, doc, updateDoc, onSnapshot } from 'firebase/firestore'
import { Package, Clock, CheckCircle, Truck, XCircle, Eye } from 'lucide-react'

// Safely normalize order items whether Supabase returns a JSON string or an already-parsed array
const parseOrderItems = (raw) => {
  try {
    const items = typeof raw === 'string' ? JSON.parse(raw) : raw
    return Array.isArray(items) ? items : []
  } catch {
    return []
  }
}

const OrderManager = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    // Real-time subscription to orders
    const unsub = onSnapshot(collection(db, 'orders'),
      (snap) => {
        const items = snap.docs.map(d => ({ id: d.id, ...d.data() }))
        items.sort((a, b) => tsToDate(b.createdAt) - tsToDate(a.createdAt))
        setOrders(items)
        setLoading(false)
      },
      (err) => {
        console.error('Error fetching orders:', err)
        setLoading(false)
      }
    )
    return () => unsub()
  }, [])

  const updateStatus = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, 'orders', id), { status: newStatus })
    } catch (err) {
      alert('Error updating status: ' + err.message)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return '#ffcc00'
      case 'Cooking': return '#ff8c00'
      case 'Out for Delivery': return '#00ccff'
      case 'Delivered': return '#00ff88'
      case 'Cancelled': return '#ff4444'
      default: return 'var(--text-muted)'
    }
  }

  return (
    <div className="order-manager">
      <div className="manager-header" style={{marginBottom: '30px'}}>
        <h3>Active Orders</h3>
      </div>

      <div className="orders-grid" style={{display: 'grid', gap: '20px'}}>
        {orders.map(order => (
          <div key={order.id} className="order-card" style={{background: 'var(--bg-card)', padding: '25px', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '15px'}}>
            <div className="order-head" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div>
                <span style={{color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 'bold', display: 'block', marginBottom: '2px'}}>{order.tracking_id || 'No ID'}</span>
                <span style={{color: 'var(--text-muted)', fontSize: '0.75rem'}}>UUID: #{String(order.id).slice(0, 8)}</span>
                <h4 style={{marginTop: '5px'}}>{order.customer_name}</h4>
                <p style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>{order.email}</p>
              </div>
              <div className="status-badge" style={{background: `${getStatusColor(order.status)}22`, color: getStatusColor(order.status), padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.85rem', border: `1px solid ${getStatusColor(order.status)}`}}>
                {order.status}
              </div>
            </div>

            <div className="order-details" style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px'}}>
              <div className="items-list">
                {parseOrderItems(order.items).map((item, idx) => (
                  <div key={idx} style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '5px', color: 'var(--text-muted)'}}>
                    <span>{item.name} x {item.quantity}</span>
                    <span>Rs. {item.price * item.quantity}</span>
                  </div>
                ))}
                <div style={{marginTop: '10px', paddingTop: '10px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold'}}>
                  <span>Total</span>
                  <span style={{color: 'var(--primary)'}}>Rs. {order.total_amount}</span>
                </div>
              </div>
              <div className="customer-info" style={{fontSize: '0.85rem', color: 'var(--text-muted)', borderLeft: '1px solid var(--border)', paddingLeft: '20px'}}>
                <p><strong>Address:</strong> {order.address}</p>
                <p><strong>Phone:</strong> {order.phone}</p>
                <p><strong>Type:</strong> {order.payment_method}</p>
              </div>
            </div>

            <div className="order-actions" style={{display: 'flex', gap: '10px', marginTop: '10px', borderTop: '1px solid var(--border)', paddingTop: '15px'}}>
              <button className="btn-add-small" onClick={() => updateStatus(order.id, 'Cooking')} title="Start Cooking"><Clock size={16} /> Cooking</button>
              <button className="btn-add-small" onClick={() => updateStatus(order.id, 'Out for Delivery')} title="Dispatch"><Truck size={16} /> Dispatch</button>
              <button className="btn-add-small" onClick={() => updateStatus(order.id, 'Delivered')} style={{background: '#00ff8822', color: '#00ff88'}} title="Mark Delivered"><CheckCircle size={16} /> Delivered</button>
              <button className="btn-add-small" onClick={() => updateStatus(order.id, 'Cancelled')} style={{background: '#ff444422', color: '#ff4444'}} title="Cancel"><XCircle size={16} /> Cancel</button>
            </div>
          </div>
        ))}

        {loading && <p style={{textAlign: 'center', padding: '20px'}}>Loading orders...</p>}
        {!loading && orders.length === 0 && (
          <div style={{textAlign: 'center', padding: '50px', background: 'var(--bg-card)', borderRadius: '12px', border: '1px dashed var(--border)'}}>
            <Package size={48} style={{color: 'var(--border)', marginBottom: '15px'}} />
            <p style={{color: 'var(--text-muted)'}}>No orders received yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderManager
