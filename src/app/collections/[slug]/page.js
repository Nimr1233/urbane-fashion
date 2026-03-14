'use client';
import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getCollectionBySlug } from '@/data/collections';
import { getProductsByCategory, getNewArrivals, getOnSaleProducts, products as allProducts } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';
import styles from './page.module.css';

export default function CollectionPage() {
    const { slug } = useParams();
    const collection = getCollectionBySlug(slug);
    const [sortOpen, setSortOpen] = useState(false);
    const [sortBy, setSortBy] = useState('featured');
    const [visibleCount, setVisibleCount] = useState(8);

    // Get products for this collection
    let collectionProducts;
    if (slug === 'new-arrivals') {
        collectionProducts = getNewArrivals();
    } else if (slug === 'special-prices-upto-50-off') {
        collectionProducts = getOnSaleProducts();
    } else {
        collectionProducts = getProductsByCategory(slug);
    }

    // If no specific products found, show all
    if (collectionProducts.length === 0) {
        collectionProducts = allProducts;
    }

    // Sort
    const sorted = useMemo(() => {
        const items = [...collectionProducts];
        switch (sortBy) {
            case 'price-asc':
                return items.sort((a, b) => a.price - b.price);
            case 'price-desc':
                return items.sort((a, b) => b.price - a.price);
            case 'title-asc':
                return items.sort((a, b) => a.title.localeCompare(b.title));
            default:
                return items;
        }
    }, [collectionProducts, sortBy]);

    const visible = sorted.slice(0, visibleCount);
    const hasMore = visibleCount < sorted.length;

    const handleSort = (value) => {
        setSortBy(value);
        setSortOpen(false);
    };

    const displayName = collection?.title || (slug?.replace ? slug.replace(/-/g, ' ') : 'Collection');

    return (
        <div className={`${styles.page} pageEnter`}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.headerInner}>
                    <div className={styles.breadcrumbs}>
                        <Link href="/">Home</Link>
                        <span>/</span>
                        <span className={styles.current}>
                            {displayName}
                        </span>
                    </div>
                    <h1 className={styles.title}>
                        {displayName}
                    </h1>
                    {collection?.description && (
                        <p className={styles.description}>{collection.description}</p>
                    )}
                    <p className={styles.count}>{sorted.length} products</p>
                </div>
            </div>

            {/* Products Grid */}
            <div className={styles.content}>
                <div className={styles.grid}>
                    {visible.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {hasMore && (
                    <div className={styles.loadMore}>
                        <button className={styles.loadMoreBtn} onClick={() => setVisibleCount((c) => c + 8)}>
                            Load more
                        </button>
                    </div>
                )}
            </div>

            {/* Sticky Filter/Sort Button */}
            <div className={styles.filterBar}>
                <button className={styles.filterBtn} onClick={() => setSortOpen(!sortOpen)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="4" y1="21" x2="4" y2="14" />
                        <line x1="4" y1="10" x2="4" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12" y2="3" />
                        <line x1="20" y1="21" x2="20" y2="16" />
                        <line x1="20" y1="12" x2="20" y2="3" />
                    </svg>
                    Filter and sort
                </button>
            </div>

            {/* Sort Drawer */}
            {sortOpen && (
                <>
                    <div className={styles.sortOverlay} onClick={() => setSortOpen(false)} />
                    <div className={styles.sortDrawer}>
                        <div className={styles.sortHeader}>
                            <h3>Sort by</h3>
                            <button onClick={() => setSortOpen(false)}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                        <div className={styles.sortOptions}>
                            {[
                                { value: 'featured', label: 'Featured' },
                                { value: 'price-asc', label: 'Price, low to high' },
                                { value: 'price-desc', label: 'Price, high to low' },
                                { value: 'title-asc', label: 'Alphabetically, A-Z' },
                            ].map((opt) => (
                                <button
                                    key={opt.value}
                                    className={`${styles.sortOption} ${sortBy === opt.value ? styles.sortActive : ''}`}
                                    onClick={() => handleSort(opt.value)}
                                >
                                    {opt.label}
                                    {sortBy === opt.value && (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
