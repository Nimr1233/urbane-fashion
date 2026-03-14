'use client';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { categories } from '@/data/categories';
import styles from './CategorySlider.module.css';

const CategoryCard = ({ category }) => {
    return (
        <Link href={category.href} className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image 
                    src={category.image} 
                    alt={category.label} 
                    fill 
                    className={styles.image}
                    sizes="(max-width: 768px) 50vw, 25vw"
                />
            </div>
            <div className={styles.footer}>
                <span className={styles.label}>{category.label}</span>
                <div className={styles.arrow}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="14 7 19 12 14 17" />
                    </svg>
                </div>
            </div>
        </Link>
    );
};

export default function CategorySlider() {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.title}>Shop By Category</h2>
                <div className={styles.controls}>
                    <button onClick={() => scroll('left')} className={styles.controlBtn} aria-label="Previous">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>
                    <button onClick={() => scroll('right')} className={styles.controlBtn} aria-label="Next">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className={styles.sliderWrapper}>
                <div className={styles.slider} ref={scrollRef}>
                    {categories.map((cat) => (
                        <CategoryCard key={cat.id} category={cat} />
                    ))}
                </div>
            </div>
        </section>
    );
}
