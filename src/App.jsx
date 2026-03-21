import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, LogOut, Menu as MenuIcon, X, Phone, MapPin, Instagram, Facebook, Search, Filter, Plus, Minus, Trash2, Box, Utensils, CheckCircle, MessageCircle, ChevronUp, ChevronDown, AlertCircle } from 'lucide-react'
import { menuData } from './lib/menuData'
import { supabase } from './lib/supabase'
import logo from './assets/logo.png'
import AdminLogin from './components/AdminLogin'
import ProductManager from './components/ProductManager'
import OrderManager from './components/OrderManager'
import AboutUs from './components/AboutUs'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsOfService from './components/TermsOfService'
import MessageManager from './components/MessageManager'

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <button 
      className={`back-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <ChevronUp size={24} />
    </button>
  )
}

const Home = ({ addToCart, products = menuData }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const featuredItems = products.slice(0, 3)
  
  return (
    <div className="home-page fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content" data-aos="fade-up">
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
          <div className="section-header" data-aos="fade-up">
            <h2>Why Desi Hut?</h2>
            <p>We pride ourselves on quality and tradition.</p>
          </div>
          <div className="features-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginTop: '40px'}}>
            <div className="feature-card" style={{background: 'var(--bg-glass)', padding: '30px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', backdropFilter: 'var(--glass)', textAlign: 'center'}} data-aos="fade-up" data-aos-delay="100">
              <div style={{color: 'var(--primary)', marginBottom: '15px'}}><Search size={32} /></div>
              <h3>Fresh Ingredients</h3>
              <p>Hand-picked spices and the freshest meat delivered daily to our kitchen.</p>
            </div>
            <div className="feature-card" style={{background: 'var(--bg-glass)', padding: '30px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', backdropFilter: 'var(--glass)', textAlign: 'center'}} data-aos="fade-up" data-aos-delay="200">
              <div style={{color: 'var(--primary)', marginBottom: '15px'}}><Phone size={32} /></div>
              <h3>Fast Delivery</h3>
              <p>Sizzling food delivered right to your doorstep in Umerkot within minutes.</p>
            </div>
            <div className="feature-card" style={{background: 'var(--bg-glass)', padding: '30px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', backdropFilter: 'var(--glass)', textAlign: 'center'}} data-aos="fade-up" data-aos-delay="300">
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
            <div className="about-img" style={{position: 'relative'}} data-aos="fade-right">
              <img src="https://lh3.googleusercontent.com/gps-cs-s/AHVAwer3nCGFK5LjJehZVNeKUfJwk0b1eIGeheL2bGX6lEZbUytAJJjVF8ipNxHlIiOe5Kq-26csFkjfjR6nUl05X_1mGmiDu0bfs0gZgVauedpdJRoXLj_Yavm3qkqYvY7Eix693Z-d=s1600" alt="Desi Hut Storefront" style={{width: '100%', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)'}} />
              <div style={{position: 'absolute', bottom: '-20px', right: '-20px', background: 'var(--primary)', color: 'white', padding: '20px', borderRadius: '15px', fontWeight: 'bold', fontSize: '1.2rem', textAlign: 'center'}}>
                Established <br/> Premium Taste
              </div>
            </div>
            <div className="about-text" data-aos="fade-left">
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

      {/* Gallery Section */}
      <section className="gallery-section section-padding">
        <div className="container">
          <div className="section-header" data-aos="fade-up" style={{textAlign: 'center', marginBottom: '60px'}}>
            <h2>Our <span className="text-primary">Signature Dishes</span></h2>
            <p>Take a look at our delicious creations that will make your mouth water.</p>
          </div>
          <div className="gallery-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px'}}>
            <div className="gallery-item" data-aos="zoom-in" data-aos-delay="100" onClick={() => setSelectedImage({src: '/images/Karahi.jpg', title: 'Authentic Karahi'})}>
              <img loading="lazy" src="/images/Karahi.jpg" alt="Authentic Karahi" style={{width: '100%', height: '280px', objectFit: 'cover', borderRadius: '12px', transition: 'var(--transition)'}} />
              <div className="gallery-overlay" style={{position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'var(--transition)', borderRadius: '12px'}}>
                <h4 style={{color: 'white', margin: '0'}}>Authentic Karahi</h4>
              </div>
            </div>
            <div className="gallery-item" data-aos="zoom-in" data-aos-delay="200" onClick={() => setSelectedImage({src: '/images/dal-chawal.jpg', title: 'Traditional Dal Chawal'})}>
              <img loading="lazy" src="/images/dal-chawal.jpg" alt="Traditional Dal Chawal" style={{width: '100%', height: '280px', objectFit: 'cover', borderRadius: '12px', transition: 'var(--transition)'}} />
              <div className="gallery-overlay" style={{position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'var(--transition)', borderRadius: '12px'}}>
                <h4 style={{color: 'white', margin: '0'}}>Traditional Dal Chawal</h4>
              </div>
            </div>
            <div className="gallery-item" data-aos="zoom-in" data-aos-delay="300" onClick={() => setSelectedImage({src: '/images/veg-nonveg-thali.jpg', title: 'Veg & Non-Veg Thali'})}>
              <img loading="lazy" src="/images/veg-nonveg-thali.jpg" alt="Veg & Non-Veg Thali" style={{width: '100%', height: '280px', objectFit: 'cover', borderRadius: '12px', transition: 'var(--transition)'}} />
              <div className="gallery-overlay" style={{position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'var(--transition)', borderRadius: '12px'}}>
                <h4 style={{color: 'white', margin: '0'}}>Veg & Non-Veg Thali</h4>
              </div>
            </div>
            <div className="gallery-item" data-aos="zoom-in" data-aos-delay="400" onClick={() => setSelectedImage({src: '/images/veg-nonveg-handi.jpg', title: 'Special Handi'})}>
              <img loading="lazy" src="/images/veg-nonveg-handi.jpg" alt="Special Handi" style={{width: '100%', height: '280px', objectFit: 'cover', borderRadius: '12px', transition: 'var(--transition)'}} />
              <div className="gallery-overlay" style={{position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'var(--transition)', borderRadius: '12px'}}>
                <h4 style={{color: 'white', margin: '0'}}>Special Handi</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section section-padding" style={{background: 'var(--bg-dark)'}}>
        <div className="container">
          <div className="section-header" data-aos="fade-up" style={{textAlign: 'center', marginBottom: '60px'}}>
            <h2>What Our <span className="text-primary">Customers Say</span></h2>
            <p>Don't just take our word for it - hear from our satisfied customers.</p>
          </div>
          <div className="testimonials-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px'}}>
            <div className="testimonial-card" style={{background: 'var(--bg-card)', padding: '30px', borderRadius: '16px', border: '1px solid var(--border)', textAlign: 'center'}} data-aos="fade-up" data-aos-delay="100">
              <div style={{color: 'var(--primary)', marginBottom: '15px'}}>
                ⭐⭐⭐⭐⭐
              </div>
              <p style={{color: 'var(--text-main)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '20px', fontStyle: 'italic'}}>
                "The BBQ here is absolutely amazing! The meat is so tender and flavorful. Best Pakistani food in Umerkot!"
              </p>
              <div style={{color: 'var(--primary)', fontWeight: '600'}}>- Ahmed Khan</div>
              <div style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>Regular Customer</div>
            </div>
            <div className="testimonial-card" style={{background: 'var(--bg-card)', padding: '30px', borderRadius: '16px', border: '1px solid var(--border)', textAlign: 'center'}} data-aos="fade-up" data-aos-delay="200">
              <div style={{color: 'var(--primary)', marginBottom: '15px'}}>
                ⭐⭐⭐⭐⭐
              </div>
              <p style={{color: 'var(--text-main)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '20px', fontStyle: 'italic'}}>
                "Their Handi is authentic and delicious. Fast delivery and excellent service. Highly recommended!"
              </p>
              <div style={{color: 'var(--primary)', fontWeight: '600'}}>- Fatima Bibi</div>
              <div style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>Food Blogger</div>
            </div>
            <div className="testimonial-card" style={{background: 'var(--bg-card)', padding: '30px', borderRadius: '16px', border: '1px solid var(--border)', textAlign: 'center'}} data-aos="fade-up" data-aos-delay="300">
              <div style={{color: 'var(--primary)', marginBottom: '15px'}}>
                ⭐⭐⭐⭐⭐
              </div>
              <p style={{color: 'var(--text-main)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '20px', fontStyle: 'italic'}}>
                "Great quality food and very reasonable prices. The kebabs are juicy and perfectly spiced. Will order again!"
              </p>
              <div style={{color: 'var(--primary)', fontWeight: '600'}}>- Muhammad Ali</div>
              <div style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>Local Resident</div>
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
                <div className="card-img" style={{background: `url("${item.image}")`}}></div>
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

      <FAQSection />

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="lightbox-overlay fade-in" 
          onClick={() => setSelectedImage(null)} 
          style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(15px)', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px'}}
        >
          <div 
            className="lightbox-content" 
            onClick={e => e.stopPropagation()} 
            style={{position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center'}}
          >
            <button 
              className="lightbox-close" 
              onClick={() => setSelectedImage(null)} 
              title="Close"
              style={{position: 'absolute', top: '-15px', right: '-15px', background: 'var(--primary)', border: '2px solid white', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', zIndex: 10000, boxShadow: '0 4px 15px rgba(0,0,0,0.5)', transition: 'transform 0.2s ease'}}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <X size={24} strokeWidth={2.5} />
            </button>
            <img src={selectedImage.src} alt={selectedImage.title} style={{maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 30px 60px rgba(0,0,0,0.8)'}} />
            
            <div style={{marginTop: '20px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 30px', borderRadius: '50px', pointerEvents: 'none'}}>
              <h3 style={{color: 'white', margin: 0, fontSize: '0.95rem', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: '500'}}>{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}
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
              <div className="card-img" style={{background: `url("${item.image}")`}}></div>
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

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null)
  
  const faqs = [
    {
      question: "What are your operating hours?",
      answer: "We are open from 12:00 PM to 1:00 AM daily, serving lunch, dinner, and late-night cravings."
    },
    {
      question: "Do you offer home delivery in Umerkot?",
      answer: "Yes, we provide fast and reliable home delivery across Umerkot city. Your food arrives hot and fresh!"
    },
    {
      question: "Can I book the restaurant for a private event?",
      answer: "Absolutely! We offer catering and event bookings for birthdays, corporate events, and family gatherings. Please contact us to discuss special arrangements."
    },
    {
      question: "What is your signature dish?",
      answer: "Our Special Mix Chicken Handi and Desi Hut Special Mutton Karahi are our most famous signature dishes, prepared with authentic spices."
    }
  ]
  
  return (
    <section className="faq-section section-padding" style={{background: 'var(--bg-dark)', borderTop: '1px solid var(--border)'}}>
      <div className="container">
        <div className="section-header" style={{textAlign: 'center', marginBottom: '50px'}} data-aos="fade-up">
          <h2 style={{fontSize: '2.5rem'}}>Frequently Asked <span className="text-primary">Questions</span></h2>
          <p style={{color: 'var(--text-muted)'}}>Got questions? We've got answers.</p>
        </div>
        <div className="faq-container" style={{maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '15px'}}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="faq-question">
                <span style={{fontWeight: '600', fontSize: '1.1rem'}}>{faq.question}</span>
                {activeIndex === index ? <ChevronUp className="text-primary" /> : <ChevronDown className="text-primary" />}
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Navbar = ({ cartCount, user, adminUser, onLogout }) => {
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
          <NavLink to="/" end onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
          <NavLink to="/menu" onClick={() => setIsMobileMenuOpen(false)}>Menu</NavLink>
          <NavLink to="/about" onClick={() => setIsMobileMenuOpen(false)}>About Us</NavLink>
          <NavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</NavLink>
        </div>
        <div className="nav-actions">
          {user || adminUser ? (
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              {adminUser && (
                <Link to="/admin" style={{fontSize: '0.85rem', color: '#fff', background: 'var(--primary)', padding: '5px 12px', borderRadius: '20px', textDecoration: 'none', fontWeight: 'bold'}}>Dashboard</Link>
              )}
              <span className="user-badge" style={{fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 'bold', border: '1px solid var(--primary)', padding: '2px 8px', borderRadius: '12px'}}>
                {adminUser ? 'Admin' : 'Logged In'}
              </span>
              <button 
                onClick={onLogout} 
                className="nav-icon" 
                style={{background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex', alignItems: 'center'}}
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="nav-icon" title="Login"><User size={20} /></Link>
          )}
          {!adminUser && (
            <Link to="/cart" className="nav-icon cart-trigger">
              <ShoppingCart size={20} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          )}
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
                  <div className="item-img" style={{background: `url("${item.image}")`}}></div>
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
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' })
  const [method, setMethod] = useState('COD')
  const [isOrdered, setIsOrdered] = useState(false)
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

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
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const { error } = await supabase.from('messages').insert([formData])
    
    setIsSubmitting(false)
    if (error) {
      alert('Error sending message: ' + error.message)
    } else {
      setSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    }
  }

  return (
    <div className="contact-page section-padding fade-in" style={{marginTop: '80px'}}>
      <div className="container">
        <div className="section-header">
          <h2 style={{fontSize: '3rem'}}>Get In <span className="text-primary">Touch</span></h2>
          <p>Have a question or want to book a table? We're here to help.</p>
        </div>
        
        <div className="contact-grid" style={{width: '100%', maxWidth: '1100px', margin: '50px auto 0', display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '50px'}}>
          <div className="contact-info-cards" style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            <div className="contact-card" style={{background: 'var(--bg-card)', padding: '30px', borderRadius: '16px', border: '1px solid var(--border)'}}>
              <div style={{color: 'var(--primary)', marginBottom: '15px'}}><MapPin size={32} /></div>
              <h4 style={{marginBottom: '10px'}}>Our Location</h4>
              <p style={{color: 'var(--text-muted)'}}>Near Sooraj Park Chowk, Burhan Guest House, Vehro Bypass, Umerkot, Sindh</p>
            </div>
            <div className="contact-card" style={{background: 'var(--bg-card)', padding: '30px', borderRadius: '16px', border: '1px solid var(--border)'}}>
              <div style={{color: 'var(--primary)', marginBottom: '15px'}}><Phone size={32} /></div>
              <h4 style={{marginBottom: '10px'}}>Call Us</h4>
              <div style={{color: 'var(--text-muted)'}}>
                <a href="tel:03073431191" style={{display: 'block', marginBottom: '5px', color: 'var(--text-muted)', textDecoration: 'none'}}>0307-3431191</a>
                <a href="tel:03116944779" style={{display: 'block', marginBottom: '5px', color: 'var(--text-muted)', textDecoration: 'none'}}>0311-6944779</a>
                <a href="tel:03168560600" style={{display: 'block', color: 'var(--text-muted)', textDecoration: 'none'}}>0316-8560600</a>
              </div>
            </div>
            <div className="contact-card" style={{background: 'var(--bg-card)', padding: '30px', borderRadius: '16px', border: '1px solid var(--border)'}}>
              <div style={{color: 'var(--primary)', marginBottom: '15px'}}><User size={32} /></div>
              <h4 style={{marginBottom: '10px'}}>Email Us</h4>
              <a href="mailto:desihut.mjm@gmail.com" style={{color: 'var(--text-muted)', textDecoration: 'none'}}>desihut.mjm@gmail.com</a>
            </div>
            <div className="contact-card" style={{background: 'var(--bg-card)', padding: '30px', borderRadius: '16px', border: '1px solid var(--border)'}}>
              <div style={{color: 'var(--primary)', marginBottom: '15px'}}><MessageCircle size={32} /></div>
              <h4 style={{marginBottom: '10px'}}>WhatsApp</h4>
              <a href="https://wa.me/923073431191?text=Hello%20Desi%20Hut%20MJM%20Restaurant%2C%20I%20would%20like%20to%20inquire%20about..." target="_blank" rel="noopener noreferrer" style={{color: 'var(--text-muted)', textDecoration: 'none'}}>
                Chat with us on WhatsApp
              </a>
            </div>
          </div>

          <div className="contact-form-container" style={{background: 'var(--bg-card)', padding: '40px', borderRadius: '20px', border: '1px solid var(--border)', boxShadow: '0 20px 40px rgba(0,0,0,0.2)'}}>
            <div style={{display: 'flex', gap: '15px', marginBottom: '30px', flexWrap: 'wrap'}}>
              <a href="tel:03073431191" className="btn-outline" style={{flex: '1', minWidth: '120px', textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}>
                <Phone size={18} /> Call Now
              </a>
              <a href="https://wa.me/923073431191?text=Hello%20Desi%20Hut%20MJM%20Restaurant" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{flex: '1', minWidth: '120px', textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}>
                <MessageCircle size={18} /> WhatsApp
              </a>
            </div>
            
            {submitted ? (
              <div style={{textAlign: 'center', padding: '40px 0'}}>
                <div style={{width: '60px', height: '60px', background: 'var(--bg-glass)', color: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', border: '1px solid var(--primary)'}}>
                   <CheckCircle size={30} />
                </div>
                <h3>Message Sent Successfully!</h3>
                <p style={{color: 'var(--text-muted)', marginTop: '10px'}}>Thank you for contacting us. We will get back to you soon.</p>
                <button onClick={() => setSubmitted(false)} className="btn-outline" style={{marginTop: '25px'}}>Send Another Message</button>
              </div>
            ) : (
              <>
                <h3>Send us a Message</h3>
                <form style={{marginTop: '25px'}} onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Your Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      required 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      style={{width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '10px', color: 'white'}} 
                    />
                  </div>
                  <div className="form-group" style={{marginTop: '20px'}}>
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com" 
                      required 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      style={{width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '10px', color: 'white'}} 
                    />
                  </div>
                  <div className="form-group" style={{marginTop: '20px'}}>
                    <label>Message</label>
                    <textarea 
                      placeholder="How can we help you?" 
                      required 
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      style={{width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '10px', color: 'white', minHeight: '150px'}}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn-primary" style={{width: '100%', marginTop: '30px', padding: '15px'}} disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Map Section */}
        <div className="map-section" style={{marginTop: '80px'}} data-aos="fade-up">
          <div className="section-header" style={{textAlign: 'center', marginBottom: '40px'}}>
            <h2 style={{fontSize: '2.5rem'}}>Find Us <span className="text-primary">On Google Maps</span></h2>
            <p>Visit us to experience the authentic taste of Desi Hut MJM Restaurant.</p>
          </div>
          <div style={{borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)', background: 'var(--bg-glass)', backdropFilter: 'var(--glass)'}}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3605.8413206868477!2d69.73346337538653!3d25.343105177617314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x394f1f681d31977b%3A0x874cd764049543b5!2sDESI%20HUT%20mjm%20RESTAURANT!5e0!3m2!1sen!2s!4v1774083914381!5m2!1sen!2s" 
              width="100%" 
              height="450" 
              style={{border: 0, display: 'block'}} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Desi Hut MJM Restaurant Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

const LoginPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()
  const message = location.state?.message
  
  const handleAuth = (e) => {
    e.preventDefault()
    // In a real app, this would be a Supabase auth call.
    // For now, we'll simulate a successful login for the user.
    onLogin({ name: 'Guest User', email: 'guest@example.com' })
    navigate('/')
  }

  return (
    <div className="auth-page section-padding fade-in" style={{marginTop: '80px'}}>
      <div className="container" style={{display: 'flex', justifyContent: 'center'}}>
        <div className="auth-card" style={{width: '100%', maxWidth: '450px', background: 'var(--bg-glass)', backdropFilter: 'var(--glass)', padding: '40px', borderRadius: '20px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)'}}>
          <div style={{textAlign: 'center', marginBottom: '30px'}}>
            <img src={logo} alt="Desi Hut MJM Logo" style={{width: '100px', marginBottom: '15px'}} />
            {message && (
              <div style={{background: 'rgba(255, 140, 0, 0.1)', color: 'var(--primary)', padding: '12px 20px', borderRadius: '12px', marginBottom: '25px', border: '1px solid var(--primary)', fontSize: '0.95rem', fontWeight: '500', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}>
                <AlertCircle size={18} />
                {message}
              </div>
            )}
            <h2>{isLogin ? 'Login to Your Account' : 'Create an Account'}</h2>
            <p style={{color: 'var(--text-muted)'}}>{isLogin ? 'Welcome back! Please enter your details.' : 'Join us to enjoy exclusive benefits.'}</p>
          </div>
          <form onSubmit={handleAuth}>
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
          <button className={`tab-btn ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => setActiveTab('messages')} style={{padding: '12px 30px', borderRadius: '10px', border: '1px solid var(--border)', background: activeTab === 'messages' ? 'var(--primary)' : 'var(--bg-glass)', color: 'white', cursor: 'pointer', fontWeight: 'bold'}}>Messages</button>
        </div>

        <div className="admin-content">
          {activeTab === 'orders' && <OrderManager />}
          {activeTab === 'products' && <ProductManager onRefresh={onRefresh} />}
          {activeTab === 'messages' && <MessageManager />}
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
              <li><Link to="/contact">Contact Support</Link></li>
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
          <p>&copy; {new Date().getFullYear()} Desi Hut MJM Restaurant. Created with Passion.</p>
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
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [fading, setFading] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [products, setProducts] = useState([])

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

  const handleLogoutAll = async () => {
    await supabase.auth.signOut()
    setAdminUser(null)
    setUser(null)
  }

  const clearCart = () => setCart([])
  
  const navigate = useNavigate()

  const addToCart = (product) => {
    if (adminUser) {
      alert('Admins cannot place orders. Please use a customer account.')
      return
    }
    if (!user) {
      navigate('/login', { state: { message: 'To order, please login first.' } })
      return
    }
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
      <Navbar cartCount={cart.reduce((s, i) => s + i.quantity, 0)} user={user} adminUser={adminUser} onLogout={handleLogoutAll} />
      <main>
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} products={products} />} />
          <Route path="/menu" element={<MenuPage addToCart={addToCart} products={products} />} />
          <Route path="/cart" element={<CartPage cart={cart} updateQty={updateQuantity} removeItem={removeFromCart} />} />
          <Route path="/login" element={<LoginPage onLogin={setUser} />} />
          <Route path="/checkout" element={<CheckoutPage cart={cart} clearCart={clearCart} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route 
            path="/admin/*" 
            element={adminUser ? <AdminDashboard user={adminUser} onLogout={handleLogoutAll} onRefresh={fetchProducts} /> : <AdminLogin onLogin={setAdminUser} />} 
          />
        </Routes>
      </main>
      
      {/* Newsletter Section */}
      <section className="newsletter-section" style={{background: 'var(--bg-card)', padding: '80px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)'}}>
        <div className="container">
          <div className="newsletter-content" style={{textAlign: 'center', maxWidth: '600px', margin: '0 auto'}} data-aos="fade-up">
            <h2 style={{marginBottom: '15px'}}>Stay Updated</h2>
            <p style={{color: 'var(--text-muted)', marginBottom: '30px', fontSize: '1.1rem'}}>
              Subscribe to our newsletter for exclusive offers, new menu items, and special events.
            </p>
            <div className="newsletter-form" style={{display: 'flex', gap: '15px', maxWidth: '500px', margin: '0 auto', flexWrap: 'wrap'}}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                style={{
                  flex: '1', 
                  minWidth: '250px',
                  padding: '15px 20px', 
                  border: '1px solid var(--border)', 
                  borderRadius: '50px', 
                  background: 'rgba(255,255,255,0.05)', 
                  color: 'var(--text-main)',
                  fontSize: '1rem'
                }} 
              />
              <button className="btn-primary" style={{padding: '15px 30px', borderRadius: '50px'}}>
                Subscribe
              </button>
            </div>
            <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '15px'}}>
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
      <BackToTop />
    </div>
  )
}

export default App
