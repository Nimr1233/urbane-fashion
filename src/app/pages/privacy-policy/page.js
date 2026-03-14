export const metadata = { title: 'Privacy Policy - URBANE' };

export default function PrivacyPolicyPage() {
    return (
        <div className="pageEnter" style={{ minHeight: '60vh', padding: '48px 0' }}>
            <div className="container" style={{ maxWidth: '700px', margin: '0 auto', padding: '0 20px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '24px' }}>Privacy Policy</h1>
                <div style={{ fontSize: '14px', lineHeight: 1.8, color: '#666' }}>
                    <p>At URBANE, we are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your personal information.</p>

                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#000', margin: '24px 0 8px' }}>Information We Collect</h3>
                    <p>We collect information you provide when placing an order, creating an account, or contacting us. This includes your name, email address, phone number, and delivery address.</p>

                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#000', margin: '24px 0 8px' }}>How We Use Your Information</h3>
                    <p>Your information is used to process orders, provide customer support, send order updates, and improve our services. We never sell your personal data to third parties.</p>

                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#000', margin: '24px 0 8px' }}>Data Security</h3>
                    <p>Your payment information is processed securely through encrypted payment gateways. We implement industry-standard security measures to protect your data.</p>
                </div>
            </div>
        </div>
    );
}
