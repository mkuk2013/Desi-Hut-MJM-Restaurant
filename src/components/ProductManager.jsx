import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Plus, Edit2, Trash2, Save, X, Image as ImageIcon } from 'lucide-react'

const ProductManager = ({ onRefresh }) => {
  const [products, setProducts] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({ name: '', price: '', category: '', description: '', image: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('products').select('*').order('id', { ascending: true })
    if (error) console.error('Error fetching products:', error)
    else setProducts(data)
    setLoading(false)
  }

  const handleEdit = (product) => {
    setEditingId(product.id)
    setFormData({ ...product })
  }

  const handleSave = async (id) => {
    const { id: _, created_at, ...updateData } = formData
    const { error } = id 
      ? await supabase.from('products').update(updateData).eq('id', id)
      : await supabase.from('products').insert([updateData])
    
    if (error) alert('Error saving product: ' + error.message)
    else {
      setEditingId(null)
      setFormData({ name: '', price: '', category: '', description: '', image: '' })
      fetchProducts()
      if (onRefresh) onRefresh()
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const { error } = await supabase.from('products').delete().eq('id', id)
      if (error) alert('Error deleting product: ' + error.message)
      else {
        fetchProducts()
        if (onRefresh) onRefresh()
      }
    }
  }

  return (
    <div className="product-manager">
      <div className="manager-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
        <h3>Menu Items Management</h3>
        <div style={{display: 'flex', gap: '10px'}}>
          <button className="btn-outline" onClick={async () => {
            if(window.confirm('This will CLEAR existing products and seed the database with initial menu data. Proceed?')) {
              try {
                setLoading(true)
                // 1. Clear existing data
                const { error: deleteError } = await supabase.from('products').delete().gte('id', 0)
                if (deleteError) throw deleteError

                // 2. Import and sanitize initial data
                const { menuData: initialData } = await import('../lib/menuData')
                const cleanData = initialData.map(({ id, ...rest }) => {
                  // Sanitize strings
                  const sanitized = {}
                  Object.keys(rest).forEach(key => {
                    if (typeof rest[key] === 'string') {
                      sanitized[key] = rest[key].trim().replace(/[\n\r]/g, ' ')
                    } else {
                      sanitized[key] = rest[key]
                    }
                  })
                  return sanitized
                })

                // 3. Insert new data
                const { error: insertError } = await supabase.from('products').insert(cleanData)
                if (insertError) throw insertError

                alert('Database cleared and seeded successfully!')
                fetchProducts()
                if (onRefresh) onRefresh()
              } catch (err) {
                alert('Seeding failed: ' + err.message)
                console.error(err)
              } finally {
                setLoading(false)
              }
            }
          }}>Seed DB</button>
          <button className="btn-primary" onClick={() => setEditingId('new')}>
            <Plus size={18} /> Add New Item
          </button>
        </div>
      </div>

      {editingId && (
        <div className="edit-modal" style={{background: 'var(--bg-glass)', padding: '30px', borderRadius: '12px', border: '1px solid var(--primary)', marginBottom: '30px', backdropFilter: 'var(--glass)'}}>
          <h4>{editingId === 'new' ? 'Add New Product' : 'Edit Product'}</h4>
          <div className="form-grid" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px'}}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Item Name" />
            </div>
            <div className="form-group">
              <label>Price (Rs.)</label>
              <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})} placeholder="1200" />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input type="text" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} placeholder="Chicken Specialties" />
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input type="text" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} placeholder="Unsplash URL" />
            </div>
            <div className="form-group" style={{gridColumn: 'span 2'}}>
              <label>Description</label>
              <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Describe the dish..." style={{width: '100%', minHeight: '80px', background: 'rgba(0,0,0,0.2)', color: 'white', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px'}} />
            </div>
          </div>
          <div className="modal-btns" style={{marginTop: '20px', display: 'flex', gap: '10px'}}>
            <button className="btn-primary" onClick={() => handleSave(editingId === 'new' ? null : editingId)}>
              <Save size={18} /> Save Changes
            </button>
            <button className="btn-outline" onClick={() => setEditingId(null)}>
              <X size={18} /> Cancel
            </button>
          </div>
        </div>
      )}

      <div className="products-table-wrapper" style={{background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)', overflow: 'hidden'}}>
        <table style={{width: '100%', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{background: 'rgba(255,140,0,0.1)', textAlign: 'left'}}>
              <th style={{padding: '15px'}}>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} style={{borderBottom: '1px solid var(--border)'}}>
                <td style={{padding: '15px'}}>#{p.id}</td>
                <td><img src={p.image} alt="" style={{width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover'}} /></td>
                <td><span style={{fontWeight: 'bold'}}>{p.name}</span></td>
                <td><span className="cat-label" style={{fontSize: '0.8rem'}}>{p.category}</span></td>
                <td>Rs. {p.price}</td>
                <td>
                  <div style={{display: 'flex', gap: '10px'}}>
                    <button onClick={() => handleEdit(p)} style={{color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer'}} title="Edit"><Edit2 size={18} /></button>
                    <button onClick={() => handleDelete(p.id)} style={{color: '#ff4444', background: 'none', border: 'none', cursor: 'pointer'}} title="Delete"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <p style={{textAlign: 'center', padding: '20px'}}>Loading products...</p>}
        {!loading && products.length === 0 && <p style={{textAlign: 'center', padding: '30px', color: 'var(--text-muted)'}}>No products found in database.</p>}
      </div>
    </div>
  )
}

export default ProductManager
