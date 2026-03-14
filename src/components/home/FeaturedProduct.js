import Link from 'next/link';
import styles from './FeaturedProduct.module.css';

export default function FeaturedProduct() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.banner}>
                    <div className={styles.bannerBg}>
                        <div className={styles.textOverlay}>
                            <h2 className={styles.title}>Jeans Collective.</h2>
                            <p className={styles.subtitle}>
                                We studied, refined, and now it&apos;s here — premium denim, done right.
                            </p>
                            <Link href="/collections/jeans" className={styles.cta}>
                                Shop Denim
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
