import React from 'react';

const TermsOfService = () => {
  return (
    <div className="policy-page section-padding fade-in" style={{marginTop: '80px'}}>
      <div className="container" style={{maxWidth: '800px'}}>
        <h1 style={{marginBottom: '30px'}}>Terms of Service</h1>
        <div style={{color: 'var(--text-muted)', lineHeight: '1.8'}}>
          <p>Welcome to Desi Hut MJM Restaurant. By using our services, you agree to the following terms.</p>
          
          <h3 style={{color: 'white', marginTop: '30px'}}>1. Order Acceptance</h3>
          <p>All orders placed through our website are subject to acceptance. We reserve the right to refuse or cancel any order for reasons including menu item availability, errors in pricing, or issues identified by our fraud prevention team.</p>

          <h3 style={{color: 'white', marginTop: '30px'}}>2. Pricing and Payment</h3>
          <p>Prices for our menu items are listed in Pakistani Rupees (Rs.). We accept Cash on Delivery and Online Payments. Delivery fees may apply based on your location in Umerkot.</p>

          <h3 style={{color: 'white', marginTop: '30px'}}>3. Delivery</h3>
          <p>We aim to deliver your food within the estimated time frame. However, delivery times may be affected by traffic, weather, or kitchen volume. We are not liable for delays beyond our reasonable control.</p>

          <h3 style={{color: 'white', marginTop: '30px'}}>4. Cancellations and Refunds</h3>
          <p>Orders can be cancelled within 5 minutes of placement. Once preparation has started, cancellations may not be possible. Refunds for online payments will be processed according to our standard refund policy.</p>

          <h3 style={{color: 'white', marginTop: '30px'}}>5. Limitation of Liability</h3>
          <p>Desi Hut MJM Restaurant shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.</p>

          <h3 style={{color: 'white', marginTop: '30px'}}>6. Governing Law</h3>
          <p>These terms are governed by the laws of Pakistan.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
