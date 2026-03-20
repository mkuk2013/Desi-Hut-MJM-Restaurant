import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="policy-page section-padding fade-in" style={{marginTop: '80px'}}>
      <div className="container" style={{maxWidth: '800px'}}>
        <h1 style={{marginBottom: '30px'}}>Privacy Policy</h1>
        <div style={{color: 'var(--text-muted)', lineHeight: '1.8'}}>
          <p>Effective Date: March 20, 2024</p>
          
          <h3 style={{color: 'white', marginTop: '30px'}}>1. Information We Collect</h3>
          <p>We collect information you provide directly to us when you place an order, including your name, phone number, and delivery address. This information is used solely for fulfilling your orders and providing customer support.</p>

          <h3 style={{color: 'white', marginTop: '30px'}}>2. How We Use Your Information</h3>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Process and deliver your food orders.</li>
            <li>Send you order confirmations and updates via phone or SMS.</li>
            <li>Respond to your comments, questions, and requests.</li>
            <li>Improve our services and restaurant offerings.</li>
          </ul>

          <h3 style={{color: 'white', marginTop: '30px'}}>3. Data Security</h3>
          <p>We take reasonable measures to protect your personal information from loss, theft, misuse, and unauthorized access. Your payment information is processed through secure channels.</p>

          <h3 style={{color: 'white', marginTop: '30px'}}>4. Sharing of Information</h3>
          <p>We do not share your personal information with third parties except as necessary to fulfill your order (e.g., with delivery personnel) or as required by law.</p>

          <h3 style={{color: 'white', marginTop: '30px'}}>5. Contact Us</h3>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p>Email: desihut.mjm@gmail.com<br/>Phone: 0307-3431191</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
