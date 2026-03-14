'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/helpers';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
    const { items, subtotal, itemCount, isCartOpen, closeCart, removeItem, updateQuantity, isFreeShipping, freeShippingThreshold, freeShippingProgress } = useCart();
    const [activeTab, setActiveTab] = useState('cart');

    return (
        <>
            <div className={`${styles.overlay} ${isCartOpen ? styles.active : ''}`} onClick={closeCart} />
            <div className={`${styles.drawer} ${isCartOpen ? styles.open : ''}`}>
                {/* Drag handle - mobile only */}
                <div className={styles.handle}><span className={styles.handleBar} /></div>

                {/* Header with tabs */}
                <div className={styles.header}>
                    <div className={styles.tabs}>
                        <button
                            className={`${styles.tab} ${activeTab === 'cart' ? styles.tabActive : ''}`}
                            onClick={() => setActiveTab('cart')}
                        >
                            Cart <sup className={styles.sup}>{itemCount}</sup>
                        </button>
                        <button
                            className={`${styles.tab} ${activeTab === 'recent' ? styles.tabActive : ''}`}
                            onClick={() => setActiveTab('recent')}
                        >
                            Recently viewed
                        </button>
                    </div>
                    <button className={styles.closeBtn} onClick={closeCart} aria-label="Close cart">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {activeTab === 'cart' ? (
                    <>
                        {/* Cart items */}
                        <div className={styles.items}>
                            {items.length === 0 ? (
                                <div className={styles.empty}>
                                    <p className={styles.emptyText}>Your cart is currently empty.</p>
                                    <p className={styles.emptySubtext}>Not sure where to start?</p>
                                    <Link href="/collections/new-arrivals" className={styles.shopLink} onClick={closeCart}>
                                        Continue shopping
                                    </Link>
                                </div>
                            ) : (
                                items.map((item, idx) => (
                                    <div key={`${item.id}-${item.size}-${item.color}-${idx}`} className={styles.item}>
                                        <div className={styles.itemImage}>
                                            <div className={styles.imagePlaceholder}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1">
                                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                                    <polyline points="21 15 16 10 5 21" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className={styles.itemInfo}>
                                            <Link href={`/products/${item.slug}`} className={styles.itemTitle} onClick={closeCart}>
                                                {item.title}
                                            </Link>
                                            <p className={styles.itemVariant}>{item.size}</p>
                                            {item.color && <p className={styles.itemVariant}>{item.color}</p>}
                                            <p className={styles.itemPrice}>{formatPrice(item.price)}</p>
                                        </div>
                                        <div className={styles.itemRight}>
                                            <div className={styles.qtyBox}>
                                                <span className={styles.qtyValue}>{item.quantity}</span>
                                            </div>
                                            <button
                                                className={styles.removeLink}
                                                onClick={() => removeItem(item.id, item.size, item.color)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer - only when items exist */}
                        {items.length > 0 && (
                            <div className={styles.footer}>
                                {/* Action tabs */}
                                <div className={styles.actionTabs}>
                                    <button className={styles.actionTab}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                            <polyline points="14 2 14 8 20 8" />
                                            <line x1="16" y1="13" x2="8" y2="13" />
                                            <line x1="16" y1="17" x2="8" y2="17" />
                                        </svg>
                                        Order note
                                    </button>
                                    <button className={styles.actionTab}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <rect x="1" y="3" width="15" height="13" />
                                            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                                            <circle cx="5.5" cy="18.5" r="2.5" />
                                            <circle cx="18.5" cy="18.5" r="2.5" />
                                        </svg>
                                        Shipping
                                    </button>
                                    <button className={styles.actionTab}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <circle cx="12" cy="12" r="10" />
                                            <line x1="8" y1="12" x2="16" y2="12" />
                                        </svg>
                                        Discount
                                    </button>
                                </div>

                                {/* Subtotal row */}
                                <div className={styles.subtotalRow}>
                                    <div className={styles.subtotalLeft}>
                                        <p className={styles.taxNote}>Taxes included and shipping calculated at checkout.</p>
                                    </div>
                                    <div className={styles.subtotalRight}>
                                        <p className={styles.subtotalLabel}>Subtotal</p>
                                        <p className={styles.subtotalPrice}>{formatPrice(subtotal)} PKR</p>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className={styles.buttons}>
                                    <button className={styles.checkoutBtn}>Check out</button>
                                    <Link href="/cart" className={styles.viewCartBtn} onClick={closeCart}>View cart</Link>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    /* Recently viewed tab */
                    <div className={styles.items}>
                        <div className={styles.empty}>
                            <p className={styles.emptySubtext}>No recently viewed products.</p>
                            <Link href="/collections/new-arrivals" className={styles.shopLink} onClick={closeCart}>
                                Browse products
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
