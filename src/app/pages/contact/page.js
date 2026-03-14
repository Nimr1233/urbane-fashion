'use client';
import { useState } from 'react';

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setForm({ name: '', email: '', message: '' });
    };

    return (
        <div className="pageEnter" style={{ minHeight: '60vh', padding: '48px 0' }}>
            <div className="container" style={{ maxWidth: '600px', margin: '0 auto', padding: '0 20px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>Contact</h1>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '32px' }}>
                    Have a question? We&apos;d love to hear from you.
                </p>

                {submitted ? (
                    <div style={{ textAlign: 'center', padding: '48px 0' }}>
                        <p style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Thank you!</p>
                        <p style={{ fontSize: '14px', color: '#666' }}>We&apos;ll get back to you shortly.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px', color: '#666' }}>Name</label>
                            <input
                                type="text" required value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                style={{ width: '100%', padding: '14px 16px', background: '#f7f7f7', borderRadius: '8px', fontSize: '14px', border: '1px solid #e8e8e8' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px', color: '#666' }}>Email</label>
                            <input
                                type="email" required value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                style={{ width: '100%', padding: '14px 16px', background: '#f7f7f7', borderRadius: '8px', fontSize: '14px', border: '1px solid #e8e8e8' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px', color: '#666' }}>Message</label>
                            <textarea
                                required rows={5} value={form.message}
                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                                style={{ width: '100%', padding: '14px 16px', background: '#f7f7f7', borderRadius: '8px', fontSize: '14px', border: '1px solid #e8e8e8', resize: 'vertical' }}
                            />
                        </div>
                        <button type="submit" className="btnPrimary">Send Message</button>
                    </form>
                )}

                <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ padding: '20px', background: '#f7f7f7', borderRadius: '12px' }}>
                        <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: '#999', marginBottom: '4px' }}>Phone</p>
                        <p style={{ fontSize: '14px', fontWeight: 500 }}>(021) 32561100</p>
                    </div>
                    <div style={{ padding: '20px', background: '#f7f7f7', borderRadius: '12px' }}>
                        <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: '#999', marginBottom: '4px' }}>Email</p>
                        <p style={{ fontSize: '14px', fontWeight: 500 }}>contact@urbane.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
