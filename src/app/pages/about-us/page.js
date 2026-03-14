export const metadata = { title: 'About Us - URBANE' };

export default function AboutUsPage() {
    return (
        <div className="pageEnter" style={{ minHeight: '60vh', padding: '48px 0' }}>
            <div className="container" style={{ maxWidth: '700px', margin: '0 auto', padding: '0 20px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '24px' }}>About Us</h1>
                <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#666', marginBottom: '16px' }}>
                    Established in 2024, URBANE is a fast fashion label built for the young and bold. We deliver trend-driven,
                    high-impact fashion at speed — from elevated basics to statement pieces, all designed to reflect the now.
                </p>
                <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#666', marginBottom: '16px' }}>
                    With regular drops and a growing range of apparel, accessories, and essentials, URBANE is your go-to
                    for fashion that moves fast, looks sharp, and never blends in.
                </p>
                <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#666', marginBottom: '16px' }}>
                    Our vision is to redefine fashion with creativity, quality, and authenticity at its core. We believe that
                    premium fashion should be accessible to everyone, and we work tirelessly to deliver the best quality at
                    prices that make sense.
                </p>
                <div style={{ marginTop: '32px', padding: '24px', background: '#f7f7f7', borderRadius: '12px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '12px' }}>Contact Us</h3>
                    <p style={{ fontSize: '14px', color: '#666' }}>(021) 32561100</p>
                    <p style={{ fontSize: '14px', color: '#666' }}>contact@urbane.com</p>
                </div>
            </div>
        </div>
    );
}
