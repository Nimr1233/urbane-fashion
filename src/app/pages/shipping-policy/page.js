export const metadata = { title: 'Shipping Policy - URBANE' };

export default function ShippingPolicyPage() {
    return (
        <div className="pageEnter" style={{ minHeight: '60vh', padding: '48px 0' }}>
            <div className="container" style={{ maxWidth: '700px', margin: '0 auto', padding: '0 20px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '24px' }}>Shipping Policy</h1>
                <div style={{ fontSize: '14px', lineHeight: 1.8, color: '#666' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#000', margin: '24px 0 8px' }}>Delivery Timeframes</h3>
                    <p>Standard delivery takes 3-5 business days nationwide. Orders placed before 2 PM are processed and shipped on the same day.</p>

                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#000', margin: '24px 0 8px' }}>Free Shipping</h3>
                    <p>We offer free shipping on all orders above Rs. 3,000. Orders below this threshold are charged a flat delivery fee.</p>

                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#000', margin: '24px 0 8px' }}>Order Tracking</h3>
                    <p>Once your order is shipped, you will receive a tracking number via SMS and email. You can track your order status anytime using the Track Your Order feature on our website.</p>

                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#000', margin: '24px 0 8px' }}>Delivery Areas</h3>
                    <p>We deliver nationwide across Pakistan. Remote areas may take an additional 1-2 business days for delivery.</p>
                </div>
            </div>
        </div>
    );
}
