'use client';
import { useState } from 'react';
import Link from 'next/link';
import { formatPrice, calculateDiscount } from '@/utils/helpers';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, showQuickAdd = true }) {
    const [hovered, setHovered] = useState(false);
    const discount = calculateDiscount(product.price, product.compareAtPrice);
    const hasSecondImage = product.images.length > 1;

    const gradients = {
        'sweaters-cardigans': 'linear-gradient(135deg, #e8d5b7 0%, #c4a573 100%)',
        'hoodies-sweatshirts': 'linear-gradient(135deg, #2d2d2d 0%, #4a4a4a 100%)',
        'jeans': 'linear-gradient(135deg, #1a2744 0%, #5a7ca0 100%)',
        'outerwear': 'linear-gradient(135deg, #4a3728 0%, #8b6914 100%)',
        'tshirts': 'linear-gradient(135deg, #e8e8e8 0%, #cccccc 100%)',
        'cargos-trousers': 'linear-gradient(135deg, #c3b091 0%, #8b7355 100%)',
        'shirts': 'linear-gradient(135deg, #87CEEB 0%, #b0d4f1 100%)',
        'accessories': 'linear-gradient(135deg, #333 0%, #666 100%)',
        'fragrances': 'linear-gradient(135deg, #d4af37 0%, #f5e6a3 100%)',
    };

    const secondGradients = {
        'sweaters-cardigans': 'linear-gradient(135deg, #c4a573 0%, #e8d5b7 100%)',
        'hoodies-sweatshirts': 'linear-gradient(135deg, #4a4a4a 0%, #6b6b6b 100%)',
        'jeans': 'linear-gradient(135deg, #5a7ca0 0%, #1a2744 100%)',
        'outerwear': 'linear-gradient(135deg, #8b6914 0%, #4a3728 100%)',
        'tshirts': 'linear-gradient(135deg, #cccccc 0%, #e8e8e8 100%)',
        'cargos-trousers': 'linear-gradient(135deg, #8b7355 0%, #c3b091 100%)',
        'shirts': 'linear-gradient(135deg, #b0d4f1 0%, #87CEEB 100%)',
        'accessories': 'linear-gradient(135deg, #666 0%, #333 100%)',
        'fragrances': 'linear-gradient(135deg, #f5e6a3 0%, #d4af37 100%)',
    };

    return (
        <div
            className={styles.card}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Link href={`/products/${product.slug}`} className={styles.imageLink}>
                <div className={styles.imageWrap}>
                    {/* Primary image */}
                    <div
                        className={`${styles.image} ${hovered && hasSecondImage ? styles.imageHidden : ''}`}
                        style={{ background: gradients[product.category] || gradients['tshirts'] }}
                    >
                        <span className={styles.productInitial}>{product.title.charAt(0)}</span>
                    </div>
                    {/* Secondary image (hover) */}
                    {hasSecondImage && (
                        <div
                            className={`${styles.image} ${styles.imageSecond} ${hovered ? styles.imageVisible : ''}`}
                            style={{ background: secondGradients[product.category] || secondGradients['tshirts'] }}
                        >
                            <span className={styles.productInitial}>{product.title.charAt(0)}</span>
                        </div>
                    )}

                    {/* Badges */}
                    {discount > 0 && (
                        <span className={styles.badge}>Save {discount}%</span>
                    )}
                    {product.rating >= 4.5 && (
                        <span className={styles.ratingBadge}>
                            ★ {product.rating}
                        </span>
                    )}

                    {/* Quick add on hover */}
                    {showQuickAdd && (
                        <div className={`${styles.quickAdd} ${hovered ? styles.quickAddVisible : ''}`}>
                            <span className={styles.quickAddText}>Choose options</span>
                        </div>
                    )}
                </div>
            </Link>

            <div className={styles.info}>
                <Link href={`/products/${product.slug}`} className={styles.title}>
                    {product.title}
                </Link>
                {product.selectedColor && product.colors.length > 0 && (
                    <div className={styles.colorRow}>
                        {product.colors.map((c) => (
                            <span
                                key={c.name}
                                className={styles.swatch}
                                style={{ background: c.hex }}
                                title={c.name}
                            />
                        ))}
                    </div>
                )}
                <div className={styles.priceRow}>
                    <span className={styles.price}>{formatPrice(product.price)}</span>
                    {product.compareAtPrice && (
                        <span className={styles.comparePrice}>{formatPrice(product.compareAtPrice)}</span>
                    )}
                </div>
            </div>
        </div>
    );
}
