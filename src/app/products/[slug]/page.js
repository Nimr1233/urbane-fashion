'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getProductBySlug, getRelatedProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { formatPrice, calculateDiscount } from '@/utils/helpers';
import ProductCard from '@/components/product/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './page.module.css';

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] }
};

const stagger = {
    animate: {
        transition: {
            staggerChildren: 0.05
        }
    }
};

export default function ProductPage() {
    const { slug } = useParams();
    const product = getProductBySlug(slug);
    const { addItem } = useCart();

    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(product?.selectedColor || null);
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const [descOpen, setDescOpen] = useState(true);
    const [compOpen, setCompOpen] = useState(false);
    const [sizeError, setSizeError] = useState(false);

    if (!product) {
        return (
            <div className={styles.notFound}>
                <h1>Product not found</h1>
                <Link href="/">Back to home</Link>
            </div>
        );
    }

    const related = getRelatedProducts(product);
    const discount = calculateDiscount(product.price, product.compareAtPrice);

    const handleAddToCart = () => {
        if (product.sizes.length > 0 && !selectedSize) {
            setSizeError(true);
            return;
        }
        setSizeError(false);
        addItem(product, selectedSize || 'One Size', selectedColor, quantity);
    };

    return (
        <div className={styles.page}>
            {/* Breadcrumbs */}
            <motion.div 
                className={styles.breadcrumbs}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className={styles.breadcrumbsInner}>
                    <Link href="/">Home</Link>
                    <span className={styles.sep}>/</span>
                    <Link href={`/collections/${product.category}`}>{product.category.replace(/-/g, ' ')}</Link>
                    <span className={styles.sep}>/</span>
                    <span className={styles.current}>{product.title}</span>
                </div>
            </motion.div>

            <div className={styles.content}>
                {/* Image Gallery */}
                <div className={styles.gallery}>
                    {/* Mobile: Slider */}
                    <div className={styles.mobileSlider}>
                        <div
                            className={styles.sliderTrack}
                            style={{ transform: `translateX(-${activeImage * 100}%)` }}
                        >
                            {product.images.map((img, i) => (
                                <div key={i} className={styles.sliderSlide}>
                                    <div className={styles.imagePlaceholder} />
                                </div>
                            ))}
                        </div>
                        <div className={styles.sliderDots}>
                            {product.images.map((_, i) => (
                                <button
                                    key={i}
                                    className={`${styles.sliderDot} ${i === activeImage ? styles.dotActive : ''}`}
                                    onClick={() => setActiveImage(i)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Desktop: Grid stack */}
                    <motion.div 
                        className={styles.desktopImages}
                        variants={stagger}
                        initial="initial"
                        animate="animate"
                    >
                        {product.images.map((img, i) => (
                            <motion.div
                                key={i}
                                className={styles.desktopImage}
                                variants={fadeIn}
                            >
                                <div className={styles.imagePlaceholder} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Product Info (sticky on desktop) */}
                <motion.div 
                    className={styles.info}
                    variants={stagger}
                    initial="initial"
                    animate="animate"
                >
                    <div className={styles.infoSticky}>
                        {/* Rating */}
                        <motion.div className={styles.headerRow} variants={fadeIn}>
                            <h1 className={styles.title}>{product.title}</h1>
                            <div className={styles.priceContainer}>
                                <div className={styles.priceRow}>
                                    <span className={styles.price}>{formatPrice(product.price)}</span>
                                </div>
                                {product.compareAtPrice && (
                                    <div className={styles.compareRow}>
                                        <span className={styles.comparePrice}>{formatPrice(product.compareAtPrice)}</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        <motion.div className={styles.rating} variants={fadeIn}>
                            {Array.from({ length: 5 }).map((_, i) => (
                                <span key={i} className={styles.star}>★</span>
                            ))}
                            <span className={styles.ratingText}>{product.rating}</span>
                            <span className={styles.reviewCount}>{product.reviewCount} reviews</span>
                        </motion.div>

                        {/* Color selector */}
                        {product.colors.length > 0 && (
                            <motion.div className={styles.colorSection} variants={fadeIn}>
                                <p className={styles.label}>Color: <strong>{selectedColor}</strong></p>
                                <div className={styles.colorSwatches}>
                                    {product.colors.map((c) => (
                                        <button
                                            key={c.name}
                                            className={`${styles.colorBtn} ${selectedColor === c.name ? styles.colorActive : ''}`}
                                            style={{ '--swatch-color': c.hex }}
                                            onClick={() => setSelectedColor(c.name)}
                                            title={c.name}
                                        >
                                            <span className={styles.colorSwatch} />
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Size selector */}
                        {product.sizes.length > 0 && (
                            <motion.div className={styles.sizeSection} variants={fadeIn}>
                                <div className={styles.sizeHeader}>
                                    <p className={styles.label}>
                                        Size: <strong>{selectedSize || (product.sizes[0] === 'One Size' ? 'One Size' : 'Select Size')}</strong>
                                        {sizeError && <span className={styles.sizeError}>— Please select a size</span>}
                                    </p>
                                    <button className={styles.sizeChartBtn}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M4 19h16M4 15h16M4 11h16M4 7h16" />
                                            <circle cx="12" cy="12" r="9" strokeWidth="1" opacity="0.2" />
                                            <path d="M12 3a9 9 0 0 1 0 18" />
                                        </svg>
                                        Size Chart
                                    </button>
                                </div>
                                <div className={styles.sizeGrid}>
                                    {product.sizes.map((size) => {
                                        const unavailable = product.unavailableSizes.includes(size);
                                        return (
                                            <button
                                                key={size}
                                                className={`${styles.sizeBtn} ${selectedSize === size ? styles.sizeActive : ''} ${unavailable ? styles.sizeUnavailable : ''}`}
                                                onClick={() => { if (!unavailable) { setSelectedSize(size); setSizeError(false); } }}
                                                disabled={unavailable}
                                            >
                                                {size}
                                                {unavailable && <span className={styles.sizeStrike} />}
                                            </button>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}

                        {/* Action Row: Quantity + Add to Cart */}
                        <motion.div className={styles.actionRow} variants={fadeIn}>
                            <div className={styles.quantityControl}>
                                <motion.button 
                                    className={styles.qtyBtn} 
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <polyline points="15 18 9 12 15 6" />
                                    </svg>
                                </motion.button>
                                <span className={styles.qtyValue}>{quantity}</span>
                                <motion.button 
                                    className={styles.qtyBtn} 
                                    onClick={() => setQuantity(quantity + 1)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </motion.button>
                            </div>
                            <motion.button 
                                className={styles.addToCart} 
                                onClick={handleAddToCart}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <span className={styles.btnText}>Add to cart</span>
                            </motion.button>
                        </motion.div>

                        {/* Secondary Button: Buy Now */}
                        <motion.div className={styles.secondaryButtons} variants={fadeIn}>
                            <motion.button 
                                className={styles.buyNow}
                                whileTap={{ scale: 0.99 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <span className={styles.btnText}>Buy it now</span>
                            </motion.button>
                        </motion.div>

                        {/* Description Accordion */}
                        <motion.div className={styles.accordion} variants={fadeIn}>
                            <button className={styles.accordionBtn} onClick={() => setDescOpen(!descOpen)}>
                                <span>Description</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                    className={descOpen ? styles.rotated : ''}>
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </button>
                            <AnimatePresence>
                                {descOpen && (
                                    <motion.div 
                                        className={styles.accordionContent}
                                        initial={{ height: 0 }}
                                        animate={{ height: 'auto' }}
                                        exit={{ height: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <p className={styles.descText}>{product.description}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <motion.div className={styles.accordion} variants={fadeIn}>
                            <button className={styles.accordionBtn} onClick={() => setCompOpen(!compOpen)}>
                                <span>Composition & Care</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                    className={compOpen ? styles.rotated : ''}>
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </button>
                            <AnimatePresence>
                                {compOpen && (
                                    <motion.div 
                                        className={styles.accordionContent}
                                        initial={{ height: 0 }}
                                        animate={{ height: 'auto' }}
                                        exit={{ height: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <p className={styles.descText}>{product.composition}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Customer Reviews Section */}
            <section className={styles.reviewsSection}>
                <div className={styles.reviewsInner}>
                    <h2 className={styles.reviewsTitle}>Customer Reviews</h2>
                    
                    <div className={styles.ratingOverview}>
                        <div className={styles.mainStars}>
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                            ))}
                        </div>
                        <span className={styles.ratingScore}>5.00 out of 5</span>
                    </div>

                    <div className={styles.reviewsBasedOn}>
                        <span>Based on 3 reviews</span>
                        <div className={styles.checkIcon}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                    </div>

                    <div className={styles.ratingBreakdown}>
                        {[5, 4, 3, 2, 1].map((stars) => (
                            <div key={stars} className={styles.breakdownRow}>
                                <div className={styles.breakdownStars}>
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < stars ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1">
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                    ))}
                                </div>
                                <div className={styles.barContainer}>
                                    <div 
                                        className={styles.barFill} 
                                        style={{ width: stars === 5 ? '100%' : '0%' }}
                                    />
                                </div>
                                <span className={styles.breakdownCount}>{stars === 5 ? 3 : 0}</span>
                            </div>
                        ))}
                    </div>

                    <button className={styles.writeReviewBtn}>Write a review</button>
                </div>
            </section>

            {/* Related Products */}
            {related.length > 0 && (
                <div className={styles.related}>
                    <div className={styles.relatedInner}>
                        <h2 className={styles.relatedTitle}>Product Recommendations</h2>
                        <div className={styles.relatedGrid}>
                            {related.map((p) => (
                                <ProductCard key={p.id} product={p} showQuickAdd={false} />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile sticky footer */}
            <motion.div 
                className={styles.mobileFooter}
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                <div className={styles.mobileFooterInner}>
                    <div className={styles.mobileFooterInfo}>
                        <p className={styles.mobileFooterTitle}>{product.title}</p>
                        <p className={styles.mobileFooterPrice}>{formatPrice(product.price)}</p>
                    </div>
                    <button className={styles.mobileCartBtn} onClick={handleAddToCart}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
