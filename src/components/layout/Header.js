'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { navigation } from '@/data/navigation';
import MobileDrawer from './MobileDrawer';
import CartDrawer from './CartDrawer';
import SearchOverlay from './SearchOverlay';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import styles from './Header.module.css';
import { siteConfig } from '@/config/site';

const announcements = [
    "FW-25 LIVE NOW",
    "Easy Exchanges and Returns"
];

const AnnouncementBar = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % announcements.length);
        }, 2500);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className={styles.announcementBar}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={styles.announcementText}
                >
                    {announcements[index]}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

const LoadingSpinner = () => (
    <motion.div
        className={styles.spinner}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
);

const Magnet = ({ children, strength = 0.5 }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        x.set((clientX - centerX) * strength);
        y.set((clientY - centerY) * strength);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
        >
            {children}
        </motion.div>
    );
};

const RollingText = ({ text }) => {
    return (
        <div className={styles.rollingTextContainer}>
            <div className={styles.rollingTextInner}>
                <span className={styles.rollingTextItem}>{text}</span>
                <span className={styles.rollingTextItem}>{text}</span>
            </div>
        </div>
    );
};

const NavUnderline = ({ text, isHighlighted }) => (
    <div className={`${styles.navUnderlineWrap} ${isHighlighted ? styles.highlighted : ''}`}>
        <span>{text}</span>
        <div className={styles.underline} />
    </div>
);

export default function Header() {
    const { itemCount, toggleCart } = useCart();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownTimer = useRef(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleDropdownEnter = () => {
        clearTimeout(dropdownTimer.current);
        setDropdownOpen(true);
    };

    const handleDropdownLeave = () => {
        dropdownTimer.current = setTimeout(() => setDropdownOpen(false), 200);
    };

    return (
        <>
            <AnnouncementBar />
            <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
                <div className={styles.inner}>
                    {/* Mobile: Hamburger */}
                    <button
                        className={styles.hamburger}
                        onClick={() => setMobileOpen(true)}
                        aria-label="Open menu"
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    </button>

                    {/* Logo */}
                    <Link href="/" className={styles.logo}>
                        <span className={styles.logoText}>{siteConfig.name}</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className={styles.nav}>
                        {navigation.mainNav.map((item, index) => (
                            <div
                                key={item.label}
                                className={styles.navItem}
                                onMouseEnter={item.hasDropdown ? handleDropdownEnter : undefined}
                                onMouseLeave={item.hasDropdown ? handleDropdownLeave : undefined}
                            >
                                <Magnet strength={index === 0 ? 0.3 : 0}>
                                    <Link
                                        href={item.href}
                                        className={`${styles.navLink} ${index === 0 ? styles.categoryBtn : ''}`}
                                    >
                                        {index === 0 ? (
                                            <RollingText text={item.label} />
                                        ) : (
                                            <NavUnderline text={item.label} isHighlighted={item.isHighlighted} />
                                        )}
                                    </Link>
                                </Magnet>
                                
                                {item.hasDropdown && (
                                    <AnimatePresence>
                                        {dropdownOpen && (
                                            <motion.div 
                                                className={styles.dropdown}
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 15 }}
                                                transition={{ duration: 0.3, ease: "easeOut" }}
                                            >
                                                <div className={styles.dropdownInner}>
                                                    {item.children.map((child) => (
                                                        <Link key={child.label} href={child.href} className={styles.dropdownLink}>
                                                            <div className={styles.dropdownItemContent}>
                                                                {child.label}
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Icons */}
                    <div className={styles.icons}>
                        <Magnet strength={0.4}>
                            <button
                                className={styles.iconBtn}
                                onClick={() => setSearchOpen(true)}
                                aria-label="Search"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                            </button>
                        </Magnet>
                        <Magnet strength={0.4}>
                            <Link href="#" className={`${styles.iconBtn} ${styles.desktopOnly}`} aria-label="Account">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </Link>
                        </Magnet>
                        <Magnet strength={0.4}>
                            <button
                                className={styles.iconBtn}
                                onClick={toggleCart}
                                aria-label="Cart"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <path d="M16 10a4 4 0 0 1-8 0" />
                                </svg>
                                {itemCount > 0 && <span className={styles.cartBadge}>{itemCount}</span>}
                            </button>
                        </Magnet>
                    </div>
                </div>
            </header>

            <MobileDrawer isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
            <CartDrawer />
            <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
    );
}
