export const metadata = { title: 'Exchange & Returns - URBANE' };

export default function ExchangeReturnsPage() {
    return (
        <div className="pageEnter" style={{ minHeight: '60vh', padding: '48px 0' }}>
            <div className="container" style={{ maxWidth: '700px', margin: '0 auto', padding: '0 20px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '24px' }}>Exchange & Returns</h1>
                <div style={{ fontSize: '14px', lineHeight: 1.8, color: '#666' }}>
                    <p>We want you to be completely satisfied with your purchase. If something is not right, we make exchanges and returns simple.</p>

                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#000', margin: '24px 0 8px' }}>Exchange Policy</h3>
                    <p>Exchanges are accepted within 7 days of delivery. Items must be unworn, unwashed, and with all original tags attached. Exchange requests can be initiated by contacting our customer service team.</p>

                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#000', margin: '24px 0 8px' }}>Return Policy</h3>
                    <p>Returns are available for store credit within 7 days of delivery. The item must be in its original condition. Sale items are final sale and cannot be returned or exchanged.</p>

                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#000', margin: '24px 0 8px' }}>How to Initiate</h3>
                    <p>Contact us at (021) 32561100 or email contact@urbane.com with your order number and reason for exchange or return. Our team will guide you through the process.</p>
                </div>
            </div>
        </div>
    );
}
