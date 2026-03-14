'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchProducts } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';
import styles from './page.module.css';

function SearchContent() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('q') || '';
    const [query, setQuery] = useState(initialQuery);
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (query.trim().length > 0) {
            setResults(searchProducts(query.trim()));
        } else {
            setResults([]);
        }
    }, [query]);

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h1 className={styles.title}>Search</h1>
                <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Search for products..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                    />
                </form>

                {query.trim().length > 0 && (
                    <p className={styles.resultCount}>
                        {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
                    </p>
                )}

                {results.length > 0 && (
                    <div className={styles.grid}>
                        {results.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}

                {query.trim().length > 1 && results.length === 0 && (
                    <div className={styles.empty}>
                        <p>No products found. Try a different search term.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>}>
            <SearchContent />
        </Suspense>
    );
}
