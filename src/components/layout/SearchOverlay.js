'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { searchProducts } from '@/data/products';
import styles from './SearchOverlay.module.css';

export default function SearchOverlay({ isOpen, onClose }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const inputRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current.focus(), 100);
        }
        if (!isOpen) {
            setQuery('');
            setResults([]);
        }
    }, [isOpen]);

    useEffect(() => {
        if (query.trim().length > 1) {
            setResults(searchProducts(query.trim()));
        } else {
            setResults([]);
        }
    }, [query]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
            onClose();
        }
    };

    const handleProductClick = (slug) => {
        router.push(`/products/${slug}`);
        onClose();
    };

    return (
        <>
            <div className={`${styles.overlay} ${isOpen ? styles.active : ''}`} onClick={onClose} />
            <div className={`${styles.panel} ${isOpen ? styles.open : ''}`}>
                <div className={styles.inner}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            ref={inputRef}
                            type="text"
                            className={styles.input}
                            placeholder="Search products..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button type="button" className={styles.closeBtn} onClick={onClose}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </form>

                    {results.length > 0 && (
                        <div className={styles.results}>
                            {results.map((p) => (
                                <button key={p.id} className={styles.resultItem} onClick={() => handleProductClick(p.slug)}>
                                    <div className={styles.resultImage}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1">
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                        </svg>
                                    </div>
                                    <div className={styles.resultInfo}>
                                        <p className={styles.resultTitle}>{p.title}</p>
                                        <p className={styles.resultPrice}>Rs. {p.price.toLocaleString()}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {query.trim().length > 1 && results.length === 0 && (
                        <p className={styles.noResults}>No products found for &ldquo;{query}&rdquo;</p>
                    )}
                </div>
            </div>
        </>
    );
}
