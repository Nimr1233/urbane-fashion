'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { navigation } from '@/data/navigation';
import styles from './MobileDrawer.module.css';

export default function MobileDrawer({ isOpen, onClose }) {
    const [showCategories, setShowCategories] = useState(false);
    const categoryNav = navigation.mainNav.find(n => n.hasDropdown);
    const drawerRef = useRef(null);
    const startY = useRef(0);
    const currentY = useRef(0);
    const dragging = useRef(false);
    const rafId = useRef(null);

    const handleClose = useCallback(() => {
        onClose();
        setTimeout(() => setShowCategories(false), 500);
    }, [onClose]);

    // Lag-free touch handlers using requestAnimationFrame
    const updatePosition = useCallback(() => {
        if (!drawerRef.current || !dragging.current) return;
        const delta = Math.max(0, currentY.current - startY.current);
        drawerRef.current.style.transform = `translateY(${delta}px)`;
        drawerRef.current.style.transition = 'none';
    }, []);

    const onTouchStart = useCallback((e) => {
        startY.current = e.touches[0].clientY;
        currentY.current = e.touches[0].clientY;
        dragging.current = true;
        if (rafId.current) cancelAnimationFrame(rafId.current);
    }, []);

    const onTouchMove = useCallback((e) => {
        if (!dragging.current) return;
        currentY.current = e.touches[0].clientY;
        const delta = currentY.current - startY.current;
        if (delta > 0) {
            e.preventDefault();
            if (rafId.current) cancelAnimationFrame(rafId.current);
            rafId.current = requestAnimationFrame(updatePosition);
        }
    }, [updatePosition]);

    const onTouchEnd = useCallback(() => {
        if (!dragging.current) return;
        dragging.current = false;
        if (rafId.current) cancelAnimationFrame(rafId.current);

        const delta = currentY.current - startY.current;
        if (drawerRef.current) {
            drawerRef.current.style.transition = '';
            drawerRef.current.style.transform = '';
        }
        if (delta > 80) {
            handleClose();
        }
    }, [handleClose]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, []);

    return (
        <>
            <div className={`${styles.overlay} ${isOpen ? styles.active : ''}`} onClick={handleClose} />
            <div
                ref={drawerRef}
                className={`${styles.drawer} ${isOpen ? styles.open : ''}`}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                {/* Drag handle */}
                <div className={styles.handle}><span className={styles.handleBar} /></div>

                {/* Sliding panels container */}
                <div className={styles.panelsWrapper}>
                    <div className={`${styles.panels} ${showCategories ? styles.panelsShifted : ''}`}>
                        {/* Panel 1: Main menu */}
                        <div className={styles.panel} data-panel>
                            <nav className={styles.nav}>
                                <button className={styles.categoryBtn} onClick={() => setShowCategories(true)}>
                                    <span>Shop By Category</span>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </button>

                                {navigation.mainNav.filter(n => !n.hasDropdown).map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className={styles.navLink}
                                        onClick={handleClose}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>

                            <div className={styles.spacer} />

                            <div className={styles.bottomSection}>
                                <Link href="#" className={styles.trackLink} onClick={handleClose}>
                                    Track Your Order
                                </Link>
                                <div className={styles.footer}>
                                    <Link href="#" className={styles.loginPill} onClick={handleClose}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                        Login
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Panel 2: Category sub-view */}
                        <div className={styles.panel} data-panel>
                            <button className={styles.backBtn} onClick={() => setShowCategories(false)}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                                Back
                            </button>
                            <nav className={styles.nav}>
                                {categoryNav?.children.map((child, i) => (
                                    <Link
                                        key={child.label}
                                        href={child.href}
                                        className={styles.navLink}
                                        style={{ transitionDelay: showCategories ? `${i * 40}ms` : '0ms' }}
                                        onClick={handleClose}
                                    >
                                        {child.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
