'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './HeroSlideshow.module.css';

const slides = [
    {
        title: 'END OF SEASON SALE',
        subtitle: 'Live Now',
        cta: 'Shop Now',
        href: '/collections/special-prices-upto-50-off',
        bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        accentColor: '#00e676',
    },
    {
        title: 'NEW ARRIVALS',
        subtitle: '70+ NEW IN',
        cta: 'Shop Now',
        href: '/collections/new-arrivals',
        bg: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #2d2d2d 100%)',
        accentColor: '#ffffff',
    },
    {
        title: 'WINTER COLLECTION',
        subtitle: 'FW/25',
        cta: 'Explore',
        href: '/collections/new-arrivals',
        bg: 'linear-gradient(135deg, #2d1b4e 0%, #1a1a2e 50%, #0a0a15 100%)',
        accentColor: '#00e676',
    },
];

export default function HeroSlideshow() {
    const [current, setCurrent] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            goToSlide((current + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [current]);

    const goToSlide = (index) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrent(index);
        setTimeout(() => setIsTransitioning(false), 600);
    };

    const prev = () => goToSlide((current - 1 + slides.length) % slides.length);
    const next = () => goToSlide((current + 1) % slides.length);

    return (
        <section className={styles.hero}>
            <div className={styles.slidesContainer}>
                {slides.map((slide, i) => (
                    <div
                        key={i}
                        className={`${styles.slide} ${i === current ? styles.active : ''}`}
                        style={{ background: slide.bg }}
                    >
                        <div className={styles.content}>
                            <p className={styles.subtitle} style={{ color: slide.accentColor }}>
                                {slide.subtitle}
                            </p>
                            <h1 className={styles.title}>{slide.title}</h1>
                            <Link href={slide.href} className={styles.cta}>
                                {slide.cta}
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Arrows */}
            <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prev} aria-label="Previous slide">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6" />
                </svg>
            </button>
            <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={next} aria-label="Next slide">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                </svg>
            </button>

            {/* Dots */}
            <div className={styles.dots}>
                {slides.map((_, i) => (
                    <button
                        key={i}
                        className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                        onClick={() => goToSlide(i)}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
