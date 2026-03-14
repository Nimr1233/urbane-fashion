'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/helpers';

export default function CartPage() {
    const { items, subtotal, itemCount, removeItem, updateQuantity, isFreeShipping, freeShippingThreshold } = useCart();

    return (
        <div className="pageEnter" style={{ minHeight: '60vh', padding: '32px 0 60px' }}>
            <div className="container">
                <h1 style={{ fontSize: '28px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '24px' }}>
                    Your Cart ({itemCount})
                </h1>

                {items.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 0' }}>
                        <p style={{ fontSize: '16px', marginBottom: '8px' }}>Your cart is currently empty.</p>
                        <p style={{ fontSize: '13px', color: '#666', marginBottom: '24px' }}>Not sure where to start?</p>
                        <Link
                            href="/collections/new-arrivals"
                            style={{
                                display: 'inline-block', padding: '14px 32px', background: '#000', color: '#fff',
                                fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px',
                                borderRadius: '6px',
                            }}
                        >
                            Continue shopping
                        </Link>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '32px', gridTemplateColumns: '1fr' }}>
                        <div>
                            {/* Shipping progress */}
                            <div style={{ padding: '14px 20px', background: '#f7f7f7', borderRadius: '8px', marginBottom: '20px' }}>
                                <p style={{ fontSize: '12px', textAlign: 'center', color: '#666', marginBottom: '8px' }}>
                                    {isFreeShipping
                                        ? '✓ You are eligible for free shipping!'
                                        : `Spend ${formatPrice(freeShippingThreshold - subtotal)} more for free shipping`
                                    }
                                </p>
                                <div style={{ height: '3px', background: '#e8e8e8', borderRadius: '2px', overflow: 'hidden' }}>
                                    <div style={{ height: '100%', background: '#00e676', borderRadius: '2px', width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%`, transition: 'width 0.3s ease' }} />
                                </div>
                            </div>

                            {/* Cart items */}
                            {items.map((item, idx) => (
                                <div key={`${item.id}-${item.size}-${item.color}-${idx}`} style={{
                                    display: 'flex', gap: '16px', padding: '20px 0', borderBottom: '1px solid #e8e8e8',
                                }}>
                                    <div style={{
                                        width: '100px', height: '120px', background: '#f0f0f0', borderRadius: '8px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                    }}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1">
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                            <circle cx="8.5" cy="8.5" r="1.5" />
                                            <polyline points="21 15 16 10 5 21" />
                                        </svg>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <Link href={`/products/${item.slug}`} style={{ fontWeight: 600, fontSize: '14px' }}>
                                            {item.title}
                                        </Link>
                                        <p style={{ fontSize: '12px', color: '#999', margin: '4px 0' }}>
                                            {item.color} / {item.size}
                                        </p>
                                        <p style={{ fontWeight: 700, fontSize: '14px', margin: '4px 0 12px' }}>{formatPrice(item.price)}</p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ display: 'flex', border: '1px solid #e8e8e8', borderRadius: '6px' }}>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                                                    style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}
                                                >−</button>
                                                <span style={{ width: '28px', textAlign: 'center', lineHeight: '32px', fontWeight: 600, fontSize: '12px' }}>{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                                                    style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}
                                                >+</button>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.id, item.size, item.color)}
                                                style={{ fontSize: '12px', color: '#999', textDecoration: 'underline' }}
                                            >Remove</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary */}
                        <div style={{ padding: '24px', background: '#f7f7f7', borderRadius: '12px', position: 'sticky', top: '80px', alignSelf: 'start' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ fontWeight: 500 }}>Subtotal</span>
                                <span style={{ fontWeight: 700, fontSize: '18px' }}>{formatPrice(subtotal)}</span>
                            </div>
                            <p style={{ fontSize: '11px', color: '#999', marginBottom: '16px' }}>Taxes and shipping calculated at checkout</p>
                            <button style={{
                                width: '100%', padding: '16px', background: '#000', color: '#fff', fontWeight: 700,
                                fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', borderRadius: '6px',
                                border: 'none', cursor: 'pointer',
                            }}>
                                Check out
                            </button>
                            <Link href="/collections/new-arrivals" style={{
                                display: 'block', textAlign: 'center', marginTop: '12px', fontSize: '12px', color: '#666', textDecoration: 'underline',
                            }}>
                                Continue shopping
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
