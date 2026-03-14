import Link from 'next/link';
import styles from './EditorialSection.module.css';

export default function EditorialSection() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.imageCol}>
                        <div className={styles.imagePlaceholder}>
                            <div className={styles.imageGradient}>
                                <span className={styles.imageText}>FW/25</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.textCol}>
                        <h2 className={styles.heading}>
                            Winter Collection / FW-25 <span className={styles.accent}>LIVE NOW!</span>
                        </h2>
                        <p className={styles.body}>
                            Premium knits, fresh denim, fresh fits in trousers, perfected outerwear, new co-ord sets,
                            and refined graphic hoodies — this collection took time, built with focus, and made premium yet affordable.
                        </p>
                        <p className={styles.body}>
                            URBANE was born from a passion to break boundaries in fashion. What started as an idea has grown
                            into a community of thousands of customers — building trust and strong connections with our people.
                            Our vision is to redefine fashion with creativity, quality, and authenticity at its core.
                        </p>
                        <Link href="/collections/new-arrivals" className={styles.cta}>
                            NEW IN
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
