import React from 'react';
import { ShoppingCart, Phone, MapPin, Users, Utensils, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="about-page section-padding fade-in" style={{marginTop: '80px'}}>
      <div className="container">
        {/* Story Section */}
        <section className="about-hero" style={{textAlign: 'center', marginBottom: '80px'}}>
          <h1 style={{fontSize: '3.5rem', marginBottom: '20px'}}>About <span className="text-primary">Desi Hut MJM</span></h1>
          <p style={{fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto'}}>
            Bringing the authentic flavors of Umerkot to your table since our inception. We pride ourselves on quality, quantity, and the true essence of Desi hospitality.
          </p>
        </section>

        <div className="about-grid" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', marginBottom: '100px'}}>
          <div className="about-image" style={{position: 'relative'}}>
            <img 
              src="https://lh3.googleusercontent.com/gps-cs-s/AHVAwepNcYWgNNMvB5cvnxGCO6ELsNCEgxPbM6HW75bDzy4LEftdoTrWCxNCQT9D3JSj55bRZN0Hd8OonnVsRAWsesxJt83OrtV8Z7jcpy_mejOD4TcQg5pI-GLwKO5am84-rhgirXSu=s1600" 
              alt="Desi Hut Interior" 
              style={{width: '100%', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)'}} 
            />
            <div style={{position: 'absolute', top: '20px', right: '20px', background: 'var(--primary)', color: 'white', padding: '15px 25px', borderRadius: '50px', fontWeight: 'bold'}}>
              1.5K+ Followers
            </div>
          </div>
          <div className="about-content">
            <h2 style={{fontSize: '2.5rem', marginBottom: '25px'}}>No Compromise on <span className="text-primary">Quality & Quantity</span></h2>
            <p style={{lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: '20px'}}>
              At Desi Hut MJM Restaurant, we believe that every meal is a celebration. Located near Sooraj Park Chowk in Umerkot, we have become a staple for food enthusiasts who seek the genuine taste of Pakistani BBQ, Handi, and Karahi.
            </p>
            <p style={{lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: '30px'}}>
              Our commitment goes beyond just serving food. We offer comprehensive kitchen and catering services for your special events, as well as dedicated Tiffin services for those who miss the taste of home at their workplace.
            </p>
            <div className="stats-grid" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
              <div style={{background: 'var(--bg-card)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border)'}}>
                <Utensils className="text-primary" style={{marginBottom: '10px'}} />
                <h4>Authentic Recipes</h4>
              </div>
              <div style={{background: 'var(--bg-card)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border)'}}>
                <Users className="text-primary" style={{marginBottom: '10px'}} />
                <h4>Expert Chefs</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <section className="our-services" style={{marginBottom: '100px'}}>
          <div style={{textAlign: 'center', marginBottom: '50px'}}>
            <h2>More Than Just a Restaurant</h2>
          </div>
          <div className="services-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px'}}>
            <div style={{background: 'var(--bg-glass)', padding: '40px', borderRadius: '16px', border: '1px solid var(--border)', textAlign: 'center'}}>
              <Award size={40} className="text-primary" style={{marginBottom: '20px'}} />
              <h3>Catering Services</h3>
              <p>Make your events memorable with our premium catering. We handle everything from small gatherings to large weddings.</p>
            </div>
            <div style={{background: 'var(--bg-glass)', padding: '40px', borderRadius: '16px', border: '1px solid var(--border)', textAlign: 'center'}}>
              <ShoppingCart size={40} className="text-primary" style={{marginBottom: '20px'}} />
              <h3>Tiffin Service</h3>
              <p>Special monthly packages for students and workers. Enjoy fresh, healthy, and warm meals delivered to your doorstep.</p>
            </div>
            <div style={{background: 'var(--bg-glass)', padding: '40px', borderRadius: '16px', border: '1px solid var(--border)', textAlign: 'center'}}>
              <MapPin size={40} className="text-primary" style={{marginBottom: '20px'}} />
              <h3>Guest House</h3>
              <p>In association with Burhan Guest House, we provide premium lodging facilities with 24/7 room service.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section" style={{background: 'linear-gradient(45deg, var(--primary), #ff8c00)', padding: '60px', borderRadius: '24px', textAlign: 'center', color: 'white'}}>
          <h2 style={{fontSize: '2.5rem', marginBottom: '20px'}}>Experience the Tradition</h2>
          <p style={{fontSize: '1.2rem', marginBottom: '30px'}}>Order now or visit us at Vehro Bypass, Umerkot.</p>
          <div style={{display: 'flex', gap: '20px', justifyContent: 'center'}}>
            <Link to="/menu" className="btn-primary" style={{background: 'white', color: 'var(--primary)'}}>View Menu</Link>
            <Link to="/contact" className="btn-outline" style={{borderColor: 'white', color: 'white'}}>Contact Us</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
