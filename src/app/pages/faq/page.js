'use client';
import { useState } from 'react';

const faqs = [
    { q: 'How do I track my order?', a: 'You can track your order using the "Track Your Order" link in the header or footer of our website. Enter your order number to see real-time updates.' },
    { q: 'What is your return policy?', a: 'We offer easy exchanges and returns within 7 days of delivery. Items must be unworn, unwashed, and with tags attached. Please visit our Exchange & Returns page for details.' },
    { q: 'How long does delivery take?', a: 'Standard delivery takes 3-5 business days nationwide. Orders placed before 2 PM are shipped the same day.' },
    { q: 'Do you offer free shipping?', a: 'Yes! We offer free shipping on all orders above Rs. 3,000. Orders below this amount have a flat shipping fee.' },
    { q: 'How do I know my size?', a: 'Each product page includes a size guide with detailed measurements. We recommend measuring yourself and comparing with the size chart for the best fit.' },
    { q: 'What payment methods do you accept?', a: 'We accept Cash on Delivery (COD), bank transfer, and all major credit/debit cards through our secure payment gateway.' },
    { q: 'Can I cancel my order?', a: 'Orders can be cancelled within 1 hour of placement. After that, the order enters processing and cannot be cancelled. Contact our support team for assistance.' },
];

export default function FAQPage() {
    const [open, setOpen] = useState(null);

    return (
        <div className="pageEnter" style={{ minHeight: '60vh', padding: '48px 0' }}>
            <div className="container" style={{ maxWidth: '700px', margin: '0 auto', padding: '0 20px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>FAQ&apos;s</h1>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '32px' }}>
                    Find answers to commonly asked questions below.
                </p>

                <div>
                    {faqs.map((faq, i) => (
                        <div key={i} style={{ borderBottom: '1px solid #e8e8e8' }}>
                            <button
                                onClick={() => setOpen(open === i ? null : i)}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    width: '100%', padding: '18px 0', textAlign: 'left',
                                    fontSize: '14px', fontWeight: 600, color: '#000',
                                }}
                            >
                                {faq.q}
                                <svg
                                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                    style={{ transform: open === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease', flexShrink: 0, marginLeft: '12px' }}
                                >
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </button>
                            <div style={{
                                maxHeight: open === i ? '200px' : '0', overflow: 'hidden',
                                transition: 'max-height 0.3s ease',
                            }}>
                                <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#666', paddingBottom: '18px' }}>
                                    {faq.a}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
