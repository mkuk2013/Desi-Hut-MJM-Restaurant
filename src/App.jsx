import React, { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, LogOut, Menu as MenuIcon, X, Phone, MapPin, Instagram, Facebook, Search, Filter, Plus, Minus, Trash2, Box, Utensils, CheckCircle } from 'lucide-react'
import { menuData } from './lib/menuData'
import { supabase } from './lib/supabase'
import logo from './assets/logo.png'
import AdminLogin from './components/AdminLogin'
import ProductManager from './components/ProductManager'
import OrderManager from './components/OrderManager'
import AboutUs from './components/AboutUs'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsOfService from './components/TermsOfService'

const Home = ({ addToCart, products = menuData }) => {
  const featuredItems = products.slice(0, 3)
  
  return (
    <div className="home-page fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <span className="hero-tag">Best BBQ & Handi in Umerkot</span>
            <h1>Savor the Authentic Flavors of <span className="text-primary">Desi Hut</span></h1>
            <p>From sizzling kebabs to aromatic karahis, we bring you the finest Pakistani cuisine crafted with tradition and passion.</p>
            <div className="hero-btns">
              <Link to="/menu" className="btn-primary">Order Now</Link>
              <Link to="/menu" className="btn-outline">View Menu</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-us section-padding">
        <div className="container">
          <div className="section-header">
            <h2>Why Desi Hut?</h2>
            <p>We pride ourselves on quality and tradition.</p>
          </div>
          <div className="features-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginTop: '40px'}}>
            <div className="feature-card" style={{background: 'var(--bg-glass)', padding: '30px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', backdropFilter: 'var(--glass)', textAlign: 'center'}}>
              <div style={{color: 'var(--primary)', marginBottom: '15px'}}><Search size={32} /></div>
              <h3>Fresh Ingredients</h3>
              <p>Hand-picked spices and the freshest meat delivered daily to our kitchen.</p>
            </div>
            <div className="feature-card" style={{background: 'var(--bg-glass)', padding: '30px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', backdropFilter: 'var(--glass)', textAlign: 'center'}}>
              <div style={{color: 'var(--primary)', marginBottom: '15px'}}><Phone size={32} /></div>
              <h3>Fast Delivery</h3>
              <p>Sizzling food delivered right to your doorstep in Umerkot within minutes.</p>
            </div>
            <div className="feature-card" style={{background: 'var(--bg-glass)', padding: '30px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', backdropFilter: 'var(--glass)', textAlign: 'center'}}>
              <div style={{color: 'var(--primary)', marginBottom: '15px'}}><User size={32} /></div>
              <h3>Master Chefs</h3>
              <p>Our chefs have decades of experience in traditional Pakistani BBQ and Handi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section section-padding">
        <div className="container">
          <div className="about-grid" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center'}}>
            <div className="about-img" style={{position: 'relative'}}>
              <img src="https://lh3.googleusercontent.com/gps-cs-s/AHVAwer3nCGFK5LjJehZVNeKUfJwk0b1eIGeheL2bGX6lEZbUytAJJjVF8ipNxHlIiOe5Kq-26csFkjfjR6nUl05X_1mGmiDu0bfs0gZgVauedpdJRoXLj_Yavm3qkqYvY7Eix693Z-d=s1600" alt="Desi Hut Storefront" style={{width: '100%', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)'}} />
              <div style={{position: 'absolute', bottom: '-20px', right: '-20px', background: 'var(--primary)', color: 'white', padding: '20px', borderRadius: '15px', fontWeight: 'bold', fontSize: '1.2rem', textAlign: 'center'}}>
                Established <br/> Premium Taste
              </div>
            </div>
            <div className="about-text">
              <span className="hero-tag">Our Story</span>
              <h2>No Compromise on <span className="text-primary">Quality & Quantity</span></h2>
              <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: '25px'}}>
                At Desi Hut MJM Restaurant, we believe that food is not just about sustenance; it's about tradition, passion, and perfection. Located in the heart of Umerkot, we've become a destination for food lovers seeking the truly authentic taste of Pakistani cuisine.
              </p>
              <div className="features-list" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}><CheckCircle size={20} className="text-primary" /> 100% Fresh Meat</div>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}><CheckCircle size={20} className="text-primary" /> Traditional Handi</div>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}><CheckCircle size={20} className="text-primary" /> Sizzling BBQ</div>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}><CheckCircle size={20} className="text-primary" /> Home Delivery</div>
              </div>
              <Link to="/menu" className="btn-primary" style={{marginTop: '35px', display: 'inline-block'}}>Experience the Taste</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="featured-section section-padding">
        <div className="container">
          <div className="section-header">
            <h2>Our Signature Specialties</h2>
            <p>Hand-picked favorites that our customers love the most.</p>
          </div>
          <div className="featured-grid">
            {featuredItems.map(item => (
              <div key={item.id} className="featured-card">
                <div className="card-img" style={{background: `url(${item.image})`}}></div>
                <div className="card-body">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="card-footer">
                    <span className="price">Rs. {item.price.toLocaleString()}</span>
                    <button onClick={() => addToCart(item)} className="btn-add">Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="view-all-btn" style={{textAlign: 'center', marginTop: '50px'}}>
             <Link to="/menu" className="btn-outline">View Full Menu</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

const MenuPage = ({ addToCart, products = menuData }) => {
  const [activeCategory, setActiveCategory] = useState('All')
  const categories = ['All', ...new Set(products.map(item => item.category))]
  
  const filteredItems = activeCategory === 'All' 
    ? products 
    : products.filter(item => item.category === activeCategory)

  return (
    <div className="menu-page section-padding fade-in" style={{marginTop: '80px'}}>
      <div className="container">
        <div className="section-header">
          <h2>Our Delicious Menu</h2>
          <p>Explore our wide range of traditional and modern dishes.</p>
        </div>

        <div className="category-filter">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="menu-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="menu-card">
              <div className="card-img" style={{background: `url(${item.image})`}}></div>
              <div className="card-info">
                <div className="card-head">
                  <h3>{item.name}</h3>
                  <span className="price-tag">Rs. {item.price.toLocaleString()}</span>
                </div>
                <p>{item.description}</p>
                <div className="card-foot">
                  <span className="cat-label">{item.category}</span>
                  <button onClick={() => addToCart(item)} className="btn-add-small">
                    <Plus size={18} /> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const Navbar = ({ cartCount }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link to="/" className="logo-container">
          <img src={logo} alt="Desi Hut Logo" className="logo-img" style={{height: '65px', borderRadius: '50%'}} />
        </Link>
        <div className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/menu" onClick={() => setIsMobileMenuOpen(false)}>Menu</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
        </div>
        <div className="nav-actions">
          <a href="https://www.facebook.com/p/Desi-Hut-MJM-Restaurant-61554675945365/" target="_blank" rel="noopener noreferrer" className="nav-icon" style={{color: 'var(--primary)'}}><Facebook size={20} /></a>
          <Link to="/login" className="nav-icon"><User size={20} /></Link>
          <Link to="/cart" className="nav-icon cart-trigger">
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>
    </nav>
  )
}

const CartPage = ({ cart, updateQty, removeItem }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="cart-page section-padding fade-in" style={{marginTop: '80px'}}>
      <div className="container">
        <div className="section-header">
          <h2>Your Food Cart</h2>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart" style={{textAlign: 'center', padding: '50px'}}>
            <ShoppingCart size={64} style={{color: 'var(--text-muted)', marginBottom: '20px'}} />
            <p>Your cart is empty. Let's find something delicious!</p>
            <Link to="/menu" className="btn-primary" style={{marginTop: '20px', display: 'inline-block'}}>Browse Menu</Link>
          </div>
        ) : (
          <div className="cart-container">
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-img" style={{background: `url(${item.image})`}}></div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>Rs. {item.price.toLocaleString()}</p>
                  </div>
                  <div className="item-qty">
                    <button onClick={() => updateQty(item.id, -1)}><Minus size={16} /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, 1)}><Plus size={16} /></button>
                  </div>
                  <div className="item-total">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </div>
                  <button onClick={() => removeItem(item.id)} className="remove-btn"><Trash2 size={18} /></button>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>Rs. {total.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee</span>
                <span>Rs. 100</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>Rs. {(total + 100).toLocaleString()}</span>
              </div>
              <Link to="/checkout" className="btn-primary checkout-btn">Proceed to Checkout</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const CheckoutPage = ({ cart, clearCart }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleOrder = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const orderData = {
      customer_name: formData.name,
      phone: formData.phone,
      address: formData.address,
      payment_method: method,
      items: JSON.stringify(cart),
      total_amount: total,
      status: 'Pending'
    }

    const { error } = await supabase.from('orders').insert([orderData])
    
    setIsSubmitting(false)
    if (error) {
      alert('Error placing order: ' + error.message)
    } else {
      setIsOrdered(true)
      setTimeout(() => clearCart(), 2000)
    }
  }

  if (isOrdered) {
    return (
      <div className="checkout-page section-padding fade-in" style={{textAlign: 'center', marginTop: '80px'}}>
        <div className="container">
          <div style={{background: 'var(--bg-glass)', padding: '60px', borderRadius: '16px', border: '1px solid var(--primary)', backdropFilter: 'var(--glass)'}}>
            <div style={{width: '70px', height: '70px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'white'}}>
              <CheckCircle size={35} />
            </div>
            <h2 style={{color: 'var(--primary)', marginBottom: '15px'}}>Order Placed Successfully!</h2>
            <p>Thank you for choosing Desi Hut MJM Restaurant. Your delicious meal is being prepared.</p>
            <Link to="/" className="btn-primary" style={{marginTop: '30px', display: 'inline-block'}}>Back to Home</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page section-padding fade-in" style={{marginTop: '80px'}}>
      <div className="container">
        <div className="section-header">
          <h2 style={{fontSize: '2.5rem'}}>Checkout</h2>
          <p style={{color: 'var(--text-muted)'}}>Provide your delivery details to enjoy the authentic taste of Desi Hut.</p>
        </div>
        <div className="checkout-container" style={{maxWidth: '1000px', margin: '0 auto'}}>
          <form className="checkout-form" onSubmit={handleOrder} style={{background: 'var(--bg-card)', padding: '40px', borderRadius: '16px', border: '1px solid var(--border)'}}>
            <h3 style={{marginBottom: '25px', color: 'var(--primary)'}}>Delivery Details</h3>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Enter your name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" placeholder="03XXXXXXXXX" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Delivery Address</label>
              <textarea placeholder="Your full address in Umerkot" rows="3" required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})}></textarea>
            </div>
            
            <h3 style={{marginTop: '40px', marginBottom: '25px', color: 'var(--primary)'}}>Payment Method</h3>
            <div className="payment-options" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
              <button type="button" className={`payment-btn ${method === 'COD' ? 'active' : ''}`} onClick={() => setMethod('COD')} style={{padding: '20px', borderRadius: '12px', border: method === 'COD' ? '2px solid var(--primary)' : '1px solid var(--border)', background: method === 'COD' ? 'rgba(255,140,0,0.1)' : 'transparent', color: method === 'COD' ? 'var(--primary)' : 'var(--text-muted)'}}>
                <div style={{fontWeight: 'bold', fontSize: '1.1rem'}}>Cash on Delivery</div>
                <div style={{fontSize: '0.8rem'}}>Pay when you receive</div>
              </button>
              <button type="button" className={`payment-btn ${method === 'Online' ? 'active' : ''}`} onClick={() => setMethod('Online')} style={{padding: '20px', borderRadius: '12px', border: method === 'Online' ? '2px solid var(--primary)' : '1px solid var(--border)', background: method === 'Online' ? 'rgba(255,140,0,0.1)' : 'transparent', color: method === 'Online' ? 'var(--primary)' : 'var(--text-muted)'}}>
                <div style={{fontWeight: 'bold', fontSize: '1.1rem'}}>Online Payment</div>
                <div style={{fontSize: '0.8rem'}}>Credit/Debit Card</div>
              </button>
            </div>
            
            <button type="submit" className="btn-primary" style={{marginTop: '40px', width: '100%', padding: '18px', fontSize: '1.1rem'}} disabled={cart.length === 0 || isSubmitting}>
              {isSubmitting ? 'Processing Order...' : `Confirm Order (Rs. ${total.toLocaleString()})`}
            </button>
          </form>

          <div className="order-summary">
            <h3>Order Summary</h3>
            {cart.map(item => (
              <div key={item.id} className="summary-row">
                <span>{item.name} x {item.quantity}</span>
                <span>Rs. {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="summary-row total">
              <span>Total Amount</span>
              <span>Rs. {total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ContactPage = () => {
  return (
    <div className="contact-page section-padding fade-in" style={{marginTop: '80px'}}>
      <div className="container">
        <div className="section-header">
          <h2 style={{fontSize: '3rem'}}>Get In <span className="text-primary">Touch</span></h2>
          <p>Have a question or want to book a table? We're here to help.</p>
        </div>
        
        <div className="contact-grid" style={{display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '60px', marginTop: '50px'}}>
          <div className="contact-info-cards" style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            <div className="contact-card" style={{background: 'var(--bg-card)', padding: '30px', borderRadius: '16px', border: '1px solid var(--border)'}}>
              <div style={{color: 'var(--primary)', marginBottom: '15px'}}><MapPin size={32} /></div>
              <h4 style={{marginBottom: '10px'}}>Our Location</h4>
              <p style={{color: 'var(--text-muted)'}}>Near Sooraj Park Chowk, Burhan Guest House, Vehro Bypass, Umerkot, Sindh</p>
            </div>
            <div className="contact-card" style={{background: 'var(--bg-card)', padding: '30px', borderRadius: '16px', border: '1px solid var(--border)'}}>
              <div style={{color: 'var(--primary)', marginBottom: '15px'}}><Phone size={32} /></div>
              <h4 style={{marginBottom: '10px'}}>Call Us</h4>
              <p style={{color: 'var(--text-muted)'}}>0307-3431191<br/>0311-6944779<br/>0316-8560600</p>
            </div>
            <div className="contact-card" style={{background: 'var(--bg-card)', padding: '30px', borderRadius: '16px', border: '1px solid var(--border)'}}>
              <div style={{color: 'var(--primary)', marginBottom: '15px'}}><User size={32} /></div>
              <h4 style={{marginBottom: '10px'}}>Email Us</h4>
              <p style={{color: 'var(--text-muted)'}}>desihut.mjm@gmail.com</p>
            </div>
          </div>

          <div className="contact-form-container" style={{background: 'var(--bg-card)', padding: '40px', borderRadius: '20px', border: '1px solid var(--border)', boxShadow: '0 20px 40px rgba(0,0,0,0.2)'}}>
            <h3>Send us a Message</h3>
            <form style={{marginTop: '25px'}}>
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" placeholder="John Doe" style={{width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '10px', color: 'white'}} />
              </div>
              <div className="form-group" style={{marginTop: '20px'}}>
                <label>Email Address</label>
                <input type="email" placeholder="john@example.com" style={{width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '10px', color: 'white'}} />
              </div>
              <div className="form-group" style={{marginTop: '20px'}}>
                <label>Message</label>
                <textarea placeholder="How can we help you?" style={{width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '10px', color: 'white', minHeight: '150px'}}></textarea>
              </div>
              <button disabled className="btn-primary" style={{width: '100%', marginTop: '30px', padding: '15px'}}>Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  return (
    <div className="auth-page section-padding fade-in">
      <div className="container" style={{display: 'flex', justifyContent: 'center'}}>
        <div className="auth-card">
          <h2>{isLogin ? 'Login to Desi Hut' : 'Join Desi Hut'}</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Desi Foodie" />
              </div>
            )}
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="email@example.com" required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="••••••••" required />
            </div>
            <button className="btn-primary" style={{width: '100%', marginTop: '10px'}}>{isLogin ? 'Login' : 'Register'}</button>
          </form>
          <div className="auth-footer">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button onClick={() => setIsLogin(!isLogin)} style={{background: 'none', color: 'var(--primary)', marginLeft: '10px', fontWeight: 'bold'}}>
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const AdminDashboard = ({ user, onLogout, onRefresh }) => {
  const [activeTab, setActiveTab] = useState('orders')
  
  return (
    <div className="admin-dashboard section-padding" style={{marginTop: '60px'}}>
      <div className="container">
        <div className="dashboard-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', background: 'var(--bg-glass)', padding: '20px', borderRadius: '15px', border: '1px solid var(--border)', backdropFilter: 'var(--glass)'}}>
          <div>
            <h2>Admin Panel</h2>
            <p style={{color: 'var(--text-muted)'}}>Manage your restaurant orders and menu</p>
          </div>
          <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
            <span style={{background: 'rgba(255,255,255,0.1)', padding: '5px 15px', borderRadius: '20px', fontSize: '0.9rem'}}>{user.email}</span>
            <button className="btn-outline" onClick={onLogout} style={{padding: '8px 20px', display: 'flex', alignItems: 'center', gap: '8px'}}><LogOut size={18} /> Logout</button>
          </div>
        </div>

        <div className="admin-tabs" style={{display: 'flex', gap: '10px', marginBottom: '30px'}}>
          <button className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')} style={{padding: '12px 30px', borderRadius: '10px', border: '1px solid var(--border)', background: activeTab === 'orders' ? 'var(--primary)' : 'var(--bg-glass)', color: 'white', cursor: 'pointer', fontWeight: 'bold'}}>Orders</button>
          <button className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')} style={{padding: '12px 30px', borderRadius: '10px', border: '1px solid var(--border)', background: activeTab === 'products' ? 'var(--primary)' : 'var(--bg-glass)', color: 'white', cursor: 'pointer', fontWeight: 'bold'}}>Products</button>
        </div>

        <div className="admin-content">
          {activeTab === 'orders' ? <OrderManager /> : <ProductManager onRefresh={onRefresh} />}
        </div>
      </div>
    </div>
  )
}

const Loader = ({ fading }) => (
  <div className={`preloader ${fading ? 'hidden' : ''}`}>
    <div className="loader-content">
      <div className="loader-ring"></div>
      <div className="loader-logo">
        <img src={logo} alt="Desi Hut" />
      </div>
    </div>
  </div>
)

const CookieConsent = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) setShow(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookieConsent', 'true')
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="cookie-banner" style={{position: 'fixed', bottom: '20px', left: '20px', right: '20px', background: 'var(--bg-glass)', backdropFilter: 'var(--glass)', border: '1px solid var(--primary)', borderRadius: '15px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 1000, boxShadow: '0 10px 30px rgba(0,0,0,0.5)', animation: 'slideUp 0.5s ease-out'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
        <div style={{color: 'var(--primary)'}}><Utensils size={24} /></div>
        <p style={{margin: 0, fontSize: '0.9rem'}}>We use cookies to enhance your experience. By continuing to browse, you agree to our <Link to="/privacy" style={{color: 'var(--primary)'}}>Privacy Policy</Link>.</p>
      </div>
      <button onClick={accept} className="btn-primary" style={{padding: '8px 25px', fontSize: '0.9rem'}}>Accept</button>
    </div>
  )
}

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <img src={logo} alt="Desi Hut Logo" className="footer-logo-img" />
            </Link>
            <p>"No Compromise on Quality & Quantity." Savor the authentic taste of Pakistani BBQ, Handi, and Karahi. Excellence in every bite, tradition in every spice.</p>
            <div className="social-links">
              <a href="https://www.facebook.com/p/Desi-Hut-MJM-Restaurant-61554675945365/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="#" className="social-icon" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="tel:03073431191" className="social-icon" aria-label="Phone"><Phone size={20} /></a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Explore</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Our Menu</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/login">Join Us</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Support</h4>
            <ul className="footer-links">
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/">Contact Support</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Visit Us</h4>
            <div className="footer-contact">
              <div className="contact-item">
                <MapPin size={18} className="text-primary" />
                <span>Near Sooraj Park Chowk, Burhan Guest House, Vehro Bypass, Umerkot</span>
              </div>
              <div className="contact-item">
                <Phone size={18} className="text-primary" />
                <span>0307-3431191, 0311-6944779</span>
              </div>
              <div className="contact-item">
                <Phone size={18} className="text-primary" />
                <span>0316-8560600</span>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Desi Hut MJM Restaurant. Created with Passion.</p>
          <div className="footer-legal-links">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function App() {
  const [adminUser, setAdminUser] = useState(null)
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [fading, setFading] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [products, setProducts] = useState(menuData)

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*').order('id', { ascending: true })
    if (!error && data && data.length > 0) {
      setProducts(data)
    }
  }
  
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) setAdminUser(session.user)
    }
    checkUser()

    fetchProducts()
    
    const timer = setTimeout(() => {
      setFading(true)
      setTimeout(() => setLoading(false), 500)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setAdminUser(null)
  }

  const clearCart = () => setCart([])
  
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta)
        return { ...item, quantity: newQty }
      }
      return item
    }))
  }

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }
  
  return (
    <div className="app-wrapper">
      {loading && <Loader fading={fading} />}
      <CookieConsent />
      <Navbar cartCount={cart.reduce((s, i) => s + i.quantity, 0)} />
      <main>
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} products={products} />} />
          <Route path="/menu" element={<MenuPage addToCart={addToCart} products={products} />} />
          <Route path="/cart" element={<CartPage cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/checkout" element={<CheckoutPage cart={cart} clearCart={clearCart} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route 
            path="/admin/*" 
            element={adminUser ? <AdminDashboard user={adminUser} onLogout={handleLogout} onRefresh={fetchProducts} /> : <AdminLogin onLogin={setAdminUser} />} 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
