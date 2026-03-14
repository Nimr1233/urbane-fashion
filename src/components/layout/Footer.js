'use client';
import { useState } from 'react';
import Link from 'next/link';
import { navigation } from '@/data/navigation';
import styles from './Footer.module.css';
import { siteConfig } from '@/config/site';

export default function Footer() {
    const [linksOpen, setLinksOpen] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false);
    const [email, setEmail] = useState('');

    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.grid}>
                    {/* Quick Links */}
                    <div className={styles.column}>
                        <button
                            className={styles.colTitle}
                            onClick={() => setLinksOpen(!linksOpen)}
                        >
                            Quick Links
                            <svg
                                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                className={`${styles.chevron} ${linksOpen ? styles.rotated : ''}`}
                            >
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </button>
                        <div className={`${styles.colContent} ${linksOpen ? styles.expanded : ''}`}>
                            {navigation.footerLinks.map((link) => (
                                <Link key={link.label} href={link.href} className={styles.link}>
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* About */}
                    <div className={styles.column}>
                        <button
                            className={styles.colTitle}
                            onClick={() => setAboutOpen(!aboutOpen)}
                        >
                            About Us
                            <svg
                                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                className={`${styles.chevron} ${aboutOpen ? styles.rotated : ''}`}
                            >
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </button>
                        <div className={`${styles.colContent} ${aboutOpen ? styles.expanded : ''}`}>
                            <p className={styles.aboutText}>
                                {siteConfig.description}
                            </p>
                            <div className={styles.contact}>
                                <p>{siteConfig.contact.phone}</p>
                                <p>{siteConfig.contact.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className={styles.column}>
                        <h4 className={styles.colTitleStatic}>Stay Connected</h4>
                        <p className={styles.newsletterText}>
                            Join the crew, stay ahead with regular updates. Front row or no show? You choose.
                        </p>
                        <form className={styles.newsletterForm} onSubmit={(e) => { e.preventDefault(); setEmail(''); }}>
                            <input
                                type="email"
                                className={styles.emailInput}
                                placeholder="Sign up now!"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button type="submit" className={styles.submitBtn} aria-label="Subscribe">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom */}
                <div className={styles.bottom}>
                    <div className={styles.badges}>
                        <span className={styles.badge}>Customer Service</span>
                        <span className={styles.badge}>Free Shipping 3000+</span>
                        <span className={styles.badge}>Secure Payment</span>
                    </div>
                    <p className={styles.copyright}>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
